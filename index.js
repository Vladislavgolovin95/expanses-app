// Объявление переменных - Строковых констант
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';

//Объявление переменных - ссылок на HTML элементы
const inputNode = document.getElementById('expenseInput');
const categorySelectNode = document.getElementById('categorySelect');
const addButtonNode = document.getElementById('addButton');
const clearButtonNode = document.getElementById('clearButton');
const totalValueNode = document.getElementById('totalValue');
const statusNode = document.getElementById('statusText');
const historyList = document.getElementById('historyList');

//Получает лимит из элемента HTML с id limitValue

const limitNode = document.getElementById('limitValue');
const limit = parseInt(limitNode.innerText);

//Объявление основной переменной
//При запуске она содержит в себе пустой массив
//который мы пополняем по нажатию на кнопку Добавить
let expenses = [];

//------------------ФУНКЦИИ----------------------

//Подсчитывает и возвращает сумму всех трат
function getTotal() {
    let sum = 0;
    expenses.forEach(function (expense) {
        //пробегаем по массиву объектов expense, берем из каждого поле amount
        //и прибавляем к переменной sum
        sum += expense.amount;
    });

    return sum;
}

//Отрисовывает/обновляет блок с 'Всего', 'Лимит' и 'Статус'
function renderStatus() {
    //создаём переменную total(всего) и записываем в неё результат  выполнения getTotal
    const total = getTotal(expenses);
    totalValueNode.innerText = total;

    //условие сравнение - что больше всего или лимит
    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = 'stats__statusText_positive';
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
        statusNode.className = 'stats__statusText_negative';
    }
} 

//Отрисовывает/обновляет блок
function renderHistory() {
    historyList.innerHTML = '';
    //цикл по массиву expenses, где каждый элемент - запись о рассходе (сумма и категория)
    expenses.forEach(function (expense) {
        //создание элемента li
        const historyItem = document.createElement('li');
        historyItem.className = 'rub';

        //шаблонная строка 'категория'-'сумма'
        historyItem.innerText = `${expense.category} - ${expense.amount}`;

        //берем наш li из памяти и вставляем в документ, в конец historyList
        historyList.appendChild(historyItem);
    });
}

//Отрисовывает/обновляет весь интерфейс (историю, всего, статус)
function render() {
    renderStatus();
    renderHistory();
}

//Возвращает введенную пользователем сумму
function getExpenseFromUser() {
    return parseInt(inputNode.value);
}

//Возвращает выбранную пользователем категорию
function getSelectedCategory() {
    return categorySelectNode.value;
}

//Функция очистки поля ввода суммы
// на вход получает переменную input, в которой мы ожидаем html элемент input
const clearInput = (input) => {
    input.value = '';
};

//Функция-обработчик которая будет вызвана при нажатии на кнопку Добавить
function addButtonHandler() {
    //сохраняем в переменную currentAmount(текущая сумма) выбранную категорию
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
        return;
    }

    //сохраняем в переменную currentCategory(текущая категория) выбраную категорию
    const currentCategory = getSelectedCategory();
    if (currentCategory === 'Категория') {
        return;
    }

    //из полученых переменных собираем объект newExpense(новыйРасход)
    //который состоит из двух полей - amount, в которое записано значение currentAmount
    //и category, в которое записано значение currentCategory
    const newExpense = { amount: currentAmount, category: currentCategory };

    //добавляем наш новыйРасход в массив расходов
    expenses.push(newExpense);

    //перерисовываем интерфейс
    render();

    //сбрасываем введенную сумму
    clearInput(inputNode);
}

//Функция-обработчик кнопки сбросить расходы
function clearButtonHandler() {
    expenses = [];
    render();
}

//Привязка функций-обработчиков к кнопкам
addButtonNode.addEventListener('click', addButtonHandler);
clearButtonNode.addEventListener('click', clearButtonHandler);