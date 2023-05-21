import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
};

refs.search.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  onResetMarkup();
  const name = refs.search.value.trim();
  if (name === '') {
    return;
  }
  fetchCountries(name)
    .then(res => {
      onCheckAmount(res);
    })
    .catch(error => {
      onError();
    });
}

function onCheckAmount(res) {
  if (res.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (res.length >= 2 && res.length <= 10) {
    onRenderingCountriesList(res);
    return;
  }
  if (res.length === 1) {
    onRenderingCountryInform(res);
    return;
  }
  throw new Error('Not Found');
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
};

function onRenderingCountriesList(res) {
  let shortMarkup = '';
  res.map(({ flags, name }) => {
    const elem = `<li class='short-item'><img src="${flags.svg}" alt='${flags.alt}' width='40'><p>${name.common}</p></li>`;
    shortMarkup += elem;
  });
  addMarkupToList(shortMarkup);
}

function onRenderingCountryInform(res) {
  res.map(({ flags, name, capital, population, languages }) => {
    const languagesMarkup = Object.values(languages).join(', ');
    const elem = `<li class='country-item'><div class='country-name'><img src="${flags.svg}" alt='${flags.alt}' width='40'><p class='country-name-text'>${name.common}</p></div><div class='country-inform'><p class='country-inform-text'>Capital: ${capital}</p><p class='country-inform-text'>Population: ${population}</p><p class='country-inform-text'>Languages: ${languagesMarkup}</p></div></li>`;
    addMarkupToList(elem);
  });
}

function addMarkupToList(string) {
  refs.list.insertAdjacentHTML('beforeend', string);
}

function onResetMarkup() {
  refs.list.innerHTML = '';
}
