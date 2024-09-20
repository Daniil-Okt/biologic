
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
function initBasketClose () {
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





