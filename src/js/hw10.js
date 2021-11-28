// --- Импорты ---------------------
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import debounce  from 'lodash.debounce';

import {fetchCountries} from './fetchCountries';

import listCountriesHbs from '../handleBars/listCountries.hbs';
import oneCountryHbs from '../handleBars/oneCountry.hbs';
import {DEBOUNCE_DELAY} from '../index'
// ---------------------------------

// --- Инициализация ---------------
const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),

}
// ---------------------------------

// --- Обработка -------------------

// Больше 10 элементов
const moreThenTen = () => {
	clearList();
	Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

// Менше/равно 10 элементов, но больше 1го.
const lessThenTen = arrayCountry => {
	clearList();
  refs.countryInfo.insertAdjacentHTML('beforeend', listCountriesHbs(arrayCountry));
}

// Один элемент
const oneCountry = arrayCountry => {
	clearList();
	arrayCountry[0].languages = Object.values(arrayCountry[0].languages).join(', ');
	refs.countryInfo.insertAdjacentHTML('beforeend', oneCountryHbs(arrayCountry));
	console.log(arrayCountry[0].languages);
}

// Очистка
const clearList = () => {
	refs.countryList.innerHTML='';
	refs.countryInfo.innerHTML='';
}

// Создание списка
const createListCountry = function (arrayCountry) {
	// Больше 10 результатов
  if (arrayCountry.length > 10) {
		moreThenTen();
		return
	};
	// Один результат
	if (arrayCountry.length === 1) {
		clearList();
		oneCountry(arrayCountry);
		return;
	};
	// Больше одного, но меньше равно 10
	lessThenTen(arrayCountry);
};

const errorCountryName = error => {
	
	clearList();
	Notiflix.Notify.failure('Oops, there is no country with that name');
}

// Обработка ввода символов
const onInputField = (e) => {
	if (e.target.value.trim() !== "") {
	fetchCountries(e.target.value)
	.then(createListCountry)
	.catch((error) => errorCountryName(error));
	}
};
// ---------------------------------

// --- Слушатели -------------------
refs.searchBox.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));
// ---------------------------------

