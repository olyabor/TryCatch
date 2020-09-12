//Объявляем функцию filterByType, которая принимает в качестве аргументов тип данных и массив значений
// и возвращает все данные указанного типа
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// В вёрстке 3 элемента div с классом dialog__response-block для вывода результата: результат найден, результат не найден, произошла ошибка
// hideAllResponseBlocks получает (7) и прячет (8) все элементы div с классом dialog__response-block
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
// showResponseBlock показывает div с классом blockSelector
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks(); // убираем вывод результатов
    document.querySelector(blockSelector).style.display = 'block'; // отображаем div с классом blockSelector
    if (spanSelector) { // если у блока есть span с селектором spanSelector,
      document.querySelector(spanSelector).textContent = msgText; // выводим в него текст сообщения msgText
    }
  },
	// Вывод сообщения об ошибке, текст сообщения будет выведен в span с id="error"
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// Вывод результата, текст сообщения будет выведен в span с id="ok"
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// Вывод сообщения "Пока что нечего показать."
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// Фильтруем значения values по типу type
	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Попытка отфильтровать значения по типу данных
			const alertMsg = (valuesArray.length) ? // Если массив valuesArray непустой,
				`Данные с типом ${type}: ${valuesArray}` : // получим сообщение с отфильтрованными по типу данными
				`Отсутствуют данные типа ${type}`; // иначе получим сообщение, что нет данных указанного типа
			showResults(alertMsg); // Вывод сообщения
		} catch (e) { // произошла ошибка e при вызове filterByType
			showError(`Ошибка: ${e}`); // выводим ошибку в div с результатом
		}
	};

const filterButton = document.querySelector('#filter-btn'); // filterButton присвоили кнопку "Фильтровать"

filterButton.addEventListener('click', e => { // Обработчик события для кнопки
	const typeInput = document.querySelector('#type'); // выпадающий список с типом данных
	const dataInput = document.querySelector('#data'); // input, в который пользователь вводит данные

	if (dataInput.value === '') {// Если пользователь не ввел данные (получена пустая строка),
		dataInput.setCustomValidity('Поле не должно быть пустым!');// устанавливаем  специальное сообщение для элемента dataInput.
		showNoResults(); // Вывод сообщения "Пока что нечего показать."
	} else {
    // Иначе,
    dataInput.setCustomValidity(''); // убираем специальное сообщение для элемента dataInput.
		e.preventDefault(); //отменяем событие по умолчанию
		// Убираем лишние пробелы с начала и конца строк, введенных в typeInput и dataInput
    // Затем фильтруем значения values по типу type или выводим ошибку
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});

