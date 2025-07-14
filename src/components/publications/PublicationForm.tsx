import {PUBLICATION_TYPES} from "./consts.ts"
import type {Publication} from "../../types/pulications.ts";
import {useState} from "react";

const PublicationForm: React.FC<{ onSubmit: (publication: Omit<Publication, 'id' | 'createdDate' | 'status'>) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: 'article' as Publication['type'],
        author: '',
        subtype: '',
        materialName: '',
        authorsFromMospolytech: '',
        coAuthors: '',
        contactInfo: '',
        expertiseResult: '',
        expertiseNumber: '',
        expertiseDate: '',
        expertiseStartDate: '',
        expertiseEndDate: '',
        noStateSecrets: false
    });
    
    /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    */

    const handleSave = () => {
        /*if (formData.title && formData.author) {
            onSubmit(formData);
        }*/
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 modal-overlay">
            <div className="form-bg rounded-lg shadow-lg form-border w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 form-header-border">
                    <h3 className="text-lg font-medium form-title">
                        Добавление новой публикации
                    </h3>
                    <button
                        onClick={onCancel}
                        className="form-close-btn text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-4">
                    {/* Тип публикации и Подтип */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium form-label mb-1">
                                Тип публикации:
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as Publication['type'] })}
                                className="w-full px-3 py-2 form-input"
                            >
                                <option value="">Выберите</option>
                                {Object.entries(PUBLICATION_TYPES).map(([key, label]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium form-label mb-1">
                                Подтип:
                            </label>
                            <select
                                value={formData.subtype}
                                onChange={(e) => setFormData({ ...formData, subtype: e.target.value })}
                                className="w-full px-3 py-2 form-input"
                            >
                                <option value="">Выберите</option>
                            </select>
                        </div>
                    </div>

                    {/* Название материалов */}
                    <div>
                        <label className="block text-sm font-medium form-label mb-1">
                            Название материалов:
                        </label>
                        <textarea
                            value={formData.materialName}
                            onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 form-input resize-none"
                        />
                    </div>

                    {/* Авторы из Московского Политеха */}
                    <div>
                        <label className="block text-sm font-medium form-label mb-1">
                            Авторы из Московского Политеха: <span className="form-label-secondary">(коллектив авторов)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.authorsFromMospolytech}
                                onChange={(e) => setFormData({ ...formData, authorsFromMospolytech: e.target.value })}
                                placeholder="Начните вводить ФИО сотрудника"
                                className="w-full px-3 py-2 form-input"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 form-search-btn"
                            >
                                🔍
                            </button>
                        </div>
                    </div>

                    {/* Соавторы */}
                    <div>
                        <label className="block text-sm font-medium form-label mb-1">
                            Соавторы: <span className="form-label-secondary">(инициалы, фамилия, через запятую)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.coAuthors}
                            onChange={(e) => setFormData({ ...formData, coAuthors: e.target.value })}
                            placeholder="А.А. Иванов, Б.Б. Петров,..."
                            className="w-full px-3 py-2 form-input"
                        />
                    </div>

                    {/* Контактное лицо */}
                    <div>
                        <label className="block text-sm font-medium form-label mb-1">
                            Контактное лицо (ФИО, телефон, почта):
                        </label>
                        <textarea
                            value={formData.contactInfo}
                            onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 form-input resize-none"
                        />
                    </div>

                    {/* Экспертиза публикации */}
                    <div className="form-expert-block pt-4">
                        <h4 className="text-md font-medium form-expert-title mb-4">
                            ЭКСПЕРТИЗА ПУБЛИКАЦИИ
                        </h4>

                        {/* Результат */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium form-label mb-2">
                                Результат:
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="noStateSecrets"
                                    checked={formData.noStateSecrets}
                                    onChange={(e) => setFormData({ ...formData, noStateSecrets: e.target.checked })}
                                    className="w-4 h-4 form-checkbox"
                                />
                                <label htmlFor="noStateSecrets" className="text-sm form-label">
                                    материалы не содержат гос. тайну
                                </label>
                            </div>
                        </div>

                        {/* Экспертиза даты */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex flex-col items-start">
                                <label className="block h-6 text-sm font-medium form-label mb-1">
                                    Номер заключения:
                                </label>
                                <input
                                    type="text"
                                    value={formData.expertiseNumber}
                                    onChange={(e) => setFormData({ ...formData, expertiseNumber: e.target.value })}
                                    className="w-full px-3 py-2 form-input"
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <label className="block h-6 text-sm font-medium form-label mb-1">
                                    Дата заключения:
                                </label>
                                <input
                                    type="date"
                                    value={formData.expertiseDate}
                                    onChange={(e) => setFormData({ ...formData, expertiseDate: e.target.value })}
                                    className="w-full px-3 py-2 form-input"
                                />
                            </div>
                            <div className="flex flex-col items-start">
                                <label className="block h-6 text-sm font-medium form-label mb-1">
                                    Начало экспертизы:
                                </label>
                                <input
                                    type="date"
                                    value={formData.expertiseStartDate}
                                    onChange={(e) => setFormData({ ...formData, expertiseStartDate: e.target.value })}
                                    className="w-full px-3 py-2 form-input"
                                />
                            </div>

                            <div className="flex flex-col items-start">
                                <label className="block h-6 text-sm font-medium form-label mb-1 whitespace-nowrap">
                                    Окончание экспертизы:
                                </label>
                                <input
                                    type="date"
                                    value={formData.expertiseEndDate}
                                    onChange={(e) => setFormData({ ...formData, expertiseEndDate: e.target.value })}
                                    className="w-full px-3 py-2 form-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end space-x-3 p-4 form-footer-border">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 form-save-btn rounded"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 form-cancel-btn rounded"
                    >
                        Закрыть окно
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicationForm;