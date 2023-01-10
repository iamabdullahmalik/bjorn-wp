import { works } from '../Constants/Works';

export const formatData = (data) => {
  for (let i = 0; i < data.length; i++) {
    works.push(data[i]);
  }
  return works;
};
