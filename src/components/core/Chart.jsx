import React, { useEffect, useRef } from 'react'

export const Chart = ({ 
  type = 'line',
  data = [],
  options = {},
  height = 'h-80',
  className = ''
}) => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Chart.js or Recharts integration would go here
    // This is a placeholder that shows a beautiful animated gradient
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)')
    gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)')
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)')

    // Draw placeholder pattern
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
    ctx.lineWidth = 1

    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    for (let i = 0; i <= 6; i++) {
      const x = (width / 6) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Draw sample data line
    ctx.strokeStyle = 'rgb(99, 102, 241)'
    ctx.lineWidth = 2
    ctx.beginPath()
    
    const points = [0.7, 0.5, 0.8, 0.6, 0.9, 0.7, 0.95].map((p, i) => ({
      x: (width / 6) * i,
      y: height - (height * p * 0.7)
    }))

    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.stroke()

    // Draw points
    points.forEach(point => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgb(99, 102, 241)'
      ctx.shadowColor = 'rgba(99, 102, 241, 0.5)'
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0
    })

  }, [type, data])

  return (
    <div className={`relative ${height} w-full ${className}`}>
      <canvas
        ref={chartRef}
        className="w-full h-full rounded-xl"
        width={800}
        height={400}
      />
      
      {/* Chart Legend */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
          <span className="text-xs text-white/60">Current Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <span className="text-xs text-white/40">Previous Period</span>
        </div>
      </div>
    </div>
  )
}
