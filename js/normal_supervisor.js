// ====== normal_supervisor.js =======
// ====== логика переключения между режимами normal и supervisor ========

let currentMode = 'normal';
window.pendingModeSwitch = null;


// Показывает клиентский экран (welcome или outOfService) в зависимости от состояния дня
function showClientScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    const isDayOpen = (typeof isDayOpened === 'function') ? isDayOpened() : false;
    if (isDayOpen) {
        if (welcomeScreen) welcomeScreen.style.display = 'block';
        if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';
    } else {
        if (welcomeScreen) welcomeScreen.style.display = 'none';
        if (outOfServiceScreen) outOfServiceScreen.style.display = 'block';
    }
}

// Функция для экрана авторизации – очистка полей
function resetAuth() {
    document.getElementById('loginInput').value = '';
    document.getElementById('passwordInput').value = '';
}

// Отмена авторизации – зависит от положения переключателя
function cancelAuth() {
    const checkbox = document.getElementById('modeCheckbox');
    const isSupervisorMode = checkbox && checkbox.checked;
    if (isSupervisorMode) {
        alert('Переведите ключ оператора в рабочее положение');
        return; // не закрываем authScreen
    }
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.style.display = 'none';
    window.pendingModeSwitch = null;
    showClientScreen();
}

//Настройка обработчиков ввода. Вызывается при открытии экрана авторизации
function setupAuthInput() {
    console.log('setupAuthInput запущена')
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');

    if (!loginInput || !passwordInput) return;

    // Удаляем старые обработчики, чтобы не дублировать. 
    loginInput.removeEventListener('keypress', onLoginKeyPress);
    passwordInput.removeEventListener('keypress', onPasswordKeyPress);

    // Добавляем новые обработчики
    loginInput.addEventListener('keypress', onLoginKeyPress);
    passwordInput.addEventListener('keypress', onPasswordKeyPress);
}

// Обработчик для поля "Код пользователя"
function onLoginKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.focus();
        }
    }
}

// Обработчик для поля "Пароль"
function onPasswordKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        // Вызываем проверку авторизации
        submitAuth();
    }
}

// Отправка формы авторизации
function submitAuth() {
    const login = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;
    if (login === '100' && password === '111111') {
        onAuthSuccess();
        resetAuth();
    } else {
        alert('Неверный код пользователя или пароль');
        resetAuth();
        // Не сбрасываем чекбокс, не меняем режим – остаёмся на authScreen, фокус на поле Код пользователя
        const loginInput = document.getElementById('loginInput');
        if (loginInput) loginInput.focus();
    }
}

// Успешная авторизация – переключаем в режим Supervisor
function onAuthSuccess() {
    if (window.pendingModeSwitch === 'supervisor') {
        currentMode = 'supervisor';
        const checkbox = document.getElementById('modeCheckbox');
        if (checkbox && !checkbox.checked) checkbox.checked = true;
        const authScreen = document.getElementById('authScreen');
        const supervisorScreen = document.getElementById('supervisorScreen');
        if (authScreen) authScreen.style.display = 'none';
        if (supervisorScreen) supervisorScreen.style.display = 'block';
        window.pendingModeSwitch = null;
    }
}

// Запрос переключения в Supervisor (слайдер вверх)
function requestSupervisorMode() {
    const authScreen = document.getElementById('authScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';
    if (authScreen) authScreen.style.display = 'block';
    setupAuthInput();
    // Ставим фокус на поле "Код пользователя"
    setTimeout(() => {
        const loginInput = document.getElementById('loginInput');
        if (loginInput) loginInput.focus();
    }, 100);
    window.pendingModeSwitch = 'supervisor';
    resetAuth();
}

// Переключение в Normal (слайдер вниз)
// Просто переключаем клавишу (переключаем режим), но без переключения экранов. 
function switchToNormalMode() {
        currentMode = 'normal';
        window.pendingModeSwitch = null;
        console.log('currentMode установлен в Normal, экран не изменён');
}
// function switchToNormalMode() {
//     if (currentMode === 'supervisor') {
//         exitSupervisorMode();
//     } else {
//         showClientScreen();
//     }
//     const checkbox = document.getElementById('modeCheckbox');
//     if (checkbox && checkbox.checked) checkbox.checked = false;
//     window.pendingModeSwitch = null;
// }

// Выход из режима Supervisor (например, по кнопке в меню оператора)
function exitSupervisorMode() {
    console.log('Функция exitSupervisorMode');
    currentMode = 'normal';
    // console.log('Текущий режим:' [currentMode]);
    const supervisorScreen = document.getElementById('supervisorScreen');
    const authScreen = document.getElementById('authScreen');
    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (authScreen) authScreen.style.display = 'none';
    showClientScreen();
    const checkbox = document.getElementById('modeCheckbox');
    if (checkbox && checkbox.checked) checkbox.checked = false;
}

// Инициализация переключателя режимов (вызывается после загрузки DOM)
function initModeSwitch() {
    const checkbox = document.getElementById('modeCheckbox');
    if (!checkbox) return;
    checkbox.checked = (currentMode === 'supervisor');
    checkbox.addEventListener('change', function(e) {
        if (this.checked) {
            requestSupervisorMode();
        } else {
            switchToNormalMode();
        }
    });
}

// Автоматический запуск инициализации после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initModeSwitch === 'function') initModeSwitch();
});