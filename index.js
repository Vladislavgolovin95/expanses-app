const expenses = [];

const inputNode = document.getElementById('js-input-expense');
const buttonNode = document.getElementById('js-button-expense');
const historyNode = document.getElementById('js-history-expense');
const totalNode = document.getElementById('js-total-expense');

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
        expensesListHTML += `<li>${element} руб.</li>`;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

    // 4. Посчитать сумму и вывести её
    let total = 0;

    expenses.forEach(element => {
        total += (element);
    });

    totalNode.innerText = total;
});
