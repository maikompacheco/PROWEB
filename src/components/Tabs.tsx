import React, { useState } from 'react'

export interface Tab {
    id: string
    label: string
    icon?: string
    content?: React.ReactNode
}

interface TabsProps {
    tabs: Tab[]
    defaultTabId?: string
    onChange?: (tabId: string) => void
    className?: string
}

export default function Tabs({
    tabs,
    defaultTabId,
    onChange,
    className = ''
}: TabsProps) {
    const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id)

    const handleTabChange = (tabId: string) => {
        setActiveTabId(tabId)
        onChange?.(tabId)
    }

    const activeTab = tabs.find(tab => tab.id === activeTabId)

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-700 gap-0 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTabId === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-slate-400 hover:text-slate-300'
                            }`}
                    >
                        {tab.icon && <span className="mr-2">{tab.icon}</span>}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab && (
                <div className="animate-fadeIn">
                    {activeTab.content}
                </div>
            )}
        </div>
    )
}
