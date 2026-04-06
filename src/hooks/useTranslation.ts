import { useGalleryStore } from '@/store/useGalleryStore';
import { translations } from '@/data/translations';

export function useTranslation() {
  const language = useGalleryStore((s) => s.language);
  const t = translations[language];
  return { t, language };
}
