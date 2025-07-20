// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// اگر ts-node/webpack به‌طور خودکار JSON را تایپ نکند، می‌توانید
// یک declaration مثل `declare module "*.json";` هم اضافه کنید.
import fa from '@/fa.json';

// با as const یا satisfies نوع منابع را ثابت می‌کنیم تا در زمان
// کامپایل از تطابق کلیدها اطمینان داشته باشیم
const resources = {
  fa: { translation: fa },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fa',
    interpolation: { escapeValue: false },
  });

export default i18n;
