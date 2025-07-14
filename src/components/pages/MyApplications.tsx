import {useEffect, useState} from "react";
import type {Publication} from "../../types/pulications.ts";
import ContactInfo from "../common/ContactInfo.tsx";
import {FileText, Filter, Plus, Search} from "lucide-react";
import PublicationForm from "../publications/PublicationForm.tsx";
import {STATUS_LABELS} from "../publications/consts.ts";
import PublicationCard from "../publications/PublicationCard.tsx";

const MyApplications: React.FC<{ darkMode: boolean }> = () => {
    /*const [publications, setPublications] = useState<Publication[]>([
        {
            id: '1',
            title: 'ОСОБЕННОСТИ УПОТНЯЕМОСТИ И КОНСОЛИДАЦИИ ЗАГОТОВОК ИЗ МЕХАНОСИНТЕЗИРОВАННОГО ПОРОШКА ДИСПЕРСИЯ',
            type: 'article',
            author: 'Югай Евгений Эдуардович',
            createdDate: '4 октября 2024 г. 10:34:13',
            status: 'approved',
            expertFile: 'expert_conclusion.pdf'
        },
        {
            id: '2',
            title: 'Благоперенос в тонких структурах глинистых оболочек и его влияние на качество песчано-глинистых смесей',
            type: 'thesis',
            author: 'Югай Евгений Эдуардович',
            createdDate: '12 апреля 2024 г. 10:33:42',
            status: 'under_review'
        },
        {
            id: '3',
            title: 'Методика вычислительного эксперимента для прогнозирования микропористости в отливках с равноосной структурой на основе критерия Ниямы',
            type: 'article',
            author: 'Югай Евгений Эдуардович',
            createdDate: '12 апреля 2024 г. 10:31:51',
            status: 'pending'
        }
    ]);*/
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<Publication['status'] | 'all'>('all');

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://dummyjson.com/posts');
                const data = await response.json();


                const transformedPublications: Publication[] = data.posts.map((post: any) => ({
                    id: post.id.toString(),
                    title: post.title,
                    type: 'article' as const,
                    author: `User ${post.userId}`,
                    createdDate: new Date().toLocaleString('ru-RU'),
                    status: ['pending', 'approved', 'rejected', 'under_review'][Math.floor(Math.random() * 4)] as Publication['status'],
                    materialName: post.body.slice(0, 100) + '...',
                    expertFile: Math.random() > 0.5 ? 'expert_conclusion.pdf' : undefined
                }));

                setPublications(transformedPublications);
            } catch (error) {
                console.error('Error fetching publications:', error);
                // Оставляем пустой массив или показываем ошибку
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">Загрузка публикаций...</p>
                </div>
            </div>
        );
    }
    const filteredPublications = publications.filter(pub => {
        const searchText = (pub.title || pub.materialName || '').toLowerCase();
        const authorText = (pub.author || pub.authorsFromMospolytech || '').toLowerCase();
        const matchesSearch = searchText.includes(searchTerm.toLowerCase()) ||
            authorText.includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || pub.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleAddPublication = (newPub: Omit<Publication, 'id' | 'createdDate' | 'status'>) => {
        const publication: Publication = {
            ...newPub,
            id: Date.now().toString(),
            createdDate: new Date().toLocaleString('ru-RU'),
            status: 'pending'
        };
        setPublications([publication, ...publications]);
        setShowForm(false);
    };

    const handleEditPublication = (id: string) => {
        console.log('Edit publication:', id);
    };

    const handleDeletePublication = (id: string) => {
        setPublications(publications.filter(pub => pub.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ContactInfo />

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold page-title">Мои заявки</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="add-publication-btn flex items-center"
                >
                    <Plus className="w-4 h-4 add-publication-icon mr-2" />
                    Добавить публикацию
                </button>
            </div>

            {showForm && (
                <PublicationForm
                    onSubmit={handleAddPublication}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="mb-6 flex items-center space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 search-icon w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Поиск по названию или автору..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 search-input"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 filter-icon" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as Publication['status'] | 'all')}
                        className="filter-select"
                    >
                        <option value="all">Все статусы</option>
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredPublications.map((publication) => (
                    <PublicationCard
                        key={publication.id}
                        publication={publication}
                        onEdit={handleEditPublication}
                        onDelete={handleDeletePublication}
                    />
                ))}
            </div>

            {filteredPublications.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Публикации не найдены</p>
                </div>
            )}
        </div>
    );
};

export default MyApplications;