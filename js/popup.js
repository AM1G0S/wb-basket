import {changeShippingAddress} from "./basket.js";
import {basketData} from './utilities/data.js';

// Функция для переключения вкладок в диалоговом окне
export function onTabChange(event) {
	const labels = event.target.closest('.delivery-dialog__tabs').querySelectorAll('label');
	const tabsContent = document.querySelectorAll('.delivery-dialog-addresses');
	
	tabsContent.forEach(content => content.classList.toggle('hidden'));
	labels.forEach(label => label.classList.toggle('active'))
}

// Фиксация прокрутки страницы при открытии модального окна
function fixPageScroll() {
	scrollPosition = window.pageYOffset;
	html.style.top = -scrollPosition + "px";
	html.classList.add("popup-shown");
}

const html = document.documentElement;
let scrollPosition = window.pageYOffset;

// Восстановление прокрутки страницы после закрытия модального окна
export function unfixPageScroll() {
	html.classList.remove("popup-shown");
	window.scrollTo(0, scrollPosition);
	html.style.top = "";
	// html.style.paddingRight = 0 + "px";
}

// Удаление элемента в истории поиска
export function deleteHistoryItem(event) {
	const historyList = document.getElementById('history-list');
	const item = event.target.closest('.output-search__item');
	
	if (item) {
		item.remove();
		
		if (historyList.childElementCount <= 0) {
			const outputSearchTop = document.querySelector('.output-search__top');
			outputSearchTop && outputSearchTop.remove();
		}
	}
}

// Открытие модального окна
export function showPopup(event) {
	const button = event.currentTarget;
	const popupID = button.dataset.popup;
	const popup = document.getElementById(popupID);
	
	if (popup) {
		popup.showModal();
		fixPageScroll();
	}
}

// Закрытие диалогового окна
export function closePopup(event) {
	const button = event.currentTarget;
	const popup = button.closest('dialog');
	
	if (popup) {
		popup.close();
	}
}

// Сброс выбора способа доставки при закрыти модального окна
export function clearShippingInput(event) {
	const dialog = event.target;
	const checkedInput = dialog.querySelector('input.input-radio:checked');
	const isWrongInputChecked = checkedInput.id !== basketData.shipping.id;
	const correctInput = dialog.querySelector(`input#${basketData.shipping.id}`);
	
	if (isWrongInputChecked) {
		if (correctInput) {
			checkedInput.checked = false;
			correctInput.checked = true;
		} else {
			changeShippingAddress(checkedInput);
		}
	}
}

// Удаление элемента доставки
export function removeShippingItem(event) {
	const item = event.target.closest('.delivery-dialog__address');
	const input = item.querySelector('.input-radio');
	const isCurrentItem = input.checked;
	const siblingItem = item.nextElementSibling || item.previousElementSibling;
	
	if (siblingItem && !isCurrentItem) {
		item.remove();
	}
}

// Сброс выбора способа оплаты при закрытии модального окна
export function clearPaymentInput(event) {
	const dialog = event.target;
	const checkedInput = dialog.querySelector('input.input-radio:checked');
	const isWrongInputChecked = checkedInput.id !== basketData.payment.id;
	const correctInput = dialog.querySelector(`input#${basketData.payment.id}`);
	
	if (isWrongInputChecked) {
		checkedInput.checked = false;
		correctInput.checked = true;
	}
}

