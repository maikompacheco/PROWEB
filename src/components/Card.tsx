import React from 'react'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    onClick?: () => void
}

export default function Card({
    children,
    className = '',
    hover = false,
    onClick
}: CardProps) {
    const baseClass = hover ? 'card-hover' : 'card'
    return (
        <div
            className={`${baseClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
