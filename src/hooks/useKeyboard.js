import { useEffect } from 'react'

export const useKeyboard = (key, callback, options = {}) => {
  const { ctrlKey = false, shiftKey = false, altKey = false, metaKey = false } = options

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === key &&
        e.ctrlKey === ctrlKey &&
        e.shiftKey === shiftKey &&
        e.altKey === altKey &&
        e.metaKey === metaKey
      ) {
        e.preventDefault()
        callback(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, ctrlKey, shiftKey, altKey, metaKey])
}

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      shortcuts.forEach(({ key, ctrlKey, shiftKey, altKey, metaKey, callback }) => {
        if (
          e.key === key &&
          e.ctrlKey === (ctrlKey || false) &&
          e.shiftKey === (shiftKey || false) &&
          e.altKey === (altKey || false) &&
          e.metaKey === (metaKey || false)
        ) {
          e.preventDefault()
          callback(e)
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
