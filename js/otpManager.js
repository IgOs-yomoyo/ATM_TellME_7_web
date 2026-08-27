//=== OTP МЕНЕДЖЕР ===

let otpCode = null;
let otpTimer = null;
let otpTimeLeft = 30;
let logoClickCount = 0;
let logoClickTimer = null;

// Генерация OTP кода (6 цифр)
function generateOTP() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Сгенерирован OTP коде:', code);
    return code;
}

// Запуск OTP таймера
function startOTPTimer() {
    otpTimerLeft = 30;
    // updateTimerDisplay();

    if (otpTimer) clearInterval(otpTimer);

    otpTimer = setInterval(() => {
        otpTimeLeft--;
        console.log('⏱ Осталось секунд:', otpTimeLeft);
        // updateTimerDisplay();

        if (otpTimerLeft <= 0) {
            clearInterval(otpTimeLeft);
            otpTimer = null;
            //Генерируем новый код
            otpCode = generateOTP();
            const codeDisplay = document.getElementById('otpCodeValue');
            if (codeDisplay) {
                codeDisplay.textContent = otpCode;
                console.log('🔄 Новый OTP код сгенерирован:', otpCode);
            }
            otpTimeLeft = 30;
            // updateTimerDisplay();
            startOTPTimer();
        }
    }, 1000);
}

// Обновление отображения таймера
// function updateTimerDisplay() {
//     const timerEl = document.getElementById('otpTimer');
//     if (!timerEl) return;
    
//     const minutes = Math.floor(otpTimeLeft / 60);
//     const seconds = otpTimeLeft % 60;
//     timerEl.textContent = `⏱ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    
//     timerEl.classList.remove('warning', 'danger');
//     if (otpTimeLeft < 60) {
//         timerEl.classList.add('danger');
//     } else if (otpTimeLeft < 120) {
//         timerEl.classList.add('warning');
//     }
// }

// Обработчик кликов по логотипу
function handleLogoClick() {
    console.log('Логотип нажат, счетчик:', logoClickCount + 1);
    
    logoClickCount++;
    
    // Сбрасываем таймер, если прошло больше 3 секунд
    clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(() => {
        logoClickCount = 0;
        console.log('🔄 Счетчик кликов сброшен');
    }, 3000);
    
    if (logoClickCount >= 5) {
        logoClickCount = 0;
        clearTimeout(logoClickTimer);

        //Завершаем шаг в режиме обучения
        if (typeof isTrainingMode !== 'undefined' && isTrainingMode){
            console.log('Шаг 1 завершён');
            completeTrainingStep('logoClick');
        }
        showOTPScreen();
    }
}

// Показ экрана ввода OTP
function showOTPScreen() {
    console.log('🔐 Показ экрана ввода OTP');
    
    // Скрываем все экраны
    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    // Показываем экран OTP
    const otpScreen = document.getElementById('inputOTPCodeScreen');
    if (otpScreen) {
        otpScreen.style.display = 'block';
    }
    
    // Генерируем и показываем OTP код
    otpCode = generateOTP();
    const codeDisplay = document.getElementById('otpCodeValue');
    if (codeDisplay) {
        codeDisplay.textContent = otpCode;
    }
    
    //Очищаем поле ввода
    const input = document.getElementById('otpInput');
    if (input) {
        input.value = '';
        input.focus();
    }

    // Запускаем таймер
    startOTPTimer();
}

// Отправка OTP кода
function submitOTP() {
    const input = document.getElementById('otpInput');
    const enteredCode = input.value.trim();
    
    if (!enteredCode) {
        alert('Введите OTP код');
        input.focus();
        return;
    }
    
    if (enteredCode.length !== 6 || !/^\d{6}$/.test(enteredCode)) {
        alert('Введите 6-значный цифровой код');
        input.value = '';
        input.focus();
        return;
    }
    
    if (enteredCode === otpCode) {
        console.log('✅ OTP код верный!');
        // Останавливаем таймер
        if (otpTimer) {
            clearInterval(otpTimer);
            otpTimer = null;
        }
        // Переходим в меню инкассации
        showMainScreen();

        //Завершение шага в режиме обучения
    if (typeof isTrainingMode !== 'undefined' && isTrainingMode){
            console.log('Шаг 2 завершён');
            completeTrainingStep('enterOTP');
        }

    } else {
        console.log('❌ Неверный OTP код. Введено:', enteredCode, 'Ожидалось:', otpCode);
        alert('Неверный OTP код. Попробуйте снова.');

        //Сбрасываем поле и фокус
        input.value = '';
        input.focus();
    }

    
}

// Обработчик кнопки Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('otpInput');
    if (input) {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitOTP();
            }
        });
        //Ограничиваем ввод только цифрами
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 6);
        });
    }
});

function initMainMenu() {
    console.log('initMainMenu вызвана');

    //Сбрасываем состояние кнопок
    isBalanceButtonUsed = false;
    isCollectionButtonUsed = false;
    isCollectionMode = false;

    //Кнопка ПОЛУЧИТЬ БАЛАНС активна
    const balanceBtn = document.getElementById('balanceBtn');
    if (balanceBtn) {
        balanceBtn.classList.remove('btn-disabled');
        balanceBtn.disabled = false;
        console.log('Кнопка Получить баланс активна');
    }

    //Кнопка ПРОВЕСТИ ИНКАССАЦИЮ неактивна
    const collectBtn = document.getElementById('collectBtn');
    if (collectBtn)  {
        collectBtn.classList.add('btn-disabled');
        collectBtn.disabled = true;
        console.log('Кнопка Провести инкассацию активна');
    }
}

// Показ главного экрана (меню инкассации)
function showMainScreen() {
    console.log('📋 Показ главного экрана');
    
    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) {
        mainScreen.style.display = 'block';
        // Инициализируем кнопки
        if (typeof initMainMenu === 'function') {
            initMainMenu();
            console.log('Функция initMainMenu вызвана');
        }
    }
}