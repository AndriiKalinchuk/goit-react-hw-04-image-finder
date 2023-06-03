import axios from 'axios';

const API_KEY = '36213838-e372b0534fd2b886e594c2bd9';
axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return data;
};
