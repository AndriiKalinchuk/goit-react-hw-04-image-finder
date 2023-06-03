import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import * as ImageService from '../service/image_service';

import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    showLoadMoreButton: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, currentPage } = this.state;

    this.setState({ isLoading: true });

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

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        showLoadMoreButton: currentPage < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      alert('No images matching your request were found');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = newQuery => {
    const { query } = this.state;

    if (query === newQuery) {
      return alert('Already shown');
    } else {
      this.setState({
        query: newQuery,
        images: [],
        currentPage: 1,
        isLoading: false,
        showLoadMoreButton: false,
        largeImageURL: '',
      });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  showModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  render() {
    const { images, isLoading, showLoadMoreButton, largeImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} showModal={this.showModal} />
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.loadMoreImages} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} modalClose={this.showModal} />
        )}
      </div>
    );
  }
}

export default App;
