export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(responce => {
    if (responce.statusText === 'OK') {
      return responce.json();
    }
    throw new Error(responce.statusText);
  });
}
