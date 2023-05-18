// Объявление переменных - Строковых констант
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const CHENGE_NEW_LIMIT_TEXT = 'Новый лимит';
const STORAGE_LABLE_LIMIT = 'limit';
const STORAGE_LABLE_EXPENSES = 'expenses';

//Объявление переменных - ссылок на HTML элементы
const inputNode = document.getElementById('expenseInput');
const categorySelectNode = document.getElementById('categorySelect');
const addButtonNode = document.getElementById('addButton');
const clearButtonNode = document.getElementById('clearButton');
const totalValueNode = document.getElementById('totalValue');
const statusNode = document.getElementById('statusText');
const historyList = document.getElementById('historyList');
const changeLimitBtn = document.getElementById('changeLimitBtn');

//Получает лимит из элемента HTML с id limitValue
const limitNode = document.getElementById('limitValue');
let limit = parseInt(limitNode.innerText);

function initLimit() {
    const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABLE_LIMIT));
    if (!limitFromStorage) {
        return;
    }
    limitNode.innerText = limitFromStorage;
    limit = parseInt(limitNode.innerText);
}

initLimit();

//Объявление основной переменной
//При запуске она содержит в себе пустой массив
//который мы пополняем по нажатию на кнопку Добавить
const expensesFromStorageString = localStorage.getItem(STORAGE_LABLE_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString);
let expenses = [];
if (Array.isArray(expensesFromStorage)) {
    expenses = expensesFromStorage;
}
render();

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

function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABLE_EXPENSES, expensesString);
}

//Функция-обработчик которая будет вызвана при нажатии на кнопку Добавить
function addButtonHandler() {
    //сохраняем в переменную currentAmount(текущая сумма) выбранную категорию
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
        alert('Задайте сумму!');
        return;
    }

    //сохраняем в переменную currentCategory(текущая категория) выбраную категорию
    const currentCategory = getSelectedCategory();
    if (currentCategory === 'Категория') {
        alert('Выберите категорию!');
        return;
    }

    //из полученых переменных собираем объект newExpense(новыйРасход)
    //который состоит из двух полей - amount, в которое записано значение currentAmount
    //и category, в которое записано значение currentCategory
    const newExpense = { amount: currentAmount, category: currentCategory };

    //добавляем наш новыйРасход в массив расходов
    expenses.push(newExpense);
    saveExpensesToStorage();

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

//функция-обработчик (хендлер) кнопки изменения лимита
function changeLimitHandler() {
    const newLimit = prompt(CHENGE_NEW_LIMIT_TEXT);
    const newLimitValue = parseInt(newLimit);

    if (!newLimitValue) {
        return;
    }

    limitNode.innerText = newLimitValue;
    limit = newLimitValue;
    localStorage.setItem(STORAGE_LABLE_LIMIT, newLimitValue);

    render();
}

//Привязка функций-обработчиков к кнопкам
addButtonNode.addEventListener('click', addButtonHandler);
clearButtonNode.addEventListener('click', clearButtonHandler);
changeLimitBtn.addEventListener('click', changeLimitHandler);