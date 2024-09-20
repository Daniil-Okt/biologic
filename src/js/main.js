/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper, { Autoplay, Navigation, Pagination, Thumbs } from 'swiper';

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';
import Tabs from './modules/tabs';
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
new Tabs('office-tabs', {
	onChange: (data) => {
		console.log(data);
	},
});
/* АККАРДЕОН ===========================================================================================
 	* Класс wrapper блока аккардеона добавить в инициализацию аккардиона
	* Каждый элемент аккардеона обернуть в блок с классом "accordion__item"
	* Для title аккардеона добавить класс "accordion__header"
	* Для content аккардеона добавить класс "accordion__content"
*/
// new Accordion('.accordion', {
	// shouldOpenAll: false, // true
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
import { maskTel } from './modules/index.js'
maskTel()

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

function initPopupProductsSlider() {
	new Swiper('.popup-products__slider', {
		speed: 800,
		spaceBetween: 0,
		slidesPerView: 1,
		// modules: [Autoplay, Navigation, Pagination],
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
}
const paginationWealthSlider = new Swiper('.wealth__pagination-number', {
    slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
    spaceBetween: 16, // Расстояние между миниатюрами
    watchSlidesProgress: true, // Следим за прогрессом миниатюр
});
const wealthSlider = new Swiper('.wealth__slider', {
  speed: 800,
  spaceBetween: 25,
  slidesPerView: 'auto',
  modules: [Autoplay, Navigation, Pagination,Thumbs],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },
  navigation: {
    prevEl: ".reviews__button-slider-prev",
    nextEl: ".reviews__button-slider-next"
  },
  pagination: {
    el: ".card-slider__pagination",
    dynamicBullets: true,
    clickable: true,
  },
  thumbs: {
	swiper: paginationWealthSlider, // Связываем слайдер с миниатюрами
	},
  breakpoints: {
	1076: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
	1351: {
        slidesPerView: 2,
        spaceBetween: 25,
    }
  },
});

const teamSlider = new Swiper('.team__slider', {
  speed: 1200,
  spaceBetween: 16,
  slidesPerView: 1,
  modules: [Pagination],
//   loop: true,
  initialSlide: 0,
  pagination: {
    el: ".team__pagination",
    clickable: true,
  },
  breakpoints: {
    501: {
      slidesPerView: 1.5,
      spaceBetween: 16,
  	},
	721: {
		slidesPerView: 2,
		spaceBetween: 25,
	},
	901: {
		slidesPerView: 2.5,
		spaceBetween: 25,
	},
	1001: {
		slidesPerView: 3,
		spaceBetween: 25,
	},
    1301: {
        slidesPerView: 4,
        spaceBetween: 25,
    }
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
import { toggleActiveClassParent } from './modules/index.js'
const officePanelHead = document.querySelectorAll('.office-panel-head');
toggleActiveClassParent(officePanelHead)

/* Динамический класса _active элементу при клике ========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClass } from './modules/index.js'
// toggleActiveClass(officeAddressButtonChoose)


//добавление в number
function numberСounterInit() {
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
}
//корзина
function initBasket () {
	const basketOpenAll = document.querySelectorAll('.basket-open')
	if (basketOpenAll.length > 0 && document.querySelector('.basket')) {
	  basketOpenAll.forEach(button => {
		  button.addEventListener('click', () => {
			  document.querySelector('.basket').classList.add('open')
			  document.documentElement.classList.add('lock')
		  })
	  });
	}
  
	const basketCloseAll = document.querySelectorAll('.basket-close')
	if (basketCloseAll.length > 0 && document.querySelector('.basket')) {
	  basketCloseAll.forEach(button => {
		  button.addEventListener('click', () => {
			  document.querySelector('.basket').classList.remove('open')
			  document.documentElement.classList.remove('lock')
		  })
	  });
	}
  
	const basket = document.querySelector('.basket')
	const basketContent = document.querySelector('.basket__content')
	  if (basket) {
		  basket.addEventListener('click', function(event) {
			  if (!basketContent.contains(event.target)) {
				  basket.classList.remove('open')
				  document.documentElement.classList.remove('lock')
			  }
	  });
	  }
  }


document.addEventListener("DOMContentLoaded", function () {
	numberСounterInit() 
	initBasket()
	initPopupProductsSlider()
});

//липкое меню каталога
const catalogMenuFixed = document.querySelector('.catalog__menu-fixed');
if (catalogMenuFixed) {
	window.addEventListener('scroll', () => {
		if (window.scrollY > 200) {
		  catalogMenuFixed.classList.add('active');
		} else {
		  catalogMenuFixed.classList.remove('active');
		}
	});
}




//select
document.addEventListener('DOMContentLoaded', function() {
	const selectHeads = document.querySelectorAll('.select__head');
	const selectItems = document.querySelectorAll('.select__item');
	const selectInputs = document.querySelectorAll('.select__input');
	selectHeads.forEach(function(selectHead) {
	  selectHead.addEventListener('click', function() {
		if (selectHead.classList.contains('open')) {
		  selectHead.classList.remove('open');
		  selectHead.nextElementSibling.classList.remove('open');
		} else {
		  selectHeads.forEach(function(head) {
			head.classList.remove('open');
			head.nextElementSibling.classList.remove('open');
		  });
		  selectHead.classList.add('open');
		  selectHead.nextElementSibling.classList.add('open');
		}
	  });
	});
	selectInputs.forEach(function(selectInput) {
		selectInput.addEventListener('click', function() {
		  if (selectInput.classList.contains('open')) {
			selectInput.classList.remove('open');
			selectInput.nextElementSibling.nextElementSibling.classList.remove('open');
		  } else {
			selectInputs.forEach(function(input) {
			  input.classList.remove('open');
			  input.nextElementSibling.classList.remove('open');
			});
			selectInput.classList.add('open');
			selectInput.nextElementSibling.nextElementSibling.classList.add('open');
		  }
		});
	  });

	selectItems.forEach(function(selectItem) {
	  selectItem.addEventListener('click', function() {
		selectHeads.forEach(function(head) {
		  if (head.classList.contains('open')) {
			selectItems.forEach(item  => {
			  if (item.classList.contains('open')) {
				item.classList.remove('open')
			  }
			})
			head.classList.remove('open');
			head.nextElementSibling.classList.remove('open');
			selectItem.classList.add('open');
			selectItem.parentElement.classList.remove('open');
			selectItem.parentElement.parentElement.previousElementSibling.textContent = selectItem.textContent;
			selectItem.parentElement.parentElement.previousElementSibling.classList.add('select-active');
			selectItem.parentElement.parentElement.previousElementSibling.previousElementSibling.value = selectItem.textContent;
		  }
		  
		});
		selectInputs.forEach(function(input) {
			if (input.classList.contains('open')) {
			  selectItems.forEach(item  => {
				if (item.classList.contains('open')) {
				  item.classList.remove('open')
				}
			  })
			  input.classList.remove('open');
			  input.nextElementSibling.classList.remove('open');
			  input.nextElementSibling.nextElementSibling.classList.remove('open');
			  selectItem.classList.add('open');
			  selectItem.parentElement.classList.remove('open');
			  selectItem.parentElement.parentElement.previousElementSibling.textContent = selectItem.querySelector('p').textContent;
			  selectItem.parentElement.parentElement.previousElementSibling.classList.add('select-active');
			  selectItem.parentElement.parentElement.previousElementSibling.previousElementSibling.value = selectItem.querySelector('p').textContent;
			}
			
		  });
	  });
	});
  
	document.addEventListener('click', function(e) {
	  if (!e.target.closest('.select')) {
		selectHeads.forEach(function(head) {
		  if (head.classList.contains('open')) {
			head.classList.remove('open');
			head.nextElementSibling.classList.remove('open');
		  } else {
			// head.classList.remove('open');
			// head.nextElementSibling.classList.remove('open');
		}
		  
		});
	  }
	});
  });
document.addEventListener('click', function (event) {
    const selectAll = document.querySelectorAll('.select');
	if (selectAll.length > 0) {
		selectAll.forEach(select => {
			const isClickInside = select.contains(event.target);
			if (!isClickInside) {
				// Remove 'open' class from all elements inside '.select'
				const openElements = select.querySelectorAll('.open');
				if (openElements.length > 0) {
					openElements.forEach(function (element) {
						element.classList.remove('open');
					});
				}
			}
		});
	}
});


//удаление содержимого из popup-products
document.addEventListener('DOMContentLoaded', () => {
	const popup = document.querySelector('.popup-products');
	const closeButtons = document.querySelectorAll('.button-close, [data-close-overlay]');
	const popupBody = document.querySelector('.popup-products__body');
	
	closeButtons.forEach(button => {
	  button.addEventListener('click', (event) => {
		// Проверка, что клик не произошел на popupBody или внутри него
		if (popupBody && !popupBody.contains(event.target)) {
		  // Удаляем все содержимое из popup-products__body
		 
		  setTimeout(() => {
			popupBody.innerHTML = '';
		  }, 300);
		}
	  });
	});
  });
  

//Положение выподающего списка
  function adjustDropdownPosition(dropdown) {
	// Получаем размеры и положение элемента
	const dropdownRect = dropdown.getBoundingClientRect();
	const windowWidth = window.innerWidth;
  
	// Проверяем, помещается ли элемент на странице с учетом его ширины
	if (dropdownRect.left + dropdownRect.width + 16 > windowWidth) {
	  // Если не помещается, сдвигаем его с right: 0
	  dropdown.style.left = 'auto';
	  dropdown.style.right = '0';
	} else {
	  // Если помещается, возвращаем к left: 0
	  dropdown.style.left = '0';
	  dropdown.style.right = 'auto';
	}
  }

  const catalogMenIitemAllBody = document.querySelectorAll('.catalog-menu-item-all__body');
  if (catalogMenIitemAllBody.length >0) {
	catalogMenIitemAllBody.forEach(bodyMenu => {
	
		adjustDropdownPosition(bodyMenu); // Проверяем каждый выпадающий элемент
		// Также следим за изменениями размера окна
		window.addEventListener('resize', () => adjustDropdownPosition(bodyMenu));
	  });
	  
  }


//список изменющийся
  document.addEventListener('DOMContentLoaded', function() {
    const selectСhange = document.querySelectorAll('.select-change');

    selectСhange.forEach(function(select) {
        const selectButton = select.querySelector('.select__button');
        const inputField = select.querySelector('.select__input');
        const selectHead = select.querySelector('.select__head');
        const selectList = select.querySelector('.select__list');
        let isEditing = false;

        selectButton.addEventListener('click', function() {
            if (!isEditing) {
                // First click: Focus the input, change button text, add 'save' class and 'open' class to relevant elements
                inputField.focus();
                selectButton.textContent = 'Сохранить';
                selectButton.classList.add('save');
                selectHead.classList.add('open');
                inputField.classList.add('open');
                selectList.classList.add('open');
                isEditing = true;
            } else {
                // Second click: Remove focus, reset button text, remove 'save' class and 'open' classes from relevant elements
                inputField.blur();
                selectButton.textContent = 'Изменить';
                selectButton.classList.remove('save');
                selectHead.classList.remove('open');
                inputField.classList.remove('open');
                selectList.classList.remove('open');
                isEditing = false;
            }
        });

        // Handle click on the input itself, also switching to edit mode
        inputField.addEventListener('click', function() {
            if (!isEditing) {
                selectButton.textContent = 'сохранить';
                selectButton.classList.add('save');
                selectHead.classList.add('open');
                inputField.classList.add('open');
                selectList.classList.add('open');
                isEditing = true;
            }
        });
    });
});



//кнопки выбора адресса в ЛК
document.addEventListener('DOMContentLoaded', function() {
	const officeAddressButtonChoose = document.querySelectorAll('.office-address__button-choose');

    officeAddressButtonChoose.forEach(function(button) {
        button.addEventListener('click', function() {
            // Убираем класс 'active' и изменяем текст у всех кнопок
            officeAddressButtonChoose.forEach(function(btn) {
                btn.classList.remove('active');
                btn.textContent = 'Выбрать';
            });

            // Добавляем класс 'active' и изменяем текст у текущей кнопки
            button.classList.add('active');
            button.textContent = 'Выбран';
        });
    });
});
//переключение ЛК в моб версии
document.addEventListener('DOMContentLoaded', function() {
    const officeButtonSwitching = document.querySelectorAll('.office__button-switching');
    const itemsOffice = document.querySelectorAll('.office__item');

    officeButtonSwitching.forEach(function(button, index) {
        button.addEventListener('click', function() {
            // Удаляем класс 'active' у всех кнопок и элементов
            officeButtonSwitching.forEach(function(btn) {
                btn.classList.remove('active');
            });
            itemsOffice.forEach(function(item) {
                item.classList.remove('active');
            });

            // Добавляем класс 'active' к нажатой кнопке и соответствующему элементу
            button.classList.add('active');
            itemsOffice[index].classList.add('active');
        });
    });
});
