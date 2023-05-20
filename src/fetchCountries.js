import { onCheckAmount } from '.';
import { onError } from '.';

export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  fetch(url)
    .then(responce => responce.json())
    .then(res => {
      onCheckAmount(res);
    })
    .catch(error => {
      onError();
    });
}
