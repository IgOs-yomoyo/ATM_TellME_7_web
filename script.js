<<<<<<< HEAD
function exitApp() {
    let answer = confirm("Вы уверены, что хотите выйти?");
    if (answer == true) {
        window.close();
    } 
}

// Функция инициализации кассет
function initCassettes() {
    // console.log("Инициализация кассет");
    alert("Инициализация кассет");
    
}

// Функция инкассация ресайклера
function recyclCollection() {
    // console.log("Инкассация ресайклера");
    // let answer = confirm("Вы уверены, что хотите выполнить инкассацию ресайклера?");
    // if (answer == true) {
    alert("Инкассация ресайклера выполнена успешно!");
    }
}

// Функция меню оператора
function gotoSupervisor() {
    // console.log("Меню оператора");
    // alert("Меню оператора ещё не сформировано");
    window.location.href="supervisor.html";
}
=======
// Данные кассет
let currentCassette = 1;
const cassettes = [
    { number: 1, nominal: 100, amount: 0 },
    { number: 2, nominal: 500, amount: 0 },
    { number: 3, nominal: 1000, amount: 0 },
    { number: 4, nominal: 5000, amount: 0 }
];

function showMessage(message, isError = false) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    
    if (isError) {
        modalMessage.style.color = '#f44336';
    } else {
        modalMessage.style.color = '#2c3e50';
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function showMainMenu() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('mainScreen').classList.add('active');
}

function showSupervisorMenu() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('supervisorScreen').classList.add('active');
}

function showReplenishScreen(cassetteNumber = 1) {
    currentCassette = cassetteNumber;
    const cassette = cassettes[currentCassette - 1];
    
    document.getElementById('cassetteNumber').textContent = 
        cassette.number.toString().padStart(3, '0');
    document.getElementById('nominal').textContent = 
        cassette.nominal + ' руб.';
    document.getElementById('amount').value = '';
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('replenishScreen').classList.add('active');
}

function initCassettes() {
    showMessage('Инициализация кассет выполнена успешно!');
    console.log('Инициализация кассет');
}

function recyclCollection() {
    if (confirm('Вы уверены, что хотите выполнить инкассацию ресайклера?')) {
        showMessage('Инкассация ресайклера выполнена успешно!');
        console.log('Инкассация ресайклера');
    }
}

function openCloseDay() {
    showReplenishScreen(1);
}

function submitReplenish() {
    const amountInput = document.getElementById('amount');
    let amount = parseInt(amountInput.value);
    
    if (isNaN(amount)) {
        amount = 0;
    }
    
    if (amount > 2000) {
        showMessage('Ошибка! Введённое число превышает 2000 банкнот.', true);
        amountInput.value = '';
        return;
    }
    
    const cassette = cassettes[currentCassette - 1];
    const savedAmount = amount * cassette.nominal;
    cassette.amount = savedAmount;
    
    showMessage(
        `Кассета ${cassette.number.toString().padStart(3, '0')} успешно пополнена!\n` +
        `Загружено: ${amount} банкнот\n` +
        `Сумма: ${savedAmount} руб.`
    );
    
    console.log(`Кассета ${cassette.number}: ${amount} банкнот, сумма: ${savedAmount} руб.`);
    
    if (currentCassette < 4) {
        showReplenishScreen(currentCassette + 1);
    } else {
        showMessage('Все кассеты успешно пополнены!\nОперационный день открыт.');
        showMainMenu();
    }
}

function resetAmount() {
    document.getElementById('amount').value = '';
    document.getElementById('amount').focus();
}

function cancelReplenish() {
    showSupervisorMenu();
}

function exitApp() {
    if (confirm('Вы уверены, что хотите выйти из приложения?')) {
        showMessage('До свидания!');
        setTimeout(() => {
            window.close();
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('TellME 7 ATM Simulator загружен');
    showMainMenu();
});
>>>>>>> 37a450918377232e74573d35e76eab262c07a947
