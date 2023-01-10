import { works } from '../Constants/Works';
import { formatData } from './formatData';

export const fetchWorks = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_CMS_URL
      }/v2021-10-21/data/query/production?query=*[_type == 'work']`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(response.statusText);
      throw new Error(`An error occured please try again`);
    }

    const data = await response.json();
    const formattedWorks = await formatData(data.result);
    if (formattedWorks) {
      sessionStorage.setItem(
        'bjorn-verlinde_work',
        JSON.stringify(formattedWorks)
      );
      return true;
    }
};
