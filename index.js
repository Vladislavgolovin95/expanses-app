const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'всё хорошо';
const STATUS_OUT_OF_LIMIT = 'всё плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

const inputNode = document.getElementById('js-input-expense');
const buttonNode = document.getElementById('js-button-expense');
const historyNode = document.getElementById('js-history-expense');
const totalNode = document.getElementById('js-total-expense');
const limitNode = document.getElementById('js-limit-expense');
const statusNode = document.getElementById('js-status-expense');

const expenses = [];

buttonNode.addEventListener('click', function() {
    // 1. Получаем значение из поля ввода
    if (!inputNode.value) {
        return;
    }
    
    const expense = parseInt(inputNode.value);
    
    inputNode.value = '';

    // 2. Сохраняем трату в список 
    expenses.push(expense);

    // 3. Выводим новый список трат
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

    // 4. Посчитать сумму и вывести её
    let total = 0;

    expenses.forEach(element => {
        total += (element);
    });

    totalNode.innerText = total;

    // 5. Сравнение с лимитом и вывод статуса
    if (total <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
});
