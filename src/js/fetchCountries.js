
// Внешняя функция с именованным экспортом
function fetchCountries(name) {
  return  fetch(`https://restcountries.com/v3.1/name/${name.trim()}?fields=languages,flags,population,capital,name`)
    .then(
      (response) => 
      {
        if (!response.ok) {
          throw new Error(response.status);
        };
        return response.json();        
      });
}

// ---------------------------------------
export {fetchCountries};
