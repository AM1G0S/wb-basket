export const basketData = {
	items: [
		{
			id: 1,
			title: 'Футболка UZcotton мужская',
			price: {
				discounted: 522,
				original: 1051
			},
			discounts: [
				{
					name: 'Скидка 55%',
					value: 0.55
				},
				{
					name: 'Скидка покупателя 10%',
					value: 0.1
				},
			],
			attributes: {
				'Цвет': 'белый',
				'Размер': '56',
			},
			location: 'Коледино WB',
			supplier: {
				title: 'OOO «Вайлдберриз»',
				PSRNSP: '1067746062449',
				address: '142181, Московская область, Г.О. ПОДОЛЬСК, Д КОЛЕДИНО, ТЕР. ИНДУСТРИАЛЬНЫЙ ПАРК КОЛЕДИНО, Д. 6, СТР. 1',
			},
			shippingSchedule: [
				{
					date: '5—6 февраля',
					maxQuantity: 3
				}
			],
			stock: 3,
			count: 1,
			isSelected: true,
			isFavorite: false,
			imageSource: '../../assets/images/product-image-1.png',
		},
		{
			id: 2,
			title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
			price: {
				discounted: 10500.235,
				original: 11500.235,
			},
			discounts: [
				{
					name: 'Скидка 55%',
					value: 0.55
				},
				{
					name: 'Скидка покупателя 10%',
					value: 0.1
				},
			],
			attributes: {
				'Цвет': 'прозрачный',
			},
			location: 'Коледино WB',
			supplier: {
				title: 'OOO «МЕГАПРОФСТИЛЬ»',
				PSRNSP: '5167746237148',
				address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
			},
			shippingSchedule: [
				{
					date: '5—6 февраля',
					maxQuantity: 184
				},
				{
					date: '7—8 февраля',
					maxQuantity: 200
				},
				{
					date: '9—10 февраля',
					maxQuantity: 616
				},
			],
			stock: 1000,
			count: 200,
			isSelected: true,
			isFavorite: false,
			imageSource: '../../assets/images/product-image-2.png',
		},
		{
			id: 3,
			title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
			price: {
				discounted: 247,
				original: 475
			},
			discounts: [
				{
					name: 'Скидка 48%',
					value: 0.48
				},
				{
					name: 'Скидка покупателя 10%',
					value: 0.1
				},
			],
			attributes: {},
			location: 'Коледино WB',
			supplier: {
				title: 'OOO Вайлдберриз',
				PSRNSP: '1067746062449',
				address: '142181, Московская область, Г.О. ПОДОЛЬСК, Д КОЛЕДИНО, ТЕР. ИНДУСТРИАЛЬНЫЙ ПАРК КОЛЕДИНО, Д. 6, СТР. 1',
			},
			shippingSchedule: [
				{
					date: '5—6 февраля',
					maxQuantity: 4
				}
			],
			stock: 4,
			count: 2,
			isSelected: true,
			isFavorite: false,
			imageSource: '../../assets/images/product-image-3.png',
		},
	],
	selectedIds: [1, 2, 3],
	delivery: {
		id: 'pickup-1',
		type: 'pickup',
		address: 'Бишкек, улица Ахматбека Суюмбаева, 12/1',
		rating: 4.99,
		workingHours: 'Ежедневно с 10 до 21',
	},
	payment: {
		id: 'card-1',
		cardNumber: '1234 56•• •••• 1234',
		cardExpiry: '01/30',
		imageSource: './assets/icons/mir.svg',
	}
};
