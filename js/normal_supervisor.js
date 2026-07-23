// ====== normal_supervisor.js =======
// ====== логика переключения между режимами normal и supervisor ========

// let currentMode = 'normal';
window.pendingModeSwitch = null;

//Функция для получения текущего режима переключателя
function getCurrentMode() {
    const checkbox = document.getElementById('modeCheckbox');
    console.log('Current Mode:', getCurrentMode);
    return checkbox && checkbox.checked ? 'supervisor' : 'normal';
    
}

// Показывает клиентский экран (welcome или outOfService) в зависимости от состояния дня
function showClientScreen() {
    // Проверяем положение переключателя
    if (getCurrentMode() === 'supervisor') {
        console.log('Переключатель в режиме supervisor. Остаёмся в режиме оператора');
        return;
    }

    // Переключатель в normal
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    const isDayOpen = (typeof isDayOpened === 'function') ? isDayOpened() : false;

    if (isDayOpen) {
        if (welcomeScreen) welcomeScreen.style.display = 'block';
        if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';
        // if (typeof startCarousel === 'function') startCarousel(); 
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
    // showClientScreen();

    //Показываем outOfServiceScreen
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');

    if (outOfServiceScreen) {
        outOfServiceScreen.style.display = 'block';
    }
    if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    // Очищаем предыдущий таймер
    if (window.outOfServiceScreenTimer) {
        clearTimeout(window.outOfServiceScreenTimer);
        window.outOfServiceScreenTimer = null;
    }

    // Запускае новый таймер на 5 секунд
    // if (window.outOfServiceScreenTimer) {
    //     clearTimeout(window.outOfServiceScreenTimer);
    // }

    window.outOfServiceScreenTimer = setTimeout(() => {
        // Проверяем положение переключателя
        if (getCurrentMode() === 'supervisor') {
            console.log('Таймер: переключатель в supervisor, welcomeScreen не показываем');
            window.outOfServiceScreenTimer = null;
            return;
        }
        // Проверяем, что день открыт и что режим не изменился
        const isDayOpen = (typeof isDayOpened === 'function') ? isDayOpened() : false;

        if (isDayOpen) {
            const outOfServiceScreen = document.getElementById('outOfServiceScreen');
            const welcomeScreen = document.getElementById('welcomeScreen');

            if (welcomeScreen) {
                welcomeScreen.style.display = 'block';
            }
            if (outOfServiceScreen) {
                outOfServiceScreen.style.display = 'none';
            }

            if (typeof startCarousel === 'function') startCarousel();
        }
        window.outOfServiceScreenTimer = null;
    }, 5000);
}

//Настройка обработчиков ввода. Вызывается при открытии экрана авторизации
function setupAuthInput() {
    console.log('setupAuthInput запущена')
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.querySelector('#authScreen .enter-btn');
    // const submitBtn = document.querySelector('#authScreen .auth-submit-btn');

    if (!loginInput || !passwordInput) return;

    // Удаляем старые обработчики, чтобы не дублировать. 
    loginInput.removeEventListener('keypress', onLoginKeyPress);
    passwordInput.removeEventListener('keypress', onPasswordKeyPress);
    if (submitBtn) {
        submitBtn.removeEventListener('click', onAuthSubmitClick);
    }

    // Добавляем новые обработчики
    loginInput.addEventListener('keypress', onLoginKeyPress);
    passwordInput.addEventListener('keypress', onPasswordKeyPress);

    // Обработчик для кнопки Ввод - переключает фокус или отправляет форму
    if (submitBtn) {
        submitBtn.addEventListener('click', onAuthSubmitClick);
    }
}



// Обработчик для поля "Код пользователя"
function onLoginKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
        if (isTrainingMode) {
            completeTrainingStep('loginInput');
        }

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

        //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
        if (isTrainingMode) {
            completeTrainingStep('passwordInput');
        }
        // Вызываем проверку авторизации
        submitAuth();
    }
}

// Обработчик для кнопки Ввод
function onAuthSubmitClick(event) {
    event.preventDefault();

    // Определяем, какое поле сейчас в фокусе
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const activeElement = document.activeElement;

    if (activeElement === loginInput) {
        //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
        if (isTrainingMode) {
            completeTrainingStep('loginInput');
        }

        // Если фокус на поле Код пользователя, переключаемся на поле Пароль
        if (passwordInput) {
            passwordInput.focus();
        }
    }else if (activeElement === passwordInput) {
        submitAuth();
    }else {
        if (loginInput.value && !passwordInput.value) {
            //Логин есть, пароля нет - переключаемся на пароль
            passwordInput.focus();
        }else if (loginInput.value && passwordInput.value) {
            submitAuth();
        } else {
            loginInput.focus();
        }
    }
}

// Отправка формы авторизации
function submitAuth() {
    const login = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;
    if (login === '100' && password === '111111') {
        //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
        if (isTrainingMode) {
            completeTrainingStep('authSuccess');
        }
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
        // currentMode = 'supervisor';
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
    // ====== Проверка режима обучения ======
    if (isTrainingMode) {
        completeTrainingStep('switchToSupervisor');
    }

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
        // currentMode = 'normal';
        window.pendingModeSwitch = null;
        console.log('currentMode установлен в Normal, экран не изменён');
}


// Выход из режима Supervisor (например, по кнопке в меню оператора)
function exitSupervisorMode() {
    console.log('Функция exitSupervisorMode');
    // currentMode = 'normal';
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
    // checkbox.checked = (currentMode === 'supervisor');
    checkbox.checked = false;
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

// Экран 4-5-6
let diagnosticKeySequence = [];
const DIAGNOSTIC_CODE = ['4', '5', '6'];
let diagnosticTimer = null;

function checkDiagnosticSequence(key) {
    console.log('Проверка клавиш:', key);
    diagnosticKeySequence.push(key);

    if (diagnosticKeySequence.length > 3) {
        diagnosticKeySequence.shift();
    }

    if (diagnosticKeySequence.length === 3) {
        if (diagnosticKeySequence.join('') === DIAGNOSTIC_CODE.join('')) {
            diagnosticKeySequence = [];
            openDiagnostics();
            return true;
        }
    }
    return false;
}

function openDiagnostics() {
    // Проверяем переключатель
    if (getCurrentMode() === 'supervisor') {
        console.log('Режим диагностики доступен в режиме "Normal"');
        return;
    }
    
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    const diagnosticScreen = document.getElementById('diagnosticScreen');

    console.log('welcomeScreen:', welcomeScreen);           
    console.log('outOfServiceScreen:', outOfServiceScreen); 
    console.log('diagnosticScreen:', diagnosticScreen);     

    if (!diagnosticScreen) {
        console.log ('Экран диагностики не найден');
        return;
    }


    // Проверяем видимость экранов
    const welcomeDisplay = welcomeScreen ? window.getComputedStyle(welcomeScreen).display: 'none';
    const outOfServiceDisplay = outOfServiceScreen ? window.getComputedStyle(outOfServiceScreen).display: 'none';


    console.log('welcomeDisplay:', welcomeDisplay);       
    console.log('outOfServiceDisplay:', outOfServiceDisplay);


    const welcomeVisible = welcomeDisplay !== 'none';
    const outOfServiceVisible = outOfServiceDisplay !== 'none';

    console.log('welcomeVisible:', welcomeVisible);         
    console.log('outOfServiceVisible:', outOfServiceVisible);


    if (!welcomeVisible && !outOfServiceVisible) {
        console.log('Диагностика доступна только на главном экране');
        return;
    }



    // Сохраняем текущий экран
    let previousScreen = null;
    if (welcomeVisible) {
        previousScreen = 'welcome';
    }else if (outOfServiceVisible) {
        previousScreen = 'outOfService';
    }
    
    // Скрываем текущий экран
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';

    // Показываем экран диагностики
    diagnosticScreen.style.display = 'block';
    console.log('Экран диагностики показан на 5 секунд');

    //Запускаем таймер
    if (diagnosticTimer) {
        clearTimeout(diagnosticTimer);
    }

    diagnosticTimer = setTimeout(() => {
        if (diagnosticScreen) {
            diagnosticScreen.style.display = 'none';
        }
        if (previousScreen === 'welcome' && welcomeScreen) {
            welcomeScreen.style.display = 'block';
            if (typeof startCarousel === 'function') startCarousel(); 
        }else if (previousScreen === 'outOfService' && outOfServiceScreen) {
            outOfServiceScreen.style.display = 'block';
        }
        diagnosticTimer = null;
        console.log('Диагностика закрыта');
    }, 5000);

}

// Обработчик клавиш
document.addEventListener('keydown', function(event) {
    // Игнорируем, есил фокус в поле ввода
    if (event.target.tagName === 'INPUT') return;

    //Проверяем введённые цифры
    if (event.key >= '0' && event.key <= '9') {
        checkDiagnosticSequence(event.key);
    }
});

console.log('Диагностика запущена');