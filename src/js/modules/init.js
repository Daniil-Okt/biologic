
//инициализация свайпера в модальном окне продукта
function initPopupProductsSlider() {
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
}

//инициализация инпута числе в модальном окне продукта
function numberСounterInitPopupProducts() {
	const popupProducts = document.querySelector('.popup-products')
	if (popupProducts) {
		const minusButtons = popupProducts.querySelectorAll('.quantity__number-minus');
		const plusButtons = popupProducts.querySelectorAll('.quantity__number-plus');
		const inputs = popupProducts.querySelectorAll('.quantity__input');
	  
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
}


//инициализация инпута числе в корзине
function numberСounterInitBascet() {
	const basket = document.querySelector('.basket')
	if (basket) {
		const minusButtons = basket.querySelectorAll('.quantity__number-minus');
		const plusButtons = basket.querySelectorAll('.quantity__number-plus');
		const inputs = basket.querySelectorAll('.quantity__input');
	  
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
}

//инициализаиця кнопки закрытия корзины
function initBasketClose() {
	const basketCloseAll = document.querySelectorAll('.basket-close')
	if (basketCloseAll.length > 0 && document.querySelector('.basket')) {
	  basketCloseAll.forEach(button => {
		  button.addEventListener('click', () => {
			  document.querySelector('.basket').classList.remove('open')
			  document.documentElement.classList.remove('lock')
		  })
	  });
	}
  }


//список адреса
function initListAddress() {
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
}



//выбор блюд
function addDish(button) {

	const card = button.closest('.catalog__card');
	if (!card) return;

	const dataCode = card.dataset.code;
	const imgSrc = card.querySelector('.catalog-card__img img').src;
	const titleText = card.querySelector('.catalog-card__title').textContent.trim();
	const priceText = card.querySelector('.catalog-card__price').textContent;
	const priceValue = parseFloat(priceText.replace(/[^\d.]/g, '')); 

	const openDishRow = document.querySelector('.select-dish-row__body.open');
	if (!openDishRow) return;

	const emptyCheckbox = openDishRow.querySelector('.select-dish-row__item-checkbox:not(.selected)');
	if (!emptyCheckbox) return;

	emptyCheckbox.classList.add('selected');

	const input = emptyCheckbox.querySelector('input[type="checkbox"]');
	const label = emptyCheckbox.querySelector('label');
	const sumInput = emptyCheckbox.querySelector('.select-dish-row__item-checkbox-sum'); // Новый инпут для суммы

	input.value = dataCode;
	input.checked = true;

	label.innerHTML = `<img src="${imgSrc}" alt=""> <h3>${titleText}</h3>`;

	sumInput.value = priceValue;

	button.classList.remove('active');
	button.classList.add('selected');


	// updateTotalSum(openDishRow, priceValue);
    // разблокировка setcatitem
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
}
