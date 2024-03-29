import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export function renderUsers(hits, userList, loader, btnLoadMore) {
  if (hits.length <= 0) {
    loader.classList.add('is-hidden');
    btnLoadMore.classList.add('is-hidden');
    iziToast.show({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }
  const markup = hits
    .map(hit => {
      return `
          <li class="cards">
          <a href="${hit.largeImageURL}"> <img src="${hit.webformatURL}" alt="${hit.tags}" width="360" height="152"/> </a>
          <div class="card-description">
            <p class="description"><b>Likes</b> ${hit.likes}</p>
            <p class="description"><b>Views</b> ${hit.views}</p>
            <p class="description"><b>Comments</b> ${hit.comments}</p>
            <p class="description"><b>Downloads</b> ${hit.downloads}</p>
            </div>
          </li>
      `;
    })
    .join('');
  userList.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: `alt`,
    captionDelay: 250,
  });

  loader.classList.add('is-hidden');
  btnLoadMore.classList.remove('is-hidden');
  lightbox.refresh();
}
export function getParam() {
  const elem = document.querySelector('.cards');
  const elements = elem.getBoundingClientRect();
  return elements.height;
}
