/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';
// import Tabs from './modules/tabs';
// import Accordion from './modules/accordion';

BaseHelpers.checkWebpSupport();
/* Добавление класса touch для HTML если браузер мобильный */
// BaseHelpers.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
BaseHelpers.addLoadedClass();
/* Фиксированный header */
// BaseHelpers.headerFixed();


/** ===================================================================================
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/** ===================================================================================
 *  Модуль для работы с меню (Бургер)
 * */
// new BurgerMenu().init();

/** ===================================================================================
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/** ===================================================================================
 * Параллакс мышей
 * */
// new MousePRLX();


/* ТАБЫ ================================================================================================
 	* На wrapper блока табов добавить атрибут data-tabs="название"
	* Для обертки title табов добавить класс "tabs__nav"
	* Для title таба добавить класс "tabs__trigger"
	* Для обертки body табов добавить класс "tabs__content"
	* Для body таба добавить класс "tabs__panel"
*/
// new Tabs('название', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });
/* АККАРДЕОН ===========================================================================================
 	* Класс wrapper блока аккардеона добавить в инициализацию аккардиона
	* Каждый элемент аккардеона обернуть в блок с классом "accordion__item"
	* Для title аккардеона добавить класс "accordion__header"
	* Для content аккардеона добавить класс "accordion__content"
*/
// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

/* Динамический адаптив =================================================================================
* Что бы перебросить блок в другой блок, повешай на него атрибут:
* data-da="class блока куда нужно перебросить, брекпоинт(ширина экрана), позиция в блоке(цифра либо first,last)"
*/
/*Расскоментировать для использования*/
import { useDynamicAdapt } from './modules/dynamicAdapt.js'
useDynamicAdapt()

/* Маска для инпута tel =================================================================================
	* Добавить класс tel к нужному инпуту 
*/
// import { maskTel } from './modules/index.js'
// maskTel()

/* Cкрыть меню при клике на его ссылки ==================================================================
*/
// import { toggleLinkMenuNoOpen } from './modules/index.js'
//toggleLinkMenuNoOpen()

/* Cкрыть меню при клике вне его ========================================================================
	* Добавить к меню класс 'your-menu'
*/
// import { toggleLinkMenuNoOpen } from './modules/index.js'
// toggleOutClickMenuRemoveOpen()

/* Удалить класс _active при клике вне элемента =========================================================
	* Передать в функцию нужный элемент и класс который нужно удалить
*/
// import { removeClassOutClickElement } from './modules/index.js'
// const elements = document.querySelectorAll('.class'); 
// removeClassOutClickElement(elements, '.removeClass')

/* Инициализация  swiper =================================================================================
*/
// const swiper = new Swiper('.swiper', {
//   speed: 800,
//   spaceBetween: 16,
//   slidesPerView: 1.4,
//   modules: [Autoplay, Navigation, Pagination],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },
//   navigation: {
//     prevEl: ".reviews__button-slider-prev",
//     nextEl: ".reviews__button-slider-next"
//   },
//   pagination: {
//     el: ".card-slider__pagination",
//     dynamicBullets: true,
//     clickable: true,
//   },
//   breakpoints: {
//     1400: {
//       slidesPerView: 4,
//       spaceBetween: 24,
//   	},
//     1650: {
//         slidesPerView: 4,
//         spaceBetween: 48,
//     }
//   },
// });

const popupProductsSlider = new Swiper('.popup-products__slider', {
  speed: 800,
  spaceBetween: 0,
  slidesPerView: 1,
  modules: [Autoplay, Navigation, Pagination],
  loop: true,
  initialSlide: 0,
  autoplay: {
    delay: 2500,
    stopOnLastSlide: false,
    disableOnIteration: false,
  },
  navigation: {
    prevEl: ".popup-products__button-prev",
    nextEl: ".popup-products__button-next"
  },
  pagination: {
    el: ".popup-products__pagintainon",
    clickable: true,
  },
});


/* Валидация формы ======================================================================================
* В константу записывает нужную форму
* В переменную formNAME передаем форму
* В переменную popupTranks передаем окно благодарности
* Добавить класс _email на input type='mail'
* Добавить класс tel на input type='tel'
* Добавить каласс _req на input которые нужно проверить
* Добавить класс .popup-thanks для модального окна спасибо
  Раскоментировать для использования
*/ 
// import { validForm } from './modules/validFrom.js'
// const popupTranks = document.querySelector('.popup-thanks')
// const formNAME = document.getElementById('form-NAME')
// validForm(fromName, popupTranks)
// =======================================================================================================

/* Добавление класса _active родителю при клике ==========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClassParent } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClassParent(elementAll)

/* Динамический класса _active элементу при клике ========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClass } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClass(elementAll)

const catalogMenuRows = document.querySelectorAll('.catalog-menu__row');

catalogMenuRows.forEach(catalogMenuRow => {
  let isDown = false;
  let startX;
  let scrollPos = 0; // Keeps track of the translateX position
  let containerWidth = catalogMenuRow.parentElement.offsetWidth; // Width of the visible container
  let contentWidth = catalogMenuRow.scrollWidth; // Width of the entire scrollable content
  let maxScroll = contentWidth - containerWidth; // Maximum scroll distance (content width minus container width)

  // Set the initial transform position
  catalogMenuRow.style.transform = `translateX(0px)`; 

  // Mouse Events
  catalogMenuRow.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    catalogMenuRow.style.cursor = 'grabbing'; // Change cursor to indicate dragging
  });

  catalogMenuRow.addEventListener('mouseleave', () => {
    isDown = false;
    catalogMenuRow.style.cursor = 'grab';
  });

  catalogMenuRow.addEventListener('mouseup', () => {
    isDown = false;
    catalogMenuRow.style.cursor = 'grab';
  });

  catalogMenuRow.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const moveBy = x - startX;
    startX = x; // Update startX for continuous dragging
    scrollPos += moveBy; // Update the translateX position

    // Boundaries to prevent scrolling too far in either direction
    if (scrollPos > 16) {
      scrollPos = 16; // Prevent scrolling beyond left boundary (left side fully visible)
    } else if (scrollPos < -maxScroll) {
      scrollPos = -maxScroll; // Prevent scrolling beyond right boundary (right side fully visible)
    }

    catalogMenuRow.style.transform = `translateX(${scrollPos}px)`;
  });

  // Touch Events for mobile devices
  catalogMenuRow.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
  });

  catalogMenuRow.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const moveBy = x - startX;
    startX = x;
    scrollPos += moveBy;

    // Boundaries to prevent scrolling too far in either direction
    if (scrollPos > 16) {
      scrollPos = 16; // Prevent scrolling beyond left boundary
    } else if (scrollPos < -maxScroll) {
      scrollPos = -maxScroll; // Prevent scrolling beyond right boundary
    }

    catalogMenuRow.style.transform = `translateX(${scrollPos}px)`;
  });

  catalogMenuRow.addEventListener('touchend', () => {
    isDown = false;
  });

  // Recalculate boundaries if window is resized
  window.addEventListener('resize', () => {
    containerWidth = catalogMenuRow.parentElement.offsetWidth;
    contentWidth = catalogMenuRow.scrollWidth;
    maxScroll = contentWidth - containerWidth; // Update max scroll when window is resized
  });
});

const catalogMenuFixed = document.querySelector('.catalog__menu-fixed');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    catalogMenuFixed.classList.add('active');
  } else {
    catalogMenuFixed.classList.remove('active');
  }
});




//добавление в number
document.addEventListener("DOMContentLoaded", function () {
	const minusButtons = document.querySelectorAll('.quantity__number-minus');
	const plusButtons = document.querySelectorAll('.quantity__number-plus');
	const inputs = document.querySelectorAll('.quantity__input');
  
	function decreaseValue(input) {
	  let value = parseInt(input.value);
	  if (value > 1) {
		value--;
		input.value = value;
	  }
	}
  
	function increaseValue(input) {
	  let value = parseInt(input.value);
	  value++;
	  input.value = value;
	}
  
	minusButtons.forEach(function (button) {
	  button.addEventListener('click', function () {
		const input = button.nextElementSibling;
		decreaseValue(input);
	  });
	});
  
	plusButtons.forEach(function (button) {
	  button.addEventListener('click', function () {
		const input = button.previousElementSibling;
		increaseValue(input);
	  });
	});
  });
  