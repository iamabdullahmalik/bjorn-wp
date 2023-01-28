import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fetchWorks } from './utils/getWorks';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './i18n/resources';

i18n.use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    async: true,
    callback: (err, t) => {
      if (err) return console.error(err);
      fetchWorks();
    },
  });


//* second solution 
//* TO DO 

// const fetchData = async () => {
//   const data = await fetchWorks();
//   i18n.use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//       resources: {...data},
//       fallbackLng: 'en',
//       debug: true,
//     });
// };

// fetchData();

export default i18n;
