import React from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    onClick?: () => void
    fullHeight?: boolean
}

export default function Card({
    children,
    className = '',
    hover = false,
    onClick,
    fullHeight = false
}: CardProps) {
    const baseClass = hover ? 'card-hover' : 'card'
    const heightClass = fullHeight ? 'h-full flex flex-col' : ''
    return (
        <div
            className={`${baseClass} ${heightClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
