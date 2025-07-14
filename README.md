Структура проекта
```
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx              // Шапка приложения с навигацией
│   │   └── ContactInfo.tsx         // Блок контактной информации
│   ├── publications/
│   │   ├── PublicationCard.tsx     // Карточка публикации
│   │   ├── PublicationForm.tsx     // Форма добавления/редактирования
│   │   └── PublicationList.tsx     // Список публикаций
│   └── pages/
│       ├── MyApplications.tsx      // Страница "Мои заявки"
│       ├── ExpertReview.tsx        // Страница "Экспертиза заявок"
│       └── Journal.tsx             // Страница "Журнал"
├── types/
│   ├── publication.ts              // Типы для публикаций
│   └── user.ts                     // Типы для пользователей
│
├── styles/
│   ├── dark.css                    // Темная тема
│   ├── light.css                   // Светлая тема
│   └── globals.css                 // Глобальные стили
└── App.tsx                         // Главный компонент
```