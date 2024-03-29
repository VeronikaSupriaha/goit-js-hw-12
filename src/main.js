import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { fetchUsers } from './js/pixabay-api';
import { renderUsers } from './js/render-functions';
import { getParam } from './js/render-functions';
const input = document.querySelector('#data-input');
const userList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const footerLoader = document.querySelector('.footer-loader');
const form = document.querySelector('form');
const btnLoadMore = document.querySelector('.load-btn');
let currentPage = 1;
let maxPage = 0;
const pageSize = 15;
btnLoadMore.classList.add('is-hidden');
form.addEventListener('submit', async event => {
  event.preventDefault();
  loader.classList.remove('is-hidden');
  userList.innerHTML = '';
  currentPage = 1;
  if (input.value === '') {
    iziToast.show({
      title: 'Error',
      message: 'Please, fill the field to start search images. ',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  try {
    const hits = await fetchUsers(input.value);
    maxPage = Math.ceil(hits.totalHits / pageSize);
    console.log(maxPage);
    renderUsers(hits.hits, userList, loader, btnLoadMore);
  } catch (error) {
    console.log(error);
  }
  checkBtnStatus();
});
btnLoadMore.addEventListener('click', async event => {
  event.preventDefault();
  loader.classList.add('footer-loader');
  loader.classList.remove('is-hidden');
  currentPage += 1;
  try {
    const hits = await fetchUsers(input.value, currentPage);
    renderUsers(hits.hits, userList, loader, btnLoadMore);
  } catch (error) {
    console.log(error);
  }
  window.scrollBy({
    top: getParam() * 2,
    left: 0,
    behavior: 'smooth',
  });
  checkBtnStatus();
});
function checkBtnStatus() {
  if (currentPage >= maxPage) {
    btnLoadMore.classList.add('is-hidden');
    iziToast.show({
      title: 'Error',
      message: "We're sorry, but you've reached the end of search results.",
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } else {
    btnLoadMore.classList.remove('is-hidden');
  }
  loader.classList.add('is-hidden');
}
