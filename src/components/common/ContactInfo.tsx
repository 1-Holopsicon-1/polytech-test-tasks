import React from "react";
import {Phone, Mail, FileText, MapPin} from "lucide-react"

const ContactInfo: React.FC = () => {
    return (
        <div className="contact-bg border-l-4 contact-border p-4 mb-6">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FileText className="h-5 w-5 contact-icon" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium contact-title">Контактная информация</h3>
                    <div className="mt-2 text-sm contact-text">
                        <p>По вопросам работы комиссии по открытому опубликованию обращаться в отдел научной информации центра управления наукой.</p>
                        <div className="mt-2 space-y-1">
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                <span>+7 (495) 223-05-23, доб. 1797, 1417</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>la.grant@mospolytech.ru</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>г. Москва, ул. Б. Семеновская, д. 38, Б-407</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;