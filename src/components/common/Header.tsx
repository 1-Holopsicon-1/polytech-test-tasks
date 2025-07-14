import React from "react";
import {Bell, FileText, Moon, Sun, User} from "lucide-react";
import type {UserInterface}  from "../../types/user.ts" ;
import "../../styles/globals.css"

const Header: React.FC<{ user: UserInterface; onTabChange: (tab: string) => void; activeTab: string; darkMode: boolean; onToggleDarkMode: () => void }> = ({ user, onTabChange, activeTab, darkMode, onToggleDarkMode }) => {
    return (
        <div className="header-bg border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="logo-bg w-8 h-8 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 logo-icon" />
                            </div>
                            <h1 className="text-xl font-semibold header-title">Открытое опубликование</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onToggleDarkMode}
                            className="theme-toggle-btn"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Bell className="w-5 h-5 bell-icon" />
                        <div className="flex items-center space-x-2">
                            <div className="user-avatar w-8 h-8 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 user-icon" />
                            </div>
                            <span className="text-sm user-name">{user.name}</span>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-8 -mb-px">
                    {['МОИ ЗАЯВКИ', 'ЭКСПЕРТИЗА ЗАЯВОК', 'ЖУРНАЛ'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`tab-btn ${activeTab === tab ? 'tab-btn-active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;