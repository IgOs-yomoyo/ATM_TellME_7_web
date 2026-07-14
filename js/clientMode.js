// Файл clientMode.js - логика работы экрана приветствия и ввода ПИН-кода.
// Переменные
let pinCode = '';
let currentSlide = 0;
let slidesInterval = null;

// ========== КАРУСЕЛЬ НА ЭКРАНЕ ПРИВЕТСТВИЯ ==========

function startCarousel() {
    const slides = document.querySelectorAll('.carousel-img');
    if (slides.length === 0) return;
    
    // Показываем первый слайд
    slides[0].classList.add('active');
    
    // Запускаем таймер смены слайдов
    slidesInterval = setInterval(() => {
        // Убираем активный класс у текущего слайда
        slides[currentSlide].classList.remove('active');
        // Переходим к следующему
        currentSlide = (currentSlide + 1) % slides.length;
        // Добавляем активный класс новому слайду
        slides[currentSlide].classList.add('active');
    }, 5000); // меняем каждые 5 секунд
}

function stopCarousel(){
    if (slidesInterval) {
        clearInterval(slidesInterval);
        slidesInterval = null;
    }
}

//  Функции перехода между экранами
function showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) welcomeScreen.style.display = 'block';
    startCarousel();
}

function hideWelcomeScreen() {
    stopCarousel();
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    setUpPinInput();
}

function showPinScreen() {
    const pinScreen = document.getElementById('pinScreen');
    if (pinScreen) pinScreen.style.display = 'block';
    clearPin();
}


function hidePinScreen() {
    const pinScreen = document.getElementById('pinScreen');
    if (pinScreen) pinScreen.style.display = 'none';
}



// Функция имитации предъявления карты. 
function insertCard() {
    // ========= ДОБАВЛЯЕМ ПРОВЕРКУ ТРЕНАЖЁРА ==========
    if (isTrainingMode) {
        completeTrainingStep('insertCard');
    }
    console.log ('Карта вставлена');
    hideWelcomeScreen();
    showPinScreen();
}

function backToWelcome() {
    hidePinScreen();
    showWelcomeScreen();
    clearPin();
}

// ========== ЛОГИКА ЭКРАНА ВВОДА PIN-КОДА ==========

function updatePinDisplay() {
    const pinInput = document.getElementById('pinInput');
    if (pinInput) {
        pinInput.value = '*'.repeat(pinCode.length);
    }
}

function clearPin() {
    pinCode = '';
    updatePinDisplay();
}

function submitPin() {
    if (isTrainingMode) {
        completeTrainingStep('enterPin');
    }
    if (pinCode.length === 4) {
        console.log('PIN введён:', pinCode);
        
        // Здесь будет проверка PIN-кода (сравнение с базой данных)
        // Пока тестовый PIN 1234
        if (pinCode === '1478') {
            console.log('PIN верный');
            // Переход в главное меню
            hidePinScreen();
            const mainScreen = document.getElementById('mainScreen');
            if (mainScreen) mainScreen.style.display = 'block';
        } else {
            alert('Неверный PIN-код. Попробуйте ещё раз.');
            clearPin();
        }
    } else {
        alert('Введите 4 цифры PIN-кода');
    }
}

function setUpPinInput() {
    const pinInput = document.getElementById('pinInput');
    if (!pinInput) return;

    // Удаляем старый обработчик, если был
    pinInput.removeEventListener('keydown', pinInput._listener);
    
    const handler = function(e) {
        const key = e.key;
        if (/^[0-9]$/.test(key)) {
            if (pinCode.length < 4) {
                pinCode += key;
                updatePinDisplay();
                // Если после добавления длина стала 4, сразу проверяем
                // if (pinCode.length === 4) {
                //     submitPin();
                // }
            }
            e.preventDefault();
        } else if (key === 'Backspace') {
            pinCode = pinCode.slice(0, -1);
            updatePinDisplay();
            e.preventDefault();
        } else if (key === 'Enter') {
            submitPin();
            e.preventDefault();
        }
    };
    
    pinInput.addEventListener('keydown', handler);
    pinInput._listener = handler;
    
    // Фокус на поле ввода
    pinInput.focus();
}

// Запускаем карусель при загрузке страницы, если виден экран приветствия
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen && getComputedStyle(welcomeScreen).display !== 'none') {
        startCarousel();
    }
    // Инициализация переключателя режимов (Normal/Supervisor)
    if (typeof initModeSwitch === 'function') {
        initModeSwitch();
    }
});



