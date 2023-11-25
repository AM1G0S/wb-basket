import {basketData} from "./utilities/data.js";

// Позиционирование подсказки
export function positionTooltip(tooltipTrigger) {
	const tooltip = tooltipTrigger.closest('.tooltip-wrapper').querySelector('.tooltip');
	const tooltipHeight = tooltip.getBoundingClientRect().height;
	const tooltipTriggerRect = tooltipTrigger.getBoundingClientRect();
	const mobileMenuHeight = document.querySelector('.footer__menu-mobile').getBoundingClientRect().height;
	
	// Вычисление расстояния до нижней границы окна
	const distanceToBottom = (window.innerHeight - mobileMenuHeight) - (tooltipTriggerRect.top + tooltipTriggerRect.height);
	
	// Применение класса для отображения подсказки сверху, если она не помещается снизу
	tooltip.classList.toggle("tooltip-top", distanceToBottom < tooltipHeight);
}

// Создание подсказки со скидками
export function createDiscountTooltip(tooltip) {
	const productID = tooltip.closest('.cart__item').dataset.id;
	const product = basketData.items.find(product => product.id == productID);
	
	const productPrice = product.price.original;
	const discounts = product.discounts;
	
	// Создание блоков с информацией о скидках
	const discountBlocks = discounts.map(discount => {
		return (
			`
            <div class="text-13">
                <dt>${discount.name}</dt>
                <dd>−${Math.round(productPrice * discount.value)} сом</dd>
            </div>
            `
		);
	}).join('');
	
	// Вставка блоков с информацией о скидках внутрь подсказки
	tooltip.querySelector('dl').innerHTML = discountBlocks;
}
