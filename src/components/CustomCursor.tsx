'use client'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
                setHovering(true)
            } else {
                setHovering(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    return (
        <>
            <div
                className="cursor-dot hidden md:block"
                style={{ left: position.x - 4, top: position.y - 4 }}
            />
            <div
                className={`cursor-ring hidden md:block ${hovering ? 'hovering' : ''}`}
                style={{
                    left: position.x - (hovering ? 28 : 18),
                    top: position.y - (hovering ? 28 : 18)
                }}
            />
        </>
    )
}
