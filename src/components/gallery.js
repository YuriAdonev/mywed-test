import Mustache from 'mustache/mustache';

export default class Gallery {
  constructor({ photos, size, current, container }) {
    this._photos = photos;
    this._size = size;
    this._current = photos.findIndex(photo => photo.id === current);
    this._container = container;
    this._offsetIndex = 0;
    this._galleryListContainer = null;
    this._itemsToShow = [];
    this._indexCenter = Math.ceil(size / 2) - 1;
    this._galleryTemplate = document.querySelector('#galleryTemplate').innerHTML;
    this._galleryItemTemplate = document.querySelector('#galleryItemTemplate').innerHTML;
  }

  init() {
    this._renderContainer();
    this._render();
    this._addNavigationHandlers();
    this._addClickOnItemHandler();
  }

  _renderContainer() {
    this._container.innerHTML = Mustache.render(this._galleryTemplate);
  }

  _setItemsToShow() {
    this._itemsToShow = this._photos.slice(this._offsetIndex, this._offsetIndex + this._size);
  }

  _calculateOffsets() {
    if (this._current <= this._indexCenter - 1) {
      this._offsetIndex = 0;
    }
    if (this._current >= this._photos.length - this._indexCenter - 2) {
      this._offsetIndex = this._photos.length - this._size;
    }
    if (this._current > this._indexCenter - 1 && this._current < this._photos.length - this._indexCenter - 1) {
      this._offsetIndex = this._current - this._indexCenter;
    }
    this._setItemsToShow();
  }

  _highlightCurrentItem() {
    const items = this._galleryListContainer.querySelectorAll('.gallery-item');

    items.forEach((item, index) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if (index === this._current - this._offsetIndex) {
        item.classList.add('active');
      }
    });
  }

  _renderItems() {
    this._galleryListContainer = this._container.querySelector('#galleryList');
    this._galleryListContainer.innerHTML = Mustache.render(this._galleryItemTemplate, {photos: this._itemsToShow});

    this._highlightCurrentItem();
  }

  _render() {
    this._calculateOffsets();
    this._renderItems();
  }

  _currentIncrease() {
    if (this._current === this._photos.length - 1) {
      this._current = this._photos.length - 1;
    } else {
      this._current++;
    }
    this._render();
  }

  _currentDecrease() {
    if (this._current === 0) {
      this._current = 0;
    } else {
      this._current--;
    }
    this._render();
  }

  _addNavigationHandlers() {
    const next = this._container.querySelector('.gallery__btn--next');
    const prev = this._container.querySelector('.gallery__btn--prev');

    next.addEventListener('click', () => {
      this._currentIncrease();
    });

    prev.addEventListener('click', () => {
      this._currentDecrease();
    });

    document.addEventListener('keydown', evt => {
      if (evt.key === 'ArrowRight') {
        this._currentIncrease();
      }
      if (evt.key === 'ArrowLeft') {
        this._currentDecrease();
      }
    });
  }

  _addClickOnItemHandler() {
    this._galleryListContainer.addEventListener('click', evt => {
      const items = this._galleryListContainer.querySelectorAll('.gallery-item');

      items.forEach((item, index) => {
        if (evt.target.classList.contains('gallery-item') && evt.target === item) {
          this._current = this._offsetIndex + index;
          this._render();
        }
      });
    });
  }
}
