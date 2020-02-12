import i18next from 'i18next';
import common from './i18nRu.js';

i18next.init({
	lng: 'ru',
	resources: {
		ru: {
            'translation': common,
		}
	}
});

export default i18next;