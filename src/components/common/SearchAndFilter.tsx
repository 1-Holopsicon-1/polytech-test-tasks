import {Filter, Search} from "lucide-react";
import React from "react";

interface SearchAndFilterProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
    filterStatus: string;
    setFilterStatus: (v: string) => void;
    statusLabels: Record<string, string>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    statusLabels
}) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.trimStart());
    };
    return (
        <div className="mb-6 flex items-center space-x-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 search-icon w-5 h-5" />
                <input
                    type="text"
                    placeholder="Поиск по названию или автору..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 search-input"
                />
            </div>
            <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 filter-icon" />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Все статусы</option>
                    {Object.entries(statusLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchAndFilter;
