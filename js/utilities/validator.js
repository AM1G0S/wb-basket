const INVALID_CLASSNAME = 'invalid';
const EMPTY_WARNINGS = {
	name: 'Укажите имя',
	surname: 'Введите фамилию',
	email: 'Укажите электронную почту',
	tel: 'Укажите номер телефона',
	itn: 'Укажите индекс',
};
const MISMATCH_WARNINGS = {
	name: 'Укажите имя',
	surname: 'Введите фамилию',
	email: 'Проверьте адрес электронной почты',
	tel: 'Формат: +9 999 999 99 99',
	itn: 'Формат: 12345678901234',
};

export function validateForm(form) {
	const inputs = Array.from(form.querySelectorAll('input'));
	const isAnyInputInvalid = inputs.map(validateInput).some(validation => !validation);
	const isAnyInputEmpty = inputs.map(isInputEmpty).some(validation => validation);
	const invalidInputs = form.querySelectorAll('label.invalid input');
	
	if (isAnyInputInvalid || isAnyInputEmpty) {
		return {isValid: false, invalidInputs};
	}
	
	return {isValid: true, invalidInputs};
}

export function validateInput(input) {
	const inputID = input.id;
	const label = input.closest('label');
	const warningBlock = label.querySelector('.input-block__warning');
	const inputValue = input.value;
	
	const validationConditions = {
		'name': {
			antiPattern: /[^a-zA-Zа-яА-ЯёЁ]/,
			isValid: (value) => value === '' || !validationConditions['name'].antiPattern.test(value),
		},
		'surname': {
			antiPattern: /[^a-zA-Zа-яА-ЯёЁ]/,
			isValid: (value) => value === '' || !validationConditions['surname'].antiPattern.test(value),
		},
		'email': {
			pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
			isValid: (value) => value === '' || validationConditions['email'].pattern.test(value),
		},
		'tel': {
			pattern: /^\+\d{1}\s\d{3}\s\d{3}-\d{2}-\d{2}$/,
			isValid: (value) => value === '' || validationConditions['tel'].pattern.test(value),
		},
		'itn': {
			isValid: (value) => value.length <= 14,
		}
	};
	
	const isInputValid = validationConditions[inputID]?.isValid(inputValue);
	
	if (!isInputValid) {
		markAsInvalid(label);
		showWarning(warningBlock, MISMATCH_WARNINGS[inputID]);
		return false;
	} else {
		markAsValid(label);
		hideWarning(warningBlock);
		
		// Если нужно, чтобы после успешной ревалидации поля валидировались только после события blur, а не во время ввода:
		input.oninput = '';
		return true;
	}
}

export function handleTelInputChange(input) {
	const inputValue = input.value.replace(/\D/g, '');
	let formattedValue = formatTelNumber(inputValue);
	input.value = formattedValue;
}

function formatTelNumber(number) {
	let formattedValue = '';
	let currentPos = 1;
	
	for (let i = 0; i < number.length; i++) {
		if (currentPos === 1) {
			formattedValue += '+';
		} else if (currentPos === 2 || currentPos === 5) {
			formattedValue += ' ';
		} else if (currentPos === 8 || currentPos === 10) {
			formattedValue += '-';
		}
		formattedValue += number[i];
		currentPos++;
	}
	
	return formattedValue;
}

function isInputEmpty(input) {
	const isEmpty = input.validity.valueMissing;
	
	if (isEmpty) {
		const inputID = input.id;
		const label = input.closest('label');
		const warningBlock = label.querySelector('.input-block__warning');
		markAsInvalid(label);
		showWarning(warningBlock, EMPTY_WARNINGS[inputID]);
		return true;
	}
	return false;
}

function markAsInvalid(element) {
	if (!element.classList.contains(INVALID_CLASSNAME)) {
		element.classList.add(INVALID_CLASSNAME)
	}
}

function markAsValid(element) {
	element.classList.remove(INVALID_CLASSNAME);
}

function showWarning(element, warning) {
	element.textContent = warning;
}

function hideWarning(element) {
	element.textContent = '';
}
