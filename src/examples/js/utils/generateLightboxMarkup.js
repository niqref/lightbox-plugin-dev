import smileImage from '@/examples/images/smile.png';

const generateLightboxMarkup = () => {
  const title = document.createElement('h2');
  const imageContainer = document.createElement('div');
  const image = document.createElement('img');
  title.textContent = 'Hi! I\'m lightbox title!';
  image.src = smileImage;
  image.alt = 'Smile';
  imageContainer.appendChild(image);

  return title.outerHTML + imageContainer.outerHTML;
};

export default generateLightboxMarkup;
