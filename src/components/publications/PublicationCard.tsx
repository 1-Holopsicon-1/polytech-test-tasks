import {Calendar, Download, Edit3, Trash2, User} from "lucide-react";
import {PUBLICATION_TYPES, STATUS_COLORS, STATUS_LABELS} from "./consts.ts";
import type {Publication} from "../../types/pulications.ts";

const PublicationCard: React.FC<{ publication: Publication; onEdit: (id: string) => void; onDelete: (id: string) => void }> = ({ publication, onEdit, onDelete }) => {
    return (
        <div className="card-bg rounded-lg shadow-sm card-border p-6 card-hover transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center mb-2">
                        <span className="text-sm font-medium card-type mr-2">
                            {PUBLICATION_TYPES[publication.type]}:
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium status-${publication.status}`}>
                            {STATUS_LABELS[publication.status]}
                        </span>
                    </div>

                    <h3 className="text-lg font-medium card-title mb-2">
                        {publication.title}
                    </h3>

                    <div className="flex items-center text-sm card-meta space-x-4">
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {publication.author}
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {publication.createdDate}
                        </div>
                    </div>

                    {publication.expertFile && (
                        <div className="mt-3">
                            <button className="flex items-center text-sm card-download">
                                <Download className="w-4 h-4 mr-1" />
                                Скачать файл экспертного заключения
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => onEdit(publication.id)}
                        className="p-2 card-edit transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(publication.id)}
                        className="p-2 card-delete transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicationCard;