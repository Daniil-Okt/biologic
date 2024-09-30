/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */



let progressBar = document.querySelector('.loader-progress');
let progress = 0;
let intervalTime = 30;
let duration = 3000;

let maxBeforeLoad = 90;

let increment = (maxBeforeLoad / duration) * intervalTime;

let interval = setInterval(function() {
    if (progress < maxBeforeLoad) {
        progress += increment;
        progressBar.style.width = progress + '%';
    } else {
        clearInterval(interval);
    }
}, intervalTime);

window.addEventListener('load', function() {
    setTimeout(() => {
      clearInterval(interval);
      progressBar.style.width = '100%';
    }, 0);
});

// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper, { Autoplay, Navigation, Pagination, Thumbs } from 'swiper';

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';
import Tabs from './modules/tabs';
import AirDatepicker from 'air-datepicker';


document.addEventListener('DOMContentLoaded', function() {
  let dpMin, dpMax;

  const today = new Date();


  dpMin = new AirDatepicker('#date-min', {
    autoClose: true,
    minDate: today, // Устанавливаем минимальную дату на сегодня
    onSelect({ date }) {
        const maxDate = new Date(date);
        maxDate.setDate(maxDate.getDate() + 6);

        dpMax.update({
            minDate: new Date(date.getTime() + 24 * 60 * 60 * 1000),
            maxDate: maxDate
        });

        const currentMaxDate = dpMax.selectedDates[0];
        const datePlusSixDays = new Date(date);
        datePlusSixDays.setDate(datePlusSixDays.getDate() + 6);

        if (!currentMaxDate || date > currentMaxDate) {
            dpMax.selectDate(datePlusSixDays);
        }

        if (currentMaxDate && currentMaxDate > datePlusSixDays) {
            dpMax.selectDate(datePlusSixDays);
        }
    },
    dateFormat(date) {
        const mainDate = date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: 'long'
        });
        const weekday = date.toLocaleString('ru-RU', {
            weekday: 'short'
        });
        return `${mainDate}, ${weekday}`;
    },
    onRender({ viewDate }) {
        // Получаем первый и последний день текущего месяца
        const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        const lastDay = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

        // Проверяем доступные даты
        let hasAvailableDates = false;

        for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
            if (d >= this.minDate && (!this.maxDate || d <= this.maxDate)) {
                hasAvailableDates = true;
                break; // Доступная дата найдена, прерываем цикл
            }
        }

        // Если нет доступных дат, переключаемся на следующий месяц
        if (!hasAvailableDates) {
            this.showMonth(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
        }
    }
});

  dpMax = new AirDatepicker('#date-max', {
    autoClose: true,
    // onSelect({ date }) {
        // dpMin.update({
            // maxDate: date
        // });
    // },
    dateFormat(date) {
        const mainDate = date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: 'long'
        });
        const weekday = date.toLocaleString('ru-RU', {
            weekday: 'short'
        });
        return `${mainDate}, ${weekday}`;
    }
  });

  function setInitialDates() {
    if (document.getElementById('date-min')) {
      const minDateValue = document.getElementById('date-min').value.trim();
      // console.log('Parsed Min Date:', parsedMinDate);
      if (minDateValue != '') {
        const parsedMinDate = parseDate(minDateValue);
        dpMin.selectDate(parsedMinDate);
      }
    }
    if (document.getElementById('date-max')) {
      const maxDateValue = document.getElementById('date-max').value.trim();
      // console.log('Parsed Max Date:', parsedMaxDate);
      if (maxDateValue != '') {
        const parsedMaxDate = parseDate(maxDateValue);
        dpMax.selectDate(parsedMaxDate);
      }
    }



}

function parseDate(dateString) {
    const months = {
        'января': 0,
        'февраля': 1,
        'марта': 2,
        'апреля': 3,
        'мая': 4,
        'июня': 5,
        'июля': 6,
        'августа': 7,
        'сентября': 8,
        'октября': 9,
        'ноября': 10,
        'декабря': 11
    };

    const dateParts = dateString.split(/[ ,]+/); // Разделяем по пробелам и запятым
    const day = parseInt(dateParts[0]);
    const month = months[dateParts[1]];
    const year = new Date().getFullYear(); // Используем текущий год

    if (!isNaN(day) && month !== undefined) {
        return new Date(year, month, day);
    } else {
        console.error('Invalid date format:', dateString);
        return null;
    }
}




  // Вызов функции после загрузки страницы
  window.addEventListener('load', setInitialDates);

  const currentHours = today.getHours();

  // Устанавливаем минимальную дату: если текущее время больше 9, минимальная дата — завтра
  const minSelectableDate = currentHours >= 10 ? new Date(today.setDate(today.getDate() + 1)) : new Date(today.setHours(0, 0, 0, 0)); // Reset time to midnight

  // Инициализация AirDatepicker
  let dataTimeDelivery = new AirDatepicker('#data-time-delivery', {
      minDate: minSelectableDate, // Ограничение выбора дат
      onSelect: (formattedDate, date) => {
          // `date` is already a Date object from AirDatepicker
          const selectedDate = date; 

          const timeOptions = document.getElementById('time-options');
          const timeItems = timeOptions.querySelectorAll('.select__item');

      

          // Скрываем все элементы времени
          timeItems.forEach(item => {
              item.style.display = 'none';
          });

          // Получаем значение из поля ввода и преобразуем его в дату
          const inputDateValue = document.getElementById('data-time-delivery').value;

          // Parse the date from DD.MM.YYYY format
          const [day, month, year] = inputDateValue.split('.').map(Number);
          const inputDate = new Date(year, month - 1, day); // Month is 0-indexed

          // Создаём новый объект даты для сравнения
          const todayComparison = new Date(); // New instance for comparison
          todayComparison.setHours(0, 0, 0, 0); // Reset time to midnight

          // Проверяем, является ли выбранная дата сегодняшним днем
          const isToday = inputDate.toDateString() === todayComparison.toDateString();

          if(inputDateValue != '') {
            timeOptions.querySelector('.select__list').classList.remove('disablet')
            if (!isToday) {
              // Если дата не сегодняшняя, показываем все доступные времена
              timeItems.forEach(item => {
                  item.style.display = 'block';
              });
            } else {
                if (currentHours >= 7 && currentHours < 10) {
                    timeOptions.querySelector('.time-19').style.display = 'block';
                    timeOptions.querySelector('.time-20').style.display = 'block';
                    timeOptions.querySelector('.time-21').style.display = 'block';
                } else if (currentHours >= 8 && currentHours < 10) {
                    timeOptions.querySelector('.time-20').style.display = 'block';
                    timeOptions.querySelector('.time-21').style.display = 'block';
                } else if (currentHours >= 9 && currentHours < 10) {
                    timeOptions.querySelector('.time-21').style.display = 'block';
                }
            }
          } else {
            // timeOptions.classList.add('disablet')
            timeOptions.querySelector('.select__list').classList.add('disablet')
            timeOptions.querySelector('.select__input').value = ''
            
            timeOptions.querySelector('.select__head').textContent = 'Выберите время'
            timeOptions.querySelector('.select__head').classList.remove('select-active')
          }

      }
  });

});



// Устанавливаем минимальную дату при инициализации
// if (dataTimeDelivery !== null) {
//   dataTimeDelivery.selectDate(minSelectableDate);
// }






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
new BurgerMenu().init();

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
if (document.querySelector('[data-tabs="office-tabs"]')) {
	new Tabs('office-tabs', {
		onChange: (data) => {
			console.log(data);
		},

	});
}
if (document.querySelector('[data-tabs="diet-tabs"]')) {
	new Tabs('diet-tabs', {
		onChange: (data) => {
			console.log(data);
		},
	});
}

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
  slidesPerView: 1,
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
	501: {
        slidesPerView: 1.5,
        spaceBetween: 25,
    },
	601: {
        slidesPerView: 2,
        spaceBetween: 25,
    },
	821: {
        slidesPerView: 2.5,
        spaceBetween: 25,
    },
	924: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
	1351: {
        slidesPerView: 2,
        spaceBetween: 25,
    }
  },
});
//слайдеры команды
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
    551: {
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
	}
  },
});

//слайдер служба и заботы
const concernsPaginationNumber = new Swiper('.concerns__pagination-number', {
    slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
    spaceBetween: 16, // Расстояние между миниатюрами
    watchSlidesProgress: true, // Следим за прогрессом миниатюр
});

const concernsSlider = new Swiper('.concerns__slider', {
  speed: 800,
  spaceBetween: 16,
  slidesPerView: 1,
  slidesPerColumn: 2,
  modules: [Autoplay, Navigation, Pagination, Thumbs],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },

  pagination: {
    el: ".concernsPaginationNumber",
    clickable: true,
  },
  thumbs: {
	swiper: concernsPaginationNumber, // Связываем слайдер с миниатюрами
	},
  breakpoints: {
	501: {
        slidesPerView: 1.5,
        spaceBetween: 16,
    },
	626: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
	821: {
        slidesPerView: 2.5,
        spaceBetween: 25,
    },
	1006: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
	1416: {
        slidesPerView: 4,
        spaceBetween: 25,
    }
  },
});

//слайдер программа лояльности
const particPaginationNumber = new Swiper('.partic-pagination-number', {
    slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
    spaceBetween: 16, // Расстояние между миниатюрами
    watchSlidesProgress: true, // Следим за прогрессом миниатюр
});

const particSlider = new Swiper('.partic-slider', {
  speed: 800,
  spaceBetween: 16,
  slidesPerView: 1,
  modules: [Autoplay, Navigation, Pagination,Thumbs],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },

  pagination: {
    el: particPaginationNumber,
    clickable: true,
  },
  thumbs: {
	swiper: particPaginationNumber, // Связываем слайдер с миниатюрами
	},
  breakpoints: {
	501: {
        slidesPerView: 1.5,
        spaceBetween: 16,
    },
	626: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
	821: {
        slidesPerView: 2.5,
        spaceBetween: 25,
    },
	1006: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
	1321: {
        slidesPerView: 'auto',
        spaceBetween: 0,
    }
  },
});

const particPaginationNumberTwo = new Swiper('.partic-pagination-number-two', {
    slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
    spaceBetween: 16, // Расстояние между миниатюрами
    watchSlidesProgress: true, // Следим за прогрессом миниатюр
});

const particSliderTwo = new Swiper('.partic-slider-two', {
  speed: 800,
  spaceBetween: 16,
  slidesPerView: 1,
  modules: [Autoplay, Navigation, Pagination,Thumbs],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },

  pagination: {
    el: particPaginationNumberTwo,
    clickable: true,
  },
  thumbs: {
	swiper: particPaginationNumberTwo, // Связываем слайдер с миниатюрами
	},
  breakpoints: {
	501: {
        slidesPerView: 1.5,
        spaceBetween: 16,
    },
	626: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
	821: {
        slidesPerView: 2.5,
        spaceBetween: 25,
    },
	1006: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
	1321: {
        slidesPerView: 'auto',
        spaceBetween: 0,
    }
  },
});


//слайдер корпоратив
const corporatePaginationNumber = new Swiper('.work-corporate__pagination-number', {
    slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
    spaceBetween: 16, // Расстояние между миниатюрами
    watchSlidesProgress: true, // Следим за прогрессом миниатюр
});

const corporateSlider = new Swiper('.work-corporate__slider', {
  speed: 800,
  spaceBetween: 16,
  slidesPerView: 1,
  modules: [Autoplay, Navigation, Pagination,Thumbs],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },

  pagination: {
    el: corporatePaginationNumber,
    clickable: true,
  },
  thumbs: {
	swiper: corporatePaginationNumber, // Связываем слайдер с миниатюрами
	},
  breakpoints: {
	501: {
        slidesPerView: 1.5,
        spaceBetween: 16,
    },
	661: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
	901: {
        slidesPerView: 2.5,
        spaceBetween: 25,
    },
	1201: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
	1401: {
        slidesPerView: 3,
        spaceBetween: 78,
    }
  },
});


//слайдер advant
const advantPaginationNumber = new Swiper('.advant__pagination-number', {
    slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
    spaceBetween: 16, // Расстояние между миниатюрами
    watchSlidesProgress: true, // Следим за прогрессом миниатюр
});

if (document.querySelector('.advant__slider') && !document.querySelector('.advant__slider').classList.contains('advant__slider-two')) {
  const advantSlider = new Swiper('.advant__slider', {
    speed: 800,
    spaceBetween: 16,
    slidesPerView: 1,
    modules: [Autoplay, Navigation, Pagination,Thumbs],
  //   loop: true,
  //   initialSlide: 1,
  //   autoplay: {
  //     delay: 2500,
  //     stopOnLastSlide: false,
  //     disableOnIteration: false,
  //   },
  
    pagination: {
      el: advantPaginationNumber,
      clickable: true,
    },
    thumbs: {
    swiper: advantPaginationNumber, // Связываем слайдер с миниатюрами
    },
    breakpoints: {
    501: {
          slidesPerView: 1.5,
          spaceBetween: 16,
      },
    661: {
          slidesPerView: 2,
          spaceBetween: 16,
      },
    901: {
          slidesPerView: 2.5,
          spaceBetween: 25,
      },
    1001: {
          slidesPerView: 3,
          spaceBetween: 25,
      },
    1166: {
          slidesPerView: 2,
          spaceBetween: 25,
      }
    },
  });
} else if (document.querySelector('.advant__slider-two')) {
  const advantSlider = new Swiper('.advant__slider-two', {
    speed: 800,
    spaceBetween: 16,
    slidesPerView: 1,
    modules: [Autoplay, Navigation, Pagination,Thumbs],
  //   loop: true,
  //   initialSlide: 1,
  //   autoplay: {
  //     delay: 2500,
  //     stopOnLastSlide: false,
  //     disableOnIteration: false,
  //   },
  
    pagination: {
      el: advantPaginationNumber,
      clickable: true,
    },
    thumbs: {
    swiper: advantPaginationNumber, // Связываем слайдер с миниатюрами
    },
    breakpoints: {
    526: {
          slidesPerView: 1.5,
          spaceBetween: 16,
      },
    721: {
          slidesPerView: 2,
          spaceBetween: 16,
      },
    931: {
          slidesPerView: 2.5,
          spaceBetween: 25,
      },
    1001: {
          slidesPerView: 2.5,
          spaceBetween: 25,
      },
    1166: {
          slidesPerView: 2,
          spaceBetween: 25,
      }
    },
  });
}

//слайдер concept
const conceptSlider = new Swiper('.concept-slider', {
  speed: 800,
  spaceBetween: 10,
  slidesPerView: 2,
  modules: [Autoplay, Navigation, Pagination],
//   loop: true,
//   initialSlide: 1,
//   autoplay: {
//     delay: 2500,
//     stopOnLastSlide: false,
//     disableOnIteration: false,
//   },

  pagination: {
    el: '.concept-slider__pagination',
    clickable: true,
  },
  breakpoints: {
    526: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerColumn: 2,
        grid: {
          rows: 2,
        },
    },
  721: {
        slidesPerView: 2,
        spaceBetween: 16,
    },
  931: {
        slidesPerView: 2.5,
        spaceBetween: 25,
    },
  1166: {
        slidesPerView: 4,
        spaceBetween: 25,
    },
  1401: {
        slidesPerView: 4,
        spaceBetween: 25,
    }
  },
});

//слайдер how

function howSliderInit() {
  if (window.innerWidth <= 1470) {
    const howPaginationNumber = new Swiper('.how__pagination-number', {
      slidesPerView: 'auto', // Количество миниатюр, показываемых одновременно
      spaceBetween: 16, // Расстояние между миниатюрами
      watchSlidesProgress: true, // Следим за прогрессом миниатюр
    });
    
    const howSlider = new Swiper('.how__slider', {
      speed: 800,
      spaceBetween: 16,
      slidesPerView: 1,
      modules: [Autoplay, Navigation, Pagination,Thumbs],
    //   loop: true,
    //   initialSlide: 1,
    //   autoplay: {
    //     delay: 2500,
    //     stopOnLastSlide: false,
    //     disableOnIteration: false,
    //   },
    
      pagination: {
        el: advantPaginationNumber,
        clickable: true,
      },
      thumbs: {
      swiper: howPaginationNumber, // Связываем слайдер с миниатюрами
      },
      breakpoints: {
      526: {
            slidesPerView: 1.5,
            spaceBetween: 16,
        },
      721: {
            slidesPerView: 2,
            spaceBetween: 16,
        },
      931: {
            slidesPerView: 2.5,
            spaceBetween: 25,
        },
      1001: {
            slidesPerView: 2.5,
            spaceBetween: 25,
        },
      1166: {
            slidesPerView: 3,
            spaceBetween: 25,
        }
      },
    });
  }
}
howSliderInit() 
window.addEventListener('resize', () => {
  howSliderInit() 
})




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
const makingStructureHead = document.querySelectorAll('.making-structure__head');
toggleActiveClassParent(makingStructureHead)

//функция добавления родителю класс клик по body
// function toggleActiveClassOnClick(selector, activeClass) {
//   document.body.addEventListener('click', function(event) {
//       const targetElement = event.target.closest(selector);
      
//       if (targetElement) {
//           const parent = targetElement.parentElement;
//           const isActive = parent.classList.contains(activeClass);

//           document.querySelectorAll(selector).forEach(item => {
//               item.parentElement.classList.remove(activeClass);
//           });

//           if (isActive) {
//               parent.classList.remove(activeClass);
//           } else {
//               parent.classList.add(activeClass);
//           }
//       }
//   });
// }


// Используем функцию
// toggleActiveClassOnClick('.basket-hide-block__head', '_active');


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


//фиксированный header
// const header = document.querySelector('.header');
// if (header) {
//   window.addEventListener('scroll', function() {
//     if (window.scrollY > 430) {
//         header.classList.add('fixed');
//     } else {
//         header.classList.remove('fixed');
//     }
// });
// }




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

        // Если у элемента есть атрибут data-adress_id
        const adressId = selectItem.getAttribute('data-adress_id');
        if (adressId) {
            // Ищем внутри родительского select скрытый input с классом .form__input-adres-id
            const parentSelect = selectItem.closest('.select');
            const hiddenInput = parentSelect.querySelector('.form__input-adres-id');

            if (hiddenInput) {
                // Устанавливаем value скрытого input равным значению атрибута data-adress_id
                hiddenInput.value = adressId;
            }
        }
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

          // Если у элемента есть атрибут data-adress_id
          const adressId = selectItem.getAttribute('data-adress_id');
          if (adressId) {
              // Ищем внутри родительского select скрытый input с классом .form__input-adres-id
              const parentSelect = selectItem.closest('.select');
              const hiddenInput = parentSelect.querySelector('.form__input-adres-id');
              
              if (hiddenInput) {
                  // Устанавливаем value скрытого input равным значению атрибута data-adress_id
                  hiddenInput.value = adressId;
              }
          }
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

//переключения в моб версии таблицы
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 750) {
        const tabTriggers = document.querySelectorAll('.office-tabs__trigger');
        const tableRows = document.querySelectorAll('.loyalty-lev__table tr');

        tabTriggers.forEach((trigger, index) => {
            trigger.addEventListener('click', function () {
                // Удаляем класс active у всех табов и ячеек таблицы
                tabTriggers.forEach(t => t.classList.remove('active'));
                tableRows.forEach(row => {
                    const cells = row.querySelectorAll('th, td');
                    cells.forEach((cell, cellIndex) => {
                        if (cellIndex > 0) { // Начиная со второго элемента
                            cell.classList.remove('active');
                        }
                    });
                });

                // Добавляем класс active к выбранному табу и соответствующим ячейкам
                this.classList.add('active');
                tableRows.forEach(row => {
                    const cells = row.querySelectorAll('th, td');
                    if (cells[index + 1]) { // Индекс сдвинут на один, чтобы начинать с 2-го элемента
                        cells[index + 1].classList.add('active');
                    }
                });
            });
        });
    }
});

//табы диеты на моб версии

if (window.innerWidth <= 750) {
	const dietTrigers = document.querySelectorAll('.diet__trigger')
	const dietContent = document.querySelector('.diet__content')
	const dietClose = document.querySelector('.diet-panel__close')

	if (dietTrigers.length > 0) {
		dietTrigers.forEach((trigger, index) => {
			// trigger.classList.remove('active')
			trigger.addEventListener('click', () => {
				if (dietContent) {
					dietContent.classList.add('_active')
					document.documentElement.classList.add('lock')
				}
			})
		});
	}
	if (dietClose) {
		dietClose.addEventListener('click', () => {
			dietContent.classList.remove('_active')
			document.documentElement.classList.remove('lock')
		})
	}
}


//календарь =========================================================
// Находим все элементы с классом select-cat-set__menu-item и select-dish-row__body
const menuItemsSelect = document.querySelectorAll('.select-cat-set__menu-item');
const dishBodies = document.querySelectorAll('.select-dish-row__body');

// Сопоставление месяцев на русском языке
const monthMap = {
    'января': 0,
    'февраля': 1,
    'марта': 2,
    'апреля': 3,
    'мая': 4,
    'июня': 5,
    'июля': 6,
    'августа': 7,
    'сентября': 8,
    'октября': 9,
    'ноября': 10,
    'декабря': 11
};

// Функция для преобразования даты из строки формата "12 июня, пн." в объект Date
function parseDate(input) {
    const parts = input.split(' ');
    const day = parseInt(parts[0], 10); // День
    const month = monthMap[parts[1].replace(',', '')]; // Месяц (удаляем запятую)
    const year = new Date().getFullYear(); // Берём текущий год, если его нет в строке

    return new Date(year, month, day);
}

// Функция для склонения слова "день"
function declensionOfDays(days) {
    if (days === 1) return 'день';
    if (days >= 2 && days <= 4) return 'дня';
    return 'дней';
}

// Функция для обновления классов элементов меню в зависимости от выбранного количества дней
function updateMenuItems(daysSelected) {
    const menuItems = document.querySelectorAll('.select-cat-set__menu-item');
    
    // Убираем класс open у всех элементов
    menuItems.forEach(item => item.classList.remove('open'));
    
    // Ограничиваем количество открытых элементов до 7, даже если выбрано больше
    const limit = Math.min(daysSelected, 7);
    
    // Добавляем класс open только к необходимому количеству элементов
    for (let i = 0; i < limit; i++) {
        menuItems[i].classList.add('open');
    }
}

// Функция для расчета разницы в днях между двумя датами
function calculateDays() {
    const startDate = document.querySelector('.start-date').value;
    const endDate = document.querySelector('.end-date').value;
    const daysElement = document.querySelector('.select-cat__days');
    
    // Если хотя бы одно из полей пустое, выводим 0 дней
    if (!startDate || !endDate) {
        daysElement.textContent = '0 дней';
        updateMenuItems(0); // Обновляем меню для 0 дней
        return;
    }

    // Преобразуем строки в объекты Date
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    // Проверка на корректные даты
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        daysElement.textContent = 'Неверный формат даты';
        updateMenuItems(0);
        return;
    }

    // Вычисляем разницу в миллисекундах и преобразуем её в дни
    let difference = ((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Если разница меньше нуля, устанавливаем 0 дней
    let days = difference >= 0 ? Math.floor(difference) : 0;

    // Обновляем элемент с количеством дней с правильным склонением
    daysElement.textContent = `${days} ${declensionOfDays(days)}`;

    // Обновляем меню с элементами, добавляя класс open
    updateMenuItems(days);
    menuItemsSelect[0].click()
    dishBodies[0].click()
}
// Отслеживаем изменения в полях ввода
if (document.querySelector('.start-date')) {
  document.querySelector('.start-date').addEventListener('blur', () => {
    setTimeout(() => {
      calculateDays()
    }, 100);
  });
}
if (document.querySelector('.end-date')) {
  document.querySelector('.end-date').addEventListener('blur', () => {
    setTimeout(() => {
      calculateDays()
    }, 100);
  });
}


//инпуты календаря ======================================================
const inputsSelect = document.querySelectorAll('.select-cat__input');
if (inputsSelect.length > 0) {
	inputsSelect.forEach(input => {
		input.addEventListener('focus', function() {
			const parentElement = input.closest('.item-input');
			// Проверяем, существует ли предыдущий элемент и добавляем класс
			if (parentElement) {
				parentElement.classList.add('active'); // Здесь можно указать нужный класс
			} 
		});
	
		input.addEventListener('blur', function() {
			const parentElement = input.closest('.item-input');
	
			// Проверяем, существует ли предыдущий элемент и убираем класс
			if (parentElement) {
				parentElement.classList.remove('active'); // Здесь можно указать нужный класс
			}
		});
	});
}

// Выбор блюд
// function addDish(button) {

// 	const card = button.closest('.catalog__card');
// 	if (!card) return;

// 	const dataCode = card.dataset.code;
// 	const imgSrc = card.querySelector('.catalog-card__img img').src;
// 	const titleText = card.querySelector('.catalog-card__title').textContent.trim();
// 	const priceText = card.querySelector('.catalog-card__price').textContent;
// 	const priceValue = parseFloat(priceText.replace(/[^\d.]/g, '')); 

// 	const openDishRow = document.querySelector('.select-dish-row__body.open');
// 	if (!openDishRow) return;

// 	const emptyCheckbox = openDishRow.querySelector('.select-dish-row__item-checkbox:not(.selected)');
// 	if (!emptyCheckbox) return;

// 	emptyCheckbox.classList.add('selected');

// 	const input = emptyCheckbox.querySelector('input[type="checkbox"]');
// 	const label = emptyCheckbox.querySelector('label');
// 	const sumInput = emptyCheckbox.querySelector('.select-dish-row__item-checkbox-sum'); // Новый инпут для суммы

// 	input.value = dataCode;
// 	input.checked = true;

// 	label.innerHTML = `<img src="${imgSrc}" alt=""> <h3>${titleText}</h3>`;

// 	sumInput.value = priceValue;

// 	button.classList.remove('active');
// 	button.classList.add('selected');

// 	// updateTotalSum(openDishRow, priceValue);
//   // разблокировка setcatitem
//   const labelsDishRow = openDishRow.querySelectorAll('.select-dish-row__item-checkbox.selected');

//   const setMenuItemsActive = document.querySelectorAll('.select-cat-set__menu-item.active')
//     if (setMenuItemsActive.length > 0) {
//       const indexLast = setMenuItemsActive.length - 1;
//       const nextItem = setMenuItemsActive[indexLast].nextElementSibling;
//       if (nextItem) {
//         if (labelsDishRow.length >= 5) {
//           nextItem.classList.remove('disablet')
//         } else {
//           nextItem.classList.add('disablet')
//         }
//       } 
//     }
// }
// const cB = document.querySelectorAll('.catalog-card__button');
// cB.forEach(button => {
//   button.addEventListener('click', () => {
//     addDish(button)
//   })
// });

// Кнопка удалить
document.addEventListener('DOMContentLoaded', function () {
  // Ищем все кнопки закрытия select-dish-row__close
  const closeButtons = document.querySelectorAll('.select-dish-row__close');

  closeButtons.forEach(button => {
      button.addEventListener('click', function () {
          // Ищем родительский элемент с классом select-dish-row__item-checkbox
          const itemCheckbox = this.closest('.select-dish-row__item-checkbox');
          
          // Убираем класс selected
          itemCheckbox.classList.remove('selected');

          // Ищем чекбокс и метку внутри этого элемента
          const input = itemCheckbox.querySelector('input[type="checkbox"]');
          const label = itemCheckbox.querySelector('label');
          const sumInput = itemCheckbox.querySelector('.select-dish-row__item-checkbox-sum'); // Новый инпут для суммы

          // Получаем цену блюда из скрытого инпута
          const priceValue = parseFloat(sumInput.value) || 0;

          // Очищаем значение чекбокса и снимаем флаг checked
          input.value = '';
          input.checked = false;

          // Очищаем содержимое метки
          label.innerHTML = '';

          // Находим открытое select-dish-row__body
          const openDishRow = itemCheckbox.closest('.select-dish-row__body.open');
          if (openDishRow) {
              // Получаем скрытый инпут для суммы в соответствующем select-dish-row__body
              const totalSumInput = openDishRow.querySelector('.select-dish-row__input-sum');
              
              // Обновляем сумму
              const currentSum = parseFloat(totalSumInput.value) || 0;
              totalSumInput.value = currentSum - priceValue; // Уменьшаем сумму

              // Обновляем элемент sum-select-body
              const sumDisplayElement = document.querySelector('.sum-select-body');
              sumDisplayElement.textContent = totalSumInput.value; // Обновляем текст с новой суммой
          }

          //блокировка setcatitem
          const labelsDishRow = openDishRow.querySelectorAll('.select-dish-row__item-checkbox.selected');
          const setMenuItemsActive = document.querySelectorAll('.select-cat-set__menu-item.active')
            if (setMenuItemsActive.length > 0) {
              const indexLast = setMenuItemsActive.length - 1;
              const nextItem = setMenuItemsActive[indexLast].nextElementSibling;
              if (nextItem) {
                if (labelsDishRow.length >= 5) {
                  nextItem.classList.remove('disablet')
                } else {
                  nextItem.classList.add('disablet')
                }
              } 
            }
      });
  });
});

// Показываем нужный body
// Функция для добавления классов при клике
menuItemsSelect.forEach((menuItem, index) => {
  menuItem.addEventListener('click', () => {
      // Убираем класс active у всех select-cat-set__menu-item
      menuItemsSelect.forEach(item => item.classList.remove('active'));
      // Добавляем класс active к текущему элементу
      menuItem.classList.add('active');
      
      // Убираем класс open у всех select-dish-row__body
      dishBodies.forEach(body => body.classList.remove('open'));
      // Добавляем класс open к соответствующему по индексу элементу select-dish-row__body
      dishBodies[index].classList.add('open');

      // Получаем скрытый инпут с ценой из открытого body
      const sumInput = dishBodies[index].querySelector('.select-dish-row__input-sum');
      const totalSum = parseFloat(sumInput.value) || 0;

      // Обновляем элемент sum-select-body с текущей ценой
      const sumDisplayElement = document.querySelector('.sum-select-body');
      sumDisplayElement.textContent = totalSum // Обновляем текст с ценой
  });
});

function clearBodyCat() {
  const selectItems = document.querySelectorAll('.select__item'); // элементы в выпадающем списке
  const inputSumElems = document.querySelectorAll('.select-dish-row__input-sum'); // все инпуты сумм
  const itemCheckboxSumElems = document.querySelectorAll('.select-dish-row__item-checkbox-sum'); // инпуты чекбоксов
  const labelElems = document.querySelectorAll('.select-dish-row__label'); // все лейблы
  const itemCheckboxElems = document.querySelectorAll('.select-dish-row__item-checkbox'); // чекбокс элементы
  const sumSelectBody = document.querySelector('.sum-select-body'); 
  // Проверяем, есть ли вообще элементы для обработки
  if (selectItems.length > 0 && inputSumElems.length > 0 && itemCheckboxSumElems.length > 0 && labelElems.length > 0 && itemCheckboxElems.length > 0) {
      selectItems.forEach(function (item) {
          item.addEventListener('click', function () {
              // Очищаем все инпуты select-dish-row__input-sum
              inputSumElems.forEach(function (input) {
                  input.value = '0';
              });

              // Очищаем все инпуты select-dish-row__item-checkbox-sum
              itemCheckboxSumElems.forEach(function (input) {
                  input.value = '';
              });

              // Очищаем содержимое всех label select-dish-row__label
              labelElems.forEach(function (label) {
                  label.textContent = '';
              });

              // Убираем класс 'selected' у всех элементов с классом select-dish-row__item-checkbox
              itemCheckboxElems.forEach(function (checkboxElem) {
                  checkboxElem.classList.remove('selected');
              });
              if (sumSelectBody) {
                sumSelectBody.textContent = '0';
              }
          });
      });
  }
}
document.addEventListener('DOMContentLoaded', function () {
  clearBodyCat() 
});



// Кнопка возврата к выбору дня
document.addEventListener('DOMContentLoaded', function () {
  const selectCatSet = document.querySelector('.select-cat-set');
  const buttonUpSelect = document.querySelector('.catalog__button-up-select');
  const footer = document.querySelector('footer'); // Предполагаем, что есть элемент footer

  if (selectCatSet && buttonUpSelect) {
      // Обработчик события прокрутки
      window.addEventListener('scroll', function () {
          const scrollY = window.scrollY || window.pageYOffset;
          const footerRect = footer.getBoundingClientRect();
          
          // Проверяем, прокрутили ли на 100 пикселей вниз и не попали ли в область footer
          if (scrollY > selectCatSet.getBoundingClientRect().top + window.scrollY + 100 && footerRect.top > window.innerHeight) {
              buttonUpSelect.classList.add('active');
          } else {
              buttonUpSelect.classList.remove('active');
          }
      });

      // Обработчик клика на кнопку
      buttonUpSelect.addEventListener('click', function () {
        // Прокручиваем страницу к элементу select-cat-set
        const headerHeight = document.querySelector('header').offsetHeight; // Получаем высоту header
        const targetElement = document.querySelector('.select-cat'); // Замените на ваш селектор
    
        // Прокручиваем к элементу с учётом высоты header
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 10; // Корректируем позицию
    
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
  }
});


//список адреса
document.addEventListener('DOMContentLoaded', function() {
  // Находим инпут и контейнер с подсказками
  const addressInput = document.querySelector('.office-address-input__input');
  const hintContainer = document.querySelector('.office-address-input__hint');

  if (addressInput && hintContainer) {
      const hintListItems = hintContainer.querySelectorAll('.hint-office-address__item');
      if (hintListItems.length > 0) {
          hintListItems.forEach(function(item) {
              item.addEventListener('click', function() {
                  const addressText = item.textContent.trim();
                  addressInput.value = addressText;

                  hintContainer.classList.remove('open');
              });
          });
      }
  }
});

//закрыть меню
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const iconMenu = document.querySelector('.icon-menu');
  const sidebarBody = document.querySelector('.sidebar__body');

  sidebar.addEventListener('click', function (event) {
    // Check if the click target is not within header__body
    if (!sidebarBody.contains(event.target)) {
      iconMenu.click(); // Trigger click on icon-menu
    }
  });
});


//корзина табы 
const basketTabTrigger = document.querySelectorAll('.basket__tab-trigger');
if (basketTabTrigger.length > 0) {
  basketTabTrigger.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
        document.querySelectorAll('.basket__tab-trigger').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.basket__tab-panel').forEach(p => p.classList.remove('active'));
  
        trigger.classList.add('active');
        document.querySelectorAll('.basket__tab-panel')[index].classList.add('active');
    });
  });
  
}



//закрыть окно описание диеты при клике на кноку


const dietPanelButton = document.querySelectorAll('.diet-panel__button');
const dietPanelClose = document.querySelector('.diet-panel__close');

if (dietPanelButton.length > 0) {
  dietPanelButton.forEach(button => {
    button.addEventListener('click', () => {
      if (dietPanelClose) {
        dietPanelClose.click()
      }
    })
  });
}

//зум карты
function adjustZoom(map) {
  const iframe = map.querySelector('iframe');
  const width = window.innerWidth;

  // Пример логики для изменения уровня зума в зависимости от ширины окна
  let zoom;
  if (width < 600) {
      zoom = 9; // Меньший зум для узких экранов
  } else if (width < 1200) {
      zoom = 10; // Средний зум для средних экранов
  } else {
      zoom = 10; // Больший зум для широких экранов
  }

  // Меняем URL iframe, чтобы обновить зум
  const baseUrl = "https://yandex.by/map-widget/v1/?ll=37.643476%2C55.757813&mode=usermaps&source=constructorLink&um=constructor%3A1a3f479f7146bc3df28ec3582a49627f0c30378a2bf07b297356179faf50959b&z=";
  iframe.src = baseUrl + zoom + "&controls=none&disable-scroll=true";
}

const blobMap = document.querySelector('.blob-map')

if (blobMap) {
    adjustZoom(blobMap);
}

window.addEventListener('resize', () => {
  if (blobMap) {
    adjustZoom(blobMap);
  }
});