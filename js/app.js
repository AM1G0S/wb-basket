import {
	onCountChange,
	onCountInputChange,
	incrementCount,
	toggleFavoriteStatus,
	toggleProductStatus,
	clearSearchHistory,
	updatePaymentMethod,
	updateShippingAddressCallback,
	decrementCount,
	removeProduct,
	calculateFinalPrice,
	calculateTotalCount,
} from './basket.js';
import {
	showPopup,
	unfixPageScroll,
	onTabChange,
	deleteHistoryItem,
	removeShippingItem,
	closePopup,
	clearPaymentInput,
	clearShippingInput,
} from './popup.js';

import {numberFormat} from './utilities/numberFormat.js';
import {throttle} from './utilities/throttle.js';
import {handleTelInputChange, validateInput} from './utilities/validator.js';
import handleOrderSubmit, {handleImmediatePaymentChange} from './purchaseForm.js'
import {createDiscountTooltip, positionTooltip} from './tooltip.js';
import {wordSelectionFrom} from './utilities/wordSelectionFrom.js';

// Компоненты формы
const orderForm = document.querySelector('#make-order-form');
const immediatePaymentCheckbox = orderForm.querySelector('#immediate-payment');
const immediatePaymentDescription = orderForm.querySelector('.main__payment-term-description');
const recepientForm = document.querySelector('#recepient-data');
const totalPriceBlock = orderForm.querySelector('#price-total');
const submitButton = orderForm.querySelector('button[type="submit"]');

// Навигация между вкладками в модальном окне доставки
const tabs = document.querySelectorAll('input[name="tab"]');
tabs.forEach(tab => tab.onchange = onTabChange);

// Выбор товара
const products = document.querySelectorAll('.cart__items .item');
products.forEach(product => {
	const productInput = product.querySelector('.input-checkbox');
	productInput.addEventListener('change', () => toggleProductStatus(product))
})

// Выбор всех товаров
const selectAllButton = document.querySelector('.cart #select-all');
selectAllButton.addEventListener('change', () => {
	const isChecked = selectAllButton.checked;
	
	products.forEach(product => {
		const productInput = product.querySelector('.input-checkbox');
		
		if (isChecked !== productInput.checked) {
			productInput.checked = isChecked;
			toggleProductStatus(product, isChecked);
		}
	});
});

// Диалоговые окна
const popupTriggers = document.querySelectorAll('[data-popup]');
popupTriggers.forEach(popupTrigger => popupTrigger.onclick = showPopup);

const popupCloseButtons = document.querySelectorAll('#popup-close');
popupCloseButtons.forEach(button => button.onclick = closePopup);

const dialogs = document.querySelectorAll('dialog');
dialogs.forEach(dialog => {
	const dialogWrapper = dialog.querySelector('.dialog__wrapper');
	dialogWrapper.addEventListener('click', (e) => e.stopPropagation());
	dialog.addEventListener('click', closePopup);
	dialog.addEventListener('close', unfixPageScroll);
});

const shippingDialog = document.querySelector('.delivery-dialog.dialog');
shippingDialog.addEventListener('close', clearShippingInput)

const paymentDialog = document.querySelector('.payment-dialog.dialog');
paymentDialog.addEventListener('close', clearPaymentInput)

const shippingDeleteButtons = document.querySelectorAll('.delivery__delete');
shippingDeleteButtons.forEach(button => button.addEventListener('click', removeShippingItem))

// Обновление информации о месте доставки
const shippingForm = document.querySelector('.delivery-dialog__form');
shippingForm.addEventListener('submit', updateShippingAddressCallback);

// Обновление метода оплаты
const paymentForm = document.querySelector('.payment-dialog form');
paymentForm.addEventListener('submit', updatePaymentMethod);

// Производим расчет размера скидки для каждого товара.
document.addEventListener('DOMContentLoaded', () => {
	const discountTooltips = document.querySelectorAll('.item__sum-discountless .tooltip');
	discountTooltips.forEach(createDiscountTooltip)
})


// Обработка события отправки формы заказа
orderForm.addEventListener('submit', (event) => handleOrderSubmit(event, recepientForm));

// Проверка корректности данных в полях формы получателя.
recepientForm.querySelectorAll('input').forEach(input => {
	input.onblur = () => {
		if (!input.value) return;
		input.oninput = () => validateInput(input);
		validateInput(input);
	}
	if (input.id === 'tel') {
		input.addEventListener('input', () => handleTelInputChange(input));
	}
});

// Рассположение подсказок
const tooltips = document.querySelectorAll(".tooltip-trigger");
const positionTooltipThrottled = throttle(positionTooltip, 50);

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener("scroll", () => tooltips.forEach(positionTooltipThrottled));
	window.addEventListener("resize", () => tooltips.forEach(positionTooltipThrottled));
});

// Обработка чекбокса мгновенной оплаты
immediatePaymentCheckbox.addEventListener('change', () =>
	handleImmediatePaymentChange(immediatePaymentCheckbox, submitButton, totalPriceBlock, immediatePaymentDescription));

// Скрытие товаров
const hideButtons = document.querySelectorAll('.cart__controls-show');
hideButtons.forEach(button => {
	const productsBlock = button.closest('.cart__controls').nextElementSibling;
	button.addEventListener('click', () => hideProducts(button, productsBlock))
});

// Модификация количества товара.
const counters = document.querySelectorAll('.item__counter');
counters.forEach(counter => {
	const input = counter.querySelector('input.item__counter-input');
	const minusButton = counter.querySelector('.item__counter-minus');
	const plusButton = counter.querySelector('.item__counter-plus');
	
	input.oninput = onCountInputChange;
	input.onchange = onCountChange;
	minusButton.onclick = decrementCount;
	plusButton.onclick = incrementCount;
	
	// задаем disable для кнопки, если текущее значение равно минимальному или максимальному
	const currentValue = parseInt(input.value);
	const minValue = parseInt(input.getAttribute('min')) || 1;
	const maxValue = parseInt(input.getAttribute('max')) || Infinity;
	
	minusButton.disabled = currentValue <= minValue;
	plusButton.disabled = currentValue >= maxValue;
})

// Добавление товаров в список избранного.
const favoriteButtons = document.querySelectorAll('.control-buttons__favorite');
favoriteButtons.forEach(button => button.addEventListener('click', toggleFavoriteStatus))

// Удаление товаров
const deleteButtons = document.querySelectorAll('.control-buttons__delete');
deleteButtons.forEach(button => button.addEventListener('click', removeProduct))

function hideProducts(button, elementToHide) {
	const label = button.closest('.cart__controls').querySelector('label');
	const countBlock = button.closest('.cart__controls').querySelector('.cart__controls-items-count');
	const countElement = document.querySelector('.items-count');
	const priceElement = document.querySelector('.items-price');
	
	elementToHide.classList.toggle('hidden');
	button.classList.toggle('hidden');
	if (label && countBlock) {
		label.classList.toggle('hidden');
		countBlock.classList.toggle('hidden');
	}
	
	if (elementToHide.classList.contains('hidden')) {
		elementToHide.classList.add('overflow-hidden');
		elementToHide.addEventListener('transitionend', resetOverflow);
	} else {
		elementToHide.removeEventListener('transitionend', resetOverflow);
	}
	
	updateProductInfo(countElement, priceElement);
	
	function resetOverflow(event) {
		if (event.propertyName !== 'grid-template-rows') return;
		
		if (!elementToHide.classList.contains('hidden')) {
			elementToHide.classList.remove('overflow-hidden')
		}
	}
}

function updateProductInfo(countElement, priceElement) {
	countElement.textContent = `${calculateTotalCount()} ${wordSelectionFrom(calculateTotalCount(), ['товар', 'товара', 'товаров'])} · `;
	priceElement.textContent = `${numberFormat(calculateFinalPrice(), ' ')} сом`;
}

// Отображение и скрытие блока истории поиска
function outputSearchVisible() {
	let searchInput = document.getElementById("searchField");
	let outputSearch = document.querySelector(".output-search");
	let searchForm = document.querySelector(".search");
	let searchBtn = document.querySelector(".search__btn");
	
	searchForm.addEventListener("submit", function (event) {
		event.preventDefault();
	});
	
	function showOutputSearch() {
		outputSearch.classList.add("show");
		searchForm.classList.add("output-show");
	}
	
	function hideOutputSearch() {
		outputSearch.classList.remove("show");
		searchForm.classList.remove("output-show");
	}
	
	searchInput.addEventListener("focus", showOutputSearch);
	
	searchInput.addEventListener("blur", function () {
		if (!searchForm.contains(document.activeElement)) {
			hideOutputSearch();
		}
	});
	
	searchForm.addEventListener("mousedown", function (event) {
		if (event.target !== searchInput) {
			event.preventDefault();
		}
	});
	
	searchBtn.addEventListener("click", function () {
		outputSearch.classList.toggle("show");
		searchForm.classList.toggle("output-show");
	});
	
	document.addEventListener("mousedown", function (event) {
		if (!searchForm.contains(event.target) && !outputSearch.contains(event.target)) {
			hideOutputSearch();
		}
	});
}

document.addEventListener("DOMContentLoaded", outputSearchVisible);

// Скрывает блок с историей поиска при нажатии на кнопку Очистить историю
clearSearchHistory('history-list', 'output-search__btn')

// Удаление элементов из истории поиска
const searchHistoryDeleteButtons = document.querySelectorAll('.output-search__delete');
searchHistoryDeleteButtons.forEach(button => button.addEventListener('click', deleteHistoryItem))
