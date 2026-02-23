import React, { createContext, useContext, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'

const GestureContext = createContext()

export const useGestures = () => {
  const context = useContext(GestureContext)
  if (!context) {
    throw new Error('useGestures must be used within GestureProvider')
  }
  return context
}

export const GestureProvider = ({ children }) => {
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })
  const lastTapRef = useRef(0)
  const longPressTimerRef = useRef(null)

  useEffect(() => {
    // ============ GLOBAL TOUCH HANDLERS ============
    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      }

      // Long press detection
      longPressTimerRef.current = setTimeout(() => {
        const element = document.elementFromPoint(touch.clientX, touch.clientY)
        if (element) {
          element.dispatchEvent(new CustomEvent('longpress', {
            detail: { x: touch.clientX, y: touch.clientY }
          }))
          
          toast.custom((t) => (
            <div className="glass-card px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl 
              border border-white/20 text-white">
              Long press detected! 👆
            </div>
          ), { duration: 1000 })
          
          if (navigator.vibrate) navigator.vibrate([30, 20, 30])
        }
      }, 500)
    }

    const handleTouchMove = (e) => {
      // Cancel long press on move
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }

    const handleTouchEnd = (e) => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const deltaTime = Date.now() - touchStartRef.current.time
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Swipe detection
      if (distance > 50 && deltaTime < 300) {
        const direction = Math.abs(deltaX) > Math.abs(deltaY)
          ? (deltaX > 0 ? 'right' : 'left')
          : (deltaY > 0 ? 'down' : 'up')
        
        window.dispatchEvent(new CustomEvent('swipe', {
          detail: { direction, deltaX, deltaY, distance }
        }))
      }

      // Double tap detection
      if (distance < 10 && deltaTime < 200) {
        const now = Date.now()
        if (now - lastTapRef.current < 300) {
          // Double tap
          const element = document.elementFromPoint(touch.clientX, touch.clientY)
          if (element) {
            element.dispatchEvent(new CustomEvent('doubletap', {
              detail: { x: touch.clientX, y: touch.clientY }
            }))
          }
          lastTapRef.current = 0
        } else {
          lastTapRef.current = now
        }
      }
    }

    // ============ PINCH GESTURE DETECTION ============
    let initialDistance = 0

    const handlePinchStart = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        initialDistance = Math.sqrt(dx * dx + dy * dy)
      }
    }

    const handlePinchMove = (e) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const currentDistance = Math.sqrt(dx * dx + dy * dy)
        const scale = currentDistance / initialDistance

        window.dispatchEvent(new CustomEvent('pinch', {
          detail: { scale, initialDistance, currentDistance }
        }))
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchstart', handlePinchStart)
    window.addEventListener('touchmove', handlePinchMove)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchstart', handlePinchStart)
      window.removeEventListener('touchmove', handlePinchMove)
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  return (
    <GestureContext.Provider value={{}}>
      {children}
    </GestureContext.Provider>
  )
}
