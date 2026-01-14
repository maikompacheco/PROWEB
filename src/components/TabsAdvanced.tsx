import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

interface TabItem {
    id: string
    label: string
    icon?: React.ReactNode
}

interface TabsAdvancedProps {
    items: TabItem[]
    defaultTab?: string
    onChange?: (tabId: string) => void
    children: React.ReactNode
    variant?: 'default' | 'pills'
    className?: string
}

export default function TabsAdvanced({
    items,
    defaultTab,
    onChange,
    children,
    variant = 'default',
    className = ''
}: TabsAdvancedProps) {
    const { theme } = useTheme()
    const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id)

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId)
        onChange?.(tabId)
    }

    const containerBg = theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
    const activeBg = theme === 'dark' ? 'bg-slate-700 border-blue-500' : 'bg-white border-blue-500'
    const inactiveBg = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'

    if (variant === 'pills') {
        return (
            <div className={className}>
                <div className={`flex gap-2 p-2 ${containerBg} rounded-lg mb-4`}>
                    {items.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === item.id
                                    ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                                    : `${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`
                                }`}
                        >
                            {item.icon && <span>{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            <div className={`flex border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'} gap-1`}>
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all border-b-2 ${activeTab === item.id
                                ? `border-blue-500 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`
                                : `border-transparent ${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`
                            }`}
                    >
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}
