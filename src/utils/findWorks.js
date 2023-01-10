import { works } from '../Constants/Works';

export const searchByTitle = (title) => {
  for (let i = 0; i < works.length; i++) {
    if (works[i].title === title) {
      return works[i];
    }
  }
};

export const searchIndexByTitle = (title) => {
  for (let i = 0; i < works.length; i++) {
    if (works[i].title === title) {
      return i;
    }
  }
};
