import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import * as ImageService from '../service/image_service';

import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage]);

  const fetchImages = async () => {
    if (!query) return;
    setIsLoading(true);

    try {
      const data = await ImageService.getImages(query, currentPage);
      if (data.totalHits === 0) {
        throw new Error('No images matching your request were found.');
      }

      const newImages = data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));

      setImages(prevImages => [...prevImages, ...newImages]);
      setShowLoadMoreButton(currentPage < Math.ceil(data.totalHits / 12));
    } catch (error) {
      alert('No images matching your request were found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = newQuery => {
    if (query === newQuery) {
      alert('Already shown');
    } else {
      setQuery(newQuery);
      setImages([]);
      setCurrentPage(1);
      setIsLoading(false);
      setShowLoadMoreButton(false);
      setLargeImageURL('');
    }
  };

  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const showModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} showModal={showModal} />
      {isLoading && <Loader />}
      {showLoadMoreButton && <Button onClick={loadMoreImages} />}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} modalClose={showModal} />
      )}
    </div>
  );
};

export default App;
