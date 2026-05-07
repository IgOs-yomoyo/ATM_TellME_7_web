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

function hideWelcomScreen() {
    const pinScreen = document.getElementById('pinScreen');
    if (pinScreen) pinScreen.style.display = 'block';
    clearPin();
}

function hidePinScreen() {
    const pinScreen = document.getElementById('pinScreen');
    if (pinScreen) pinScreen.style.display = 'none';
}



// Функция имитации предъявления карты. 
function insertcard() {
    console.log ('Карта вставлена');
    hidePinScreen();
    showPinScreen();
}

function backToWellcome() {
    hidePinScreen();
    showWelcomeScreen();
    clearPin();
}

// ========== ЛОГИКА PIN-КОДА ==========
function pinKeyPress(number) {
    if (pinCode.length < 4) {
        pinCode += number.toString();
        updatePinDisplay();
    }
}

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
    if (pinCode.length === 4) {
        console.log('PIN введён:', pinCode);
        
        // Здесь будет проверка PIN-кода (сравнение с базой данных)
        // Пока тестовый PIN 1234
        if (pinCode === '1234') {
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

// Запускаем карусель при загрузке страницы, если виден экран приветствия
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen && getComputedStyle(welcomeScreen).display !== 'none') {
        startCarousel();
    }
});

// //     // Показываем анимацию
// //     const welcomeScreen = document.getElementById('welcomeScreen');
// //     const cardAnimaton = document.getElementById('.card-animation');

// //     if (cardAnimaton) {
// //         cardAnimaton.style.animation = 'cardInsert 0.5s ease-in-out';
// //     }
// // }

// // Переход на экран ввода PIN-кода
// function showPinScreen() {
//     // Скрываем экран приветствия
//     const welcomeScreen = document.getElementById('welcomeScreen');
//     if (welcomeScreen) welcomeScreen.style.display = 'none';
    
//     // Показываем экран ввода PIN-кода
//     const pinScreen = document.getElementById('pinScreen');
//     if (pinScreen) pinScreen.style.display = 'block';
// }

// // ЭКРАН ВВОДА ПИН-КОДА
// let pinCode = '';

// function pinKeyPress(number) {
//     if (pinCode.length < 4) {
//         pinCode += number.toString();
//         updatePinDisplay();
//     }
// }

// function updatePinDisplay() {
//     const pinInput = document.getElementById('pinInput');
//     if (pinInput) {
//         pinInput.value = '*'.repeat(pinCode.length);
//     }
// }

// function clearPin() {
//     pinCode = '';
//     updatePinDisplay();
// }

// function submitPin() {
//     if (pinCode.length === 4) {
//         console.log('PIN введён:', pinCode);
        
//         // Проверка PIN-кода (пока тестовый)
//         if (pinCode === '1234') {
//             console.log('PIN верный');
//             // Переход в главное меню
//             const pinScreen = document.getElementById('pinScreen');
//             if (pinScreen) pinScreen.style.display = 'none';
            
//             const mainScreen = document.getElementById('mainScreen');
//             if (mainScreen) mainScreen.style.display = 'block';
//         } else {
//             alert('Неверный PIN-код. Попробуйте ещё раз.');
//             clearPin();
//         }
//     } else {
//         alert('Введите 4 цифры PIN-кода');
//     }
// }

// function backToWelcome() {
//     const pinScreen = document.getElementById('pinScreen');
//     if (pinScreen) pinScreen.style.display = 'none';
    
//     const welcomeScreen = document.getElementById('welcomeScreen');
//     if (welcomeScreen) welcomeScreen.style.display = 'block';
    
//     clearPin();
// }