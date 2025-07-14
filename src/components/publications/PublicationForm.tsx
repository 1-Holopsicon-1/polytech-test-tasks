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
        coAuthors: [] as string[],
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        expertiseResult: '',
        expertiseNumber: '',
        expertiseDate: '',
        expertiseStartDate: '',
        expertiseEndDate: '',
        noStateSecrets: false
    });
    const [coAuthorInputs, setCoAuthorInputs] = useState<string[]>([]);
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    const phoneRegexp = /^\+?\d{1,3}[\s-]?\(?\d{3,4}\)?[\s-]?\d{2,3}[\s-]?\d{2,3}[\s-]?\d{2,3}$/;
    const emailRegexp = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, contactPhone: value });
        setPhoneError(value && !phoneRegexp.test(value) ? 'Некорректный номер' : '');
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, contactEmail: value });
        setEmailError(value && !emailRegexp.test(value) ? 'Некорректный email' : '');
    };

    const handleAddCoAuthorField = () => {
        setCoAuthorInputs([...coAuthorInputs, '']);
    };
    const handleChangeCoAuthorInput = (idx: number, value: string) => {
        setCoAuthorInputs(coAuthorInputs.map((v, i) => i === idx ? value : v));
    };
    const handleSaveCoAuthor = (idx: number) => {
        const value = coAuthorInputs[idx].trim();
        if (value && !formData.coAuthors.includes(value)) {
            setFormData({ ...formData, coAuthors: [...formData.coAuthors, value] });
        }
        setCoAuthorInputs(coAuthorInputs.filter((_, i) => i !== idx));
    };
    const handleCancelCoAuthor = (idx: number) => {
        setCoAuthorInputs(coAuthorInputs.filter((_, i) => i !== idx));
    };

    const handleRemoveCoAuthor = (name: string) => {
        setFormData({ ...formData, coAuthors: formData.coAuthors.filter(ca => ca !== name) });
    };

    /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };
    */

    const handleSave = () => {
        const submitData = {
            ...formData,
            coAuthors: formData.coAuthors.join(', ')
        };
        onSubmit(submitData);
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
                            Соавторы:
                        </label>
                        <button type="button" className="form-save-btn rounded px-3 mb-2" onClick={handleAddCoAuthorField}>
                            Добавить соавтора
                        </button>
                        {coAuthorInputs.map((input, idx) => (
                            <div className="flex space-x-2 mb-2" key={idx}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => handleChangeCoAuthorInput(idx, e.target.value)}
                                    placeholder="ФИО соавтора"
                                    className="w-full px-3 py-2 form-input"
                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSaveCoAuthor(idx); } }}
                                    autoFocus
                                />
                                <button type="button" className="form-save-btn rounded px-3" onClick={() => handleSaveCoAuthor(idx)}>
                                    +
                                </button>
                                <button type="button" className="form-cancel-btn rounded px-3" onClick={() => handleCancelCoAuthor(idx)}>
                                    Отмена
                                </button>
                            </div>
                        ))}
                        <ul className="space-y-1">
                            {formData.coAuthors.map((ca, idx) => (
                                <li key={idx} className="flex items-center justify-between coauthor-item">
                                    <span>{ca}</span>
                                    <button type="button" className="form-cancel-btn rounded px-2 py-0.5 ml-2" onClick={() => handleRemoveCoAuthor(ca)}>Удалить</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Контактное лицо */}
                    <div>
                        <label className="block text-sm font-medium form-label mb-1">
                            Контактное лицо:
                        </label>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                value={formData.contactName}
                                onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                                placeholder="ФИО"
                                className="w-full px-3 py-2 form-input"
                            />
                            <div>
                                <input
                                    type="text"
                                    value={formData.contactPhone}
                                    onChange={handlePhoneChange}
                                    placeholder="Телефон"
                                    className={`w-full px-3 py-2 form-input${phoneError ? ' border-red-500' : ''}`}
                                />
                                {phoneError && <div className="text-red-500 text-xs mt-1">{phoneError}</div>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    value={formData.contactEmail}
                                    onChange={handleEmailChange}
                                    placeholder="E-mail"
                                    className={`w-full px-3 py-2 form-input${emailError ? ' border-red-500' : ''}`}
                                />
                                {emailError && <div className="text-red-500 text-xs mt-1">{emailError}</div>}
                            </div>
                        </div>
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