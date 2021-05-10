import '@/examples/scss/index.scss';
import Lightbox from '@/examples/js/utils/lightbox';
import generateLightboxMarkup from '@/examples/js/utils/generateLightboxMarkup';

const lightboxButton = document.querySelector('button');

const OnLightboxButtonClick = () => {
  const lightboxContent = generateLightboxMarkup();

  Lightbox.open({
    content: lightboxContent,
  });
};

lightboxButton.addEventListener('click', OnLightboxButtonClick);
