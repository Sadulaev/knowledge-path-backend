import enDictionary from './en.json';
import ruDictionary from './ru.json';

export const getTextByLanguage = (key: string, lang: 'ru' | 'en' = 'en') => {
    switch (lang) {
        case 'en': enDictionary[key as keyof typeof enDictionary] || key;
        case 'ru': ruDictionary[key as keyof typeof ruDictionary] || key;
    }
}