// Общие функции для переключения экранов
// let currentMode = 'normal'; 

let currentScale = 0.3225; //глобальная переменная для сохранения масштаба контейнера


// Универсальная заставка для экрана тестирования BRM
function showTestingScreen (duration = 8000, callback = null) {
    console.log('showTestingScreen вызвана, duration:', duration);
    const testingScreen = document.getElementById('testingScreen');
    if (!testingScreen) {
        console.error('Экран тестирования не найден');
        if (callback) callback();
        return;
    }
    // Показываем заставку
    testingScreen.style.display = 'flex'; 
    console.log('testingScreen display установлен в flex');
    console.log('Тестирование модуля рециркуляции...(${duration/1000}сек)');

    // Проверяем, виден ли экран
    setTimeout(() => {
        console.log('Проверка видимости:', window.getComputedStyle(testingScreen).display);
    }, 100);

    // Воспроизводим звук
    playTestingSound();

    // Запускаем таймер
    setTimeout (() => {
        testingScreen.style.display = 'none';
        console.log('Тестирование завершено');

        // Выполняем действие, если передано
        if (callback && typeof callback == 'function') {
            callback();
        }

        if (typeof updateDiagnosticButtonsVisibility === 'function') {
            setTimeout(updateDiagnosticButtonsVisibility, 50);
        }
    }, duration);

}

// Имитация звука
function playTestingSound() {
    try {
        const audio = new Audio('audio/testing_sound.mp3');
        audio.loop = true;
        audio.volume = 0.5;

        window.testingAudio = audio;

        audio.play().catch(function(error) {
            console.log('Не удалось воспроизвести звук:', error);
        });

        // Останавливаем звук по таймауту
        setTimeout(function() {
            if (window.testingAudio) {
                window.testingAudio.pause();
                window.testingAudio.currentTime = 0;
                window.testingAudio = null;
            }
        }, 8000);
    } catch (e) {
        console.log('Ошибка воспроизведения звука:', e);
    }
}

// Функция кнопки "В режим обслуживания клиентов". Новая. 
function backToWelcomeScreen() {
    console.log('Функция backToWelcomeScreen вызвана');

    // ======== НОВАЯ ПРОВЕРКА =======
    // Показываем предупреждение, если supervisor
    if (getCurrentMode() === 'supervisor') {
        alert('Переведите ключ оператора в рабочее положение');
        return;
    }

    // Определяем, какой экран показывать в зависимости от состояния флага
    let isDayOpen = false;
    if (typeof isDayOpened === 'function') {
        isDayOpen = isDayOpened();
        console.log('Статус операционного дня (isDayOpened):', isDayOpen);
    }else{
        console.warn('isDayOpened не найдена');
    }
    
    // Получаем нужные экраны
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    const supervisorScreen = document.getElementById('supervisorScreen');
    const opencloseday = document.getElementById('opencloseday');
    const recyclerday = document.getElementById('recyclerday');

    // Скрываем все экраны, кроме одного из двух
    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (opencloseday) opencloseday.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'none';

    if (isDayOpen) {
        //Если день открыт - тестирование и welcomeScreen
        showTestingScreen(8000, function() {
            if (welcomeScreen) {
                welcomeScreen.style.display = 'block';
                console.log('welcomeScreen показан (день открыт)');
            }
            if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';
            if (typeof startCarousel === 'function') startCarousel();

            if (typeof updateDiagnosticButtonsVisibility === 'function') {
                updateDiagnosticButtonsVisibility();
            }
        });
    } else {
            //День закрыт - outOfService
            if (outOfServiceScreen) {
                outOfServiceScreen.style.display = 'block';
                console.log('outOfServiceScreen показан, день закрыт');
            }
            if (welcomeScreen) {
                 welcomeScreen.style.display = 'none';
                // console.log('welcomeScreen не найден');
            }
        }

    //Завершаем шаг в обучении
    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('backToNormalMode');
    }

    if (typeof updateDiagnosticButtonsVisibility === 'function') {
        setTimeout(updateDiagnosticButtonsVisibility, 200);
    }
}

// Функция для кнопки "В режим банкомат не обслуживает"
function toOutOfService() {
    //Проверяем положение переключателя
    
    if (getCurrentMode() === 'supervisor') {
        alert('Переведите ключ оператора в рабочее положение');
        return;
    }
    // Получаем экраны
    const supervisorScreen = document.getElementById('supervisorScreen');
    const openCloseDay = document.getElementById('openCloseDay');
    const recyclerday = document.getElementById('recyclerday');
    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (openCloseDay) openCloseDay.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'none';
    

    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    if (outOfServiceScreen) outOfServiceScreen.style.display = 'block';

}

// const checkbox = document.getElementById('modeCheckbox');
    // const isSupervisorMode = checkbox && checkbox.checked;
    
    // if (isSupervisorMode) {
    //     alert('Переведите ключ оператора в рабочее положение');
    //     return;
    // }

//Функция перехода из меню "Сервисная карта" - mainScreen к главному экрану меню оператора (supervisor).
function showSupervisorMenu() {
    console.log('showSupervisorMenu вызвана')
    const mainScreen = document.getElementById('mainScreen');
    const supervisorScreen = document.getElementById('supervisorScreen');
    
    if (mainScreen) mainScreen.style.display = 'none';
    if (supervisorScreen) supervisorScreen.style.display = 'block';
}

//Функция возврата к предыдущему экрану меню supervisor. От opencloseday в supervisorscreen, от recyclerday в opencloseday и так далее. 
//Не стал её писать здесь. Попробуем сделать на каждом экране отдельно. 

function exitApp() {
    let answer = confirm("Вы уверены, что хотите выйти?");
    if (answer == true) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #1a1a2e; font-family: Arial;">
                <div style="text-align: center; color: white;">
                    <h1>🔌 Банкомат TellME 7 выключен</h1>
                    <p>Спасибо за использование</p>
                    <button onclick="location.reload()" style="margin-top: 30px; padding: 12px 24px; font-size: 16px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 8px;">
                        Включить банкомат
                    </button>
                </div>
            </div>
        `;
    }
}

function showopenclosedaymenu(){

    //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
    if (isTrainingMode) {
        completeTrainingStep('openCloseDay');
    }

    const supervisorScreen = document.getElementById('supervisorScreen')
    const opencloseday = document.getElementById('opencloseday')

    console.log('supervisorScreen элемент:', supervisorScreen);
    console.log('opencloseday элемент:', opencloseday);
    console.log('supervisorScreen display до:', supervisorScreen?.style.display);
    console.log('opencloseday display до:', opencloseday?.style.display);

    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (opencloseday) opencloseday.style.display = 'block';
}

function showRecyclerDayMenu() {
    const opencloseday = document.getElementById('opencloseday')
    const recyclerday = document.getElementById('recyclerday')

    if (opencloseday) opencloseday.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'block';
}

// // Функция для экрана "Закрытие опер дня"
function showDayCloseScreen() {
    const recyclerday = document.getElementById('recyclerday')
    const closerecyclerday = document.getElementById('closerecyclerday')

    if (recyclerday) recyclerday.style.display = 'none';
    if (closerecyclerday) closerecyclerday.style.display = 'block';
}

// Функция перехода из экрана "Операционный день ресайклера" на экран "Введите загрузку кассеты ..."
// через кнопку "Открыть операционный день"
function replenishfirstcassette() {
    const recyclerday = document.getElementById('recyclerday')
    const replenishcassette_1 = document.getElementById('replenishcassette_1')

    if (recyclerday) recyclerday.style.display = 'none';
    if (replenishcassette_1) replenishcassette_1.style.display = 'block';
}

// === Отслеживание PINCH-ZOOM ===
let userZoomScale = 1;
let isUserZooming = false;

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        const newScale = window.visualViewport.scale;

        if (newScale !== userZoomScale) {
            userZoomScale = newScale;
            console.log('Масштаб пользователя:', userZoomScale);
        } else {
            isUserZooming = false;
            console.log('Пользователь вернул масштаб 1');

            if (typeof scaleContainer === 'function') {
                scaleContainer();
            }
        }
    });
}

// === ГЛОБАЛЬНАЯ ВИРТУАЛЬНАЯ КЛАВИАТУРА === 
// Глобальная переменная
let activeInputField = null;

//Определяем, в какое поле вводить цифры
function getActiveInput() {
    if (activeInputField) {
        const parentScreen = activeInputField.closest('.atm-screen');
        if (parentScreen && parentScreen.style.display !== 'none') {
            return activeInputField;
        }
    }
    //1.экран ввода OTP
    const otpScreen = document.getElementById('inputOTPCodeScreen');
    if (otpScreen && getComputedStyle(otpScreen).display !== 'none') {
        return document.getElementById('otpInput');
    } 
    //2. Экран авторизации (100/111111)
    const authScreen = document.getElementById('authScreen');
    if (authScreen && authScreen.style.display === 'block') {
        //Если фокус на поле, вводим пароль
        if (document.activeElement && document.activeElement.id === 'passwordInput') {
            return document.getElementById('passwordInput');
        }
        //Иначе - логин
        return document.getElementById('loginInput');
    }
    //3.Экран загрузки кассет
    for (let i = 1; i <= 4; i++) {
        const cassetteScreen = document.getElementById(`replenishcassette_${i}`);
        if (cassetteScreen && cassetteScreen.style.display === 'block') {
            return document.getElementById(`LoadInput_${i}`);
        }
    }

    //4.По умолчанию - активный элемент
    return document.activeElement;
}   

// Обработчик нажатий на кнопки клавиатуры
function globalVkbInput(digit) {
    //Сначала проверяем OTP
    const otpScreen = document.getElementById('inputOTPCodeScreen');
    if (otpScreen && getComputedStyle(otpScreen).display !== 'none') {
        const input = document.getElementById('otpInput');
        if (input) {
            const maxLength = input.maxLength > 0 ? input.maxLength : 6;
            if (input.value.length < maxLength) {
                input.value += digit;
            }
        }
        return; //Выходим - не проверяем диагностику
    }

    // Экран авторизации в TellME_7, authScreen
    const authScreen = document.getElementById('authScreen');
    if (authScreen && authScreen.style.display === 'block') {
        const input = getActiveInput();
        if (input) {
            const maxLength = input.maxLength > 0 ? input.maxLength : 6;
            if (input.value.length < maxLength) {
                input.value += digit;
            }
        }
        return;
    }

    //Ввод количества банкнот, загруженных в кассеты
    for (let i = 1; i <= 4; i++) {
        const cassetteScreen = document.getElementById( `replenishcassette_${i}`);
        if (cassetteScreen && cassetteScreen.style.display === 'block') {
            const input = document.getElementById(`LoadInput_${i}`);
            if (input) {
                const maxLength = input.maxLength > 0 ? input.maxLength : 4;
                if (input.value.length < maxLength) {
                    input.value += digit;
                }
            }
            return;
        }
    }


    //Проверка: если мы на главном экране (welcome/outOfService) - это диагностика
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');

    const isMainScreen = 
        (welcomeScreen && welcomeScreen.style.display === 'block') ||
        (outOfServiceScreen && outOfServiceScreen.style.display === 'block');
    
    if (isMainScreen) {
        console.log ('Диагностика: нажата цифра', digit);
        if (typeof checkDiagnosticSequence === 'function') {
            checkDiagnosticSequence(digit);
        }
        return;
    }

    const input = getActiveInput();
    if (!input) return;
    
    const maxLength = input.maxLength > 0 ? input.maxLength : 6;
    
    if (input.value.length < maxLength) {
        input.value += digit;
    }
}

// Удаление последней цифры
function globalVkbClear() {
    const input = getActiveInput();
    if (!input) return;

    input.value = input.value.slice(0, -1);
    console.log(`Удалено из ${input.id}: ${input.value}`);
}

// Подтверждение ввода
function globalVkbSubmit() {
    const input = getActiveInput();
    if (!input) return;

    console.log(`Подтверждение ввода: ${input.id} = ${input.value}`);

    // В зависимости от поля - вызываем новую функцию
    if (input.id === 'otpInput') {
        // Завершаем шаг обучения. Убрал пока, похоже, это мешает. 
        // if (typeof isTrainingMode !=='undefined' && isTrainingMode) {
        //     console.log('Завершение шага enterOTP');
        //     completeTrainingStep('enterOTP');
        // }
        submitOTP();
    } else if (input.id === 'loginInput') {
        if (isTrainingMode && input.value === '100') {
            completeTrainingStep('loginInput');
        }
        // Переходим к паролю
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            const isMobile = window.innerWidth <= 1024 && !document.documentElement.classList.contains('android-app');
            const isPortrait = window.innerHeight > window.innerWidth;

 
            if (isMobile && isPortrait) {
                passwordInput.removeAttribute('readonly');
                passwordInput.readOnly = false;
                passwordInput.setAttribute('inputmode', 'numeric');
                passwordInput.focus();
                console.log('Портрет: фокус на passwordInput, системная клавиатура');
            } else if (isMobile) {
                //Ландшафт - виртуальная клава
                passwordInput.readOnly = false;
                passwordInput.focus();
                setTimeout(() => {
                    passwordInput.readOnly = true;
                }, 50);
                console.log('Ландшафт: фокус на passwordInput, виртуальная клавиатура');
            } else {
                //Десктоп
                passwordInput.removeAttribute('readonly');
                passwordInput.readOnly = false;
                passwordInput.focus();
                console.log('Десктоп: фокус на passwordInput');
            }     
        } 

    } else if (input.id === 'passwordInput') {
        submitAuth();
        
    } else if (input.id.startsWith('LoadInput_')) {
        const cassetteNumber = parseInt(input.id.replace('LoadInput_', ''));
        Enter(cassetteNumber);
    }
}

// ===== ОТСЛЕЖИВАНИЕ ФОКУСА НА ПОЛЯХ =====
// Чтобы знать, куда вводить (логин или пароль)
document.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('info-input') || 
        e.target.classList.contains('otp-input') ||
        e.target.classList.contains('pin-input')) {
        activeInputField = e.target; // Сохраняем активное поле
        console.log('📝 Фокус на поле:', e.target.id);
    }
});

// ==== Переключение клавиатуры при переключении экрана
function handleOrientationChange() {
    const keypad = document.getElementById('globalKeypad');
    if (!keypad) return;

    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        //В обучении - управляем клавиатурой
        const step = trainingSteps[currentStepIndex];
        if (!step) return;

        const needsKeypad = step.needsKeyboard === true;
        const isPortrait = window.innerHeight > window.innerHeight > window.innerWidth;
        const isMobile = window.innerWidth <= 1024;
        const hideForPortrait = isMobile && isPortrait;

        if (needsKeypad && !hideForPortrait) {
            keypad.style.setProperty('display', 'grid', 'important');
        } else {
            keypad.style.setProperty('display', 'none', 'important');
        }
    } else {
        if (typeof updateGlobalKeypadForNormalMode === 'function') {
            updateGlobalKeypadForNormalMode();
        }
    }
}

window.addEventListener('resize', () => {
    setTimeout(handleOrientationChange, 100);
});
window.addEventListener('orientationchange', () => {
    setTimeout(handleOrientationChange, 200);
});
// window.addEventListener('resize', () => {
//     //resize срабатывает при повороте, но с меньшей задержкой
//     if (typeof handleOrientationChange === 'function') {
//         setTimeout(handleOrientationChange, 50);
//     }
// });

function updateGlobalKeypadForNormalMode() {
    const keypad = document.getElementById('globalKeypad');
    if (keypad && !document.documentElement.classList.contains('android-app')) {
        const isLandscape = window.innerWidth > window.innerHeight;
        const isMobile = window.innerWidth <= 1024;

        if (isMobile && isLandscape) {
            keypad.style.setProperty('display', 'grid', 'important');
            console.log('Обычный режим: виртуальная клавиатура включена');
        }else{
            keypad.style.setProperty('display', 'none', 'important');
            console.log('Обычный режим, десктоп или портрет на мобильном: клавиатура скрыта');
        }
    }
}

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (typeof initTooltipDrag === 'function') {
            initTooltipDrag();
        }
    }, 200);
});

// Дублируем через resize — на десктопе orientationchange не срабатывает
let lastOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
window.addEventListener('resize', () => {
    const current = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    if (current !== lastOrientation) {
        lastOrientation = current;
        setTimeout(() => {
            if (typeof initTooltipDrag === 'function') {
                console.log('resize: смена ориентации, пересчёт tooltip');
                initTooltipDrag();
            }
        }, 250);
    }
});


function updateDiagnosticButtonsVisibility() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    const buttons = document.getElementById('diagnosticButtons');
    if (!buttons) return;

    const isPortrait = window.innerHeight > window.innerWidth;
    const isMobile = window.innerWidth <= 1024;

    // Скрываем на десктопе и в ландшафте
    if (!isMobile || !isPortrait) {
        buttons.style.setProperty('display', 'none', 'important');
        return;
    }

    // В обучении — показываем только на шаге 35
    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        const currentStep = (typeof trainingSteps !== 'undefined' && trainingSteps[currentStepIndex]) || null;
        const isDiagnosticStep = currentStep && currentStep.id === 35;
        buttons.style.setProperty('display', isDiagnosticStep ? 'flex' : 'none', 'important');
        return;
    }

    // Обычный режим — показываем на welcome / outOfService
    const welcomeVisible = welcomeScreen && getComputedStyle(welcomeScreen).display !== 'none';
    const outOfServiceVisible = outOfServiceScreen && getComputedStyle(outOfServiceScreen).display !== 'none';

    if (welcomeVisible || outOfServiceVisible) {
        buttons.style.setProperty('display', 'flex', 'important');
    } else {
        buttons.style.setProperty('display', 'none', 'important');
    }
}
`
// ===== КНОПКИ ДИАГНОСТИКИ 4-5-6 =====`

function triggerDiagnosticSequence(digit) {
    console.log('Кнопка диагностики нажата:', digit);
    if (typeof checkDiagnosticSequence === 'function') {
        checkDiagnosticSequence(digit);
    } else {
        console.warn('checkDiagnosticSequence не найдена!');
    }
}


// ===== ОТСЛЕЖИВАНИЕ КЛАВИАТУРЫ ЧЕРЕЗ visualViewport =====
if (window.visualViewport) {
    console.log('visualViewport resize:', window.visualViewport.height);
    let lastVVHeight = window.visualViewport.height;

    window.visualViewport.addEventListener('resize', () => {
        console.log('visualViewport resize! height:', window.visualViewport.height);
        const currentHeight = window.visualViewport.height;
        const heightDiff = lastVVHeight - currentHeight;
        lastVVHeight = currentHeight;

        if (typeof isTrainingMode === 'undefined' || !isTrainingMode) return;
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = window.innerWidth <= 1024;
        if (!isMobile || !isPortrait) return;

        const tooltip = document.getElementById('trainingTooltip');
        const container = document.querySelector('.atm-container');
        if (!tooltip || !container) return;

        //Клавиатура открылась - высота уменьшилась
        if (heightDiff > 50) {
            //Сдвигаем контейнер вверх на половину высоты клавиатуры
            // container.style.transform = 'translate(-50%, -50%) translateY(-${heightDiff / 2}px) scale (var(--scale, 0.3225))';
            container.style.transform = `translate(-50%, -50%) translateY(-${heightDiff / 2}px) scale(${currentScale})`;
            console.log('Клавиатура открыта: контейнер сдвинут вверх');
        }

        // Клавиатура закрылась — высота увеличилась, возвращаем подсказку
        if (heightDiff < -50) {
            //возвращаем контейнер на место
            // container.style.transform = 'transate(-50%, -50%) scale(var(--scale, 0.3225))';
            container.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
            console.log('Клавиатура закрыта: контейнер возвращён на место');
            
            //Возвращаем подсказку
            tooltip.style.setProperty('display', 'block', 'important');
            console.log('Подсказка возвращена: клавиатура закрылась');

            // const isPortrait = window.innerHeight > window.innerWidth;
            // const isMobile = window.innerWidth <= 1024;
            // if (isMobile && isPortrait) {
            //     tooltip.style.setProperty('display', 'block', 'important');
            //     console.log('Подсказка возвращена: клавиатура закрылась');
            // }
        }
    });
}