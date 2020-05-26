import Gallery from './components/gallery';
import { photos } from './data';

import './scss/index.scss';

window.addEventListener('DOMContentLoaded', () => {
  const gallery = new Gallery({
    photos,
    size: 5,
    current: '0',
    container: document.querySelector('#gallery'),
  });

  gallery.init();
});
