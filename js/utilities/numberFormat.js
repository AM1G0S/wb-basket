export function numberFormat(number, spaceCharacter = ' ') {
	const roundedNumber = Math.round(number); // Округляем число
	const formattedNumber = roundedNumber.toLocaleString('ru-RU');
	return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, spaceCharacter);
}
