let x = '';
let y = '';
let operator = '';
const screen = document.querySelector(".screen");

document.querySelector('.calculator').addEventListener("click", function (event) {
    if (event.target.type)
        buttonClick(event.target.innerHTML);
});

function reset(clear) {
    x = '0';
    y = '0';
    operator = '';
    (clear) ? screen.innerHTML = '0' : x = screen.innerHTML;
};

function removeOperator(value) {
    screen.innerHTML = screen.innerHTML.slice(0, -1);
    operator = value;
    setOperator(value);
};

function removeNumber(value) {
    screen.innerHTML = screen.innerHTML.slice(0, -1);
    (operator === '') ? x = x.slice(0, -1) : y = y.slice(0, -1);
    if (screen.innerHTML === '') reset(true);
    if (isNaN(value)) operator = '';
};

function setOperator(value) {
    switch (value) {
        case '-':
            operator = '-';
            break;
        case '÷':
            operator = '÷';
            break;
        case '×':
            operator = '×';
            break;
        default:
            operator = '+'
    }
    screen.innerHTML += value;
};

function checkOperator(value) {
    const last = screen.innerHTML[screen.innerHTML.length - 1];
    if (operator != '') {
        if (value !== last && isNaN(last))
            removeOperator(value);
        else if (value === last && isNaN(last))
            removeOperator(value);
    }
    else setOperator(value);
};

function makeOperation(value) {
    switch (operator) {
        case '-':
            screen.innerHTML = parseInt(x) - parseInt(y);
            break;
        case '÷':
            screen.innerHTML = parseInt(x) / parseInt(y);
            break;
        case '×':
            screen.innerHTML = parseInt(x) * parseInt(y);
            break;
        default:
            screen.innerHTML = parseInt(x) + parseInt(y);
    }
    reset(false);
};

function setNumber(value) {
    (screen.innerHTML === '0') ? screen.innerHTML = value : screen.innerHTML = screen.innerHTML += value;
    (operator === '') ? x += value : y += value;
};

function setNaN(value, last) {
    switch (last) {
        case '=':
            makeOperation(value);
            break;
        case 'C':
            reset(true);
            break;
        case '←':
            removeNumber(value);
            break;
        default:
            checkOperator(value);
    }
};

function buttonClick(value) {
    if ((isNaN(parseInt(value[value.length - 1]) && operator === '')))
        setNaN(value, value[value.length - 1]);
    else
        setNumber(value);
};