import React, { useState, useEffect } from 'react'
import type {UserInterface} from "./types/user.ts";
import MyApplications from './components/pages/MyApplications.tsx';
import {Eye, FileText} from "lucide-react";
import Header from "./components/common/Header.tsx";
import "tailwindcss";
import "./styles/globals.css"

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('МОИ ЗАЯВКИ');
    const [darkMode, setDarkMode] = useState(true); // По умолчанию тёмная тема
    const [user] = useState<UserInterface>({
        name: 'Иван Петров',
        email: 'ivan.petrov@mospolytech.ru',
        role: 'employee'
    });

    useEffect(() => {
        // Функция для подключения темы
        const themeId = 'theme-style';
        let link = document.getElementById(themeId) as HTMLLinkElement | null;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.id = themeId;
            document.head.appendChild(link);
        }
        link.href = darkMode ? '/src/styles/dark.css' : '/src/styles/light.css';
    }, [darkMode]);

    const renderContent = () => {
        switch (activeTab) {
            case 'МОИ ЗАЯВКИ':
                return <MyApplications darkMode={darkMode} />;
            case 'ЭКСПЕРТИЗА ЗАЯВОК':
                return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="text-center py-12">
                            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Раздел экспертизы заявок</p>
                        </div>
                    </div>
                );
            case 'ЖУРНАЛ':
                return (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Журнал публикаций</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen app-bg">
            <Header user={user} onTabChange={setActiveTab} activeTab={activeTab} darkMode={darkMode}
                    onToggleDarkMode={() => setDarkMode(!darkMode)}/>
            {renderContent()}
        </div>
    );
};

export default App;