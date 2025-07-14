const PUBLICATION_TYPES = {
    article: 'Научная статья',
    thesis: 'Тезисы доклада',
    report: 'Отчет'
};

const STATUS_COLORS = {
    pending: 'status-pending',
    approved: 'status-approved',
    rejected: 'status-rejected',
    under_review: 'status-under_review'
};

const STATUS_LABELS = {
    pending: 'Ожидает',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    under_review: 'На рассмотрении'
};

export { PUBLICATION_TYPES, STATUS_COLORS, STATUS_LABELS };