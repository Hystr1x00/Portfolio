'use client'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [hovering, setHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]')
            ) {
                setHovering(true)
            } else {
                setHovering(false)
            }
        }

        // Hide cursor when leaving window
        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        // Click sound effect
        const clickAudio = new Audio('/click.mp3')
        const handleMouseDown = () => {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(e => console.log('Click sound play blocked', e));
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        window.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        // Also add global style to hide default cursor when over document
        document.body.style.cursor = 'none';

        // Fix cursor for clickable elements
        const style = document.createElement('style')
        style.innerHTML = `
            a, button, [role="button"], input, select, textarea {
                cursor: none !important;
            }
        `
        document.head.appendChild(style)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.head.removeChild(style)
            document.body.style.cursor = 'auto';
        }
    }, [isVisible])

    if (!isVisible) return null;

    const color = hovering ? "#00cfff" : "#ffffff";

    return (
        <div
            className="fixed pointer-events-none z-[99999] hidden md:block transition-transform duration-75 ease-out"
            style={{
                left: position.x,
                top: position.y,
                transform: `translate(-50%, -50%) scale(${hovering ? 1.2 : 1})`,
                filter: `drop-shadow(0 0 8px ${hovering ? 'rgba(0,207,255,0.8)' : 'rgba(255,255,255,0.5)'})`
            }}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ imageRendering: "pixelated" }}>
                {/* Center dot */}
                <rect x="10" y="10" width="4" height="4" fill={color} />

                {/* Top */}
                <rect x="10" y="0" width="4" height="6" fill={color} />
                {/* Bottom */}
                <rect x="10" y="18" width="4" height="6" fill={color} />
                {/* Left */}
                <rect x="0" y="10" width="6" height="4" fill={color} />
                {/* Right */}
                <rect x="18" y="10" width="6" height="4" fill={color} />

                {/* Corner brackets if hovering */}
                <g style={{ opacity: hovering ? 1 : 0, transition: 'opacity 0.2s' }}>
                    {/* Top Left */}
                    <rect x="0" y="0" width="6" height="2" fill={color} />
                    <rect x="0" y="0" width="2" height="6" fill={color} />

                    {/* Top Right */}
                    <rect x="18" y="0" width="6" height="2" fill={color} />
                    <rect x="22" y="0" width="2" height="6" fill={color} />

                    {/* Bottom Left */}
                    <rect x="0" y="22" width="6" height="2" fill={color} />
                    <rect x="0" y="18" width="2" height="6" fill={color} />

                    {/* Bottom Right */}
                    <rect x="18" y="22" width="6" height="2" fill={color} />
                    <rect x="22" y="18" width="2" height="6" fill={color} />
                </g>
            </svg>
        </div>
    )
}
