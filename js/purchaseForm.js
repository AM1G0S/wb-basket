import {numberFormat} from "./utilities/numberFormat.js";
import {validateForm, validateInput} from "./utilities/validator.js";

export default function handleOrderSubmit(event, formForValidate) {
	if (!formForValidate) return;
	
	const {isValid, invalidInputs} = validateForm(formForValidate);
	
	if (!isValid) {
		event.preventDefault();
		invalidInputs.forEach((input) => input.scrollIntoView({behavior: "smooth", block: "center"}));
	}
	
	// Если нужно, чтобы после отправки формы пустые поля валидировались в момент ввода, а не после события blur:
	const inputs = formForValidate.querySelectorAll("input");
	inputs.forEach((input) => (input.oninput = () => validateInput(input)));
}

export function handleImmediatePaymentChange(checkbox, submitButton, priceBlock, elementToHide) {
	const label = elementToHide.closest(".main__payment-term").querySelector("label");
	
	if (checkbox.checked) {
		updatePaymentDetails(submitButton, priceBlock, elementToHide, label);
	} else {
		resetPaymentDetails(submitButton, elementToHide, label);
	}
}

function updatePaymentDetails(submitButton, priceBlock, elementToHide, label) {
	submitButton.textContent = `Оплатить ${priceBlock.textContent} сом`;
	elementToHide.style.display = "none";
	label.style.marginBottom = 0;
}

function resetPaymentDetails(submitButton, elementToHide, label) {
	submitButton.textContent = "Заказать";
	elementToHide.style.display = "block";
	label.style.marginBottom = "";
}
