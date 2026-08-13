

// ========== ТРЕНАЖЁР ========== 

// ========== ОТКРЫТЬ МЕНЮ ТРЕНАЖЁРА
function openTrainingMenu() {
    //Скрываем панель закладок
    const tooltip = document.getElementById('trainingTooltip');
    if (tooltip) tooltip.style.display = 'none';

    //Сбрасываем режим обучения
    isTrainingMode = false;
    currentStepIndex = 0;

    //Убираем подсветку кнопок
    document.querySelectorAll('.training-hightlight').forEach(el => {
        el.classList.remove('training-hightlight');
    });
    
    //Скрываем все экраны
    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });

    // Показываем меню тренажёра
    const trainerMenu = document.getElementById('trainerMenuScreen');
    if (trainerMenu) trainerMenu.style.display = 'block';
}

function backToATMService() {
    const trainerMenu = document.getElementById('trainerMenuScreen');
    if (trainerMenu) trainerMenu.style.display = 'none';

    if (typeof showClientScreen === 'function') {
        showClientScreen();
    }

}

// ========== РЕЖИМ ОБУЧЕНИЯ

let trainingSteps = [];
let currentStepIndex = 0;
let isTrainingMode = false;

// Шаги обучения (порядок действий)
function initTrainingSteps() {
    const dayStatus = isDayOpened() ? 'открыт' : 'закрыт';
    const instructionText = isDayOpened()
        ? 'Далее необходимо подтвердить закрытие операционного дня'
        : 'Если операционный день банкомата был закрыт ранее, то программа переведёт вас на экран повторного закрытия операционного дня. Нажмите кнопку "Закрыть день повторно"'
    trainingSteps = [
        {
            id: 1, 
            instruction: 'Обслуживание банкоматов банка OZON всегда начинается с сервисной карты. Вставьте сервисную карту в картридер.',
            targetSelector: '.insert-card-btn',
            action: 'insertCard',
            targetScreen: 'welcomeScreen'
        },
        {
            id: 2, 
            instruction: 'Введите PIN-код 1478',
            targetSelector: '.pin-input',
            action: 'enterPin',
            targetScreen: 'pinScreen'
        }, 
        {
            id: 3,
            instruction: 'На экране "Меню инкассации" нажмите кнопку "Полчить баланс".',
            targetSelector: '[onclick="getBalance()"]',
            action: 'showBalanceReceipt',
            targetScreen: 'mainScreen'
        },
        {
            id: 4,
            instruction: 'Заберите чек',
            targetSelector: '[onclick="closeBalanceReceipt()"]',
            action: 'closeBalanceReceipt', 
            targetScreen: 'balanceReceiptScreen'
        },
        {
            id: 5,
            instruction: 'На экране "Меню инкассации" нажмите кнопку "Провести инкассацию".',
            targetSelector: '[onclick="performCollection()"]', 
            action: 'showCollectionReceipt',
            targetScreen: 'balanceReceiptScreen'
        }, 
        {
            id: 6,
            instruction: 'Заберите чек', 
            targetSelector: '[onclick="closeCollectionReceipt()"]',
            action: 'closeCollectionReceipt', 
            targetScreen: 'collectionReceiptScreen'
        }, 
        {
            id: 7, 
            instruction: 'Заберите карту',
            targetSelector: '[onclick="takeCard()"]',
            action: 'takeTheCard',
            targetScreen: 'takeCardScreen'
        },
        {
            id: 8, 
            instruction: 'Далее нужно перевести переключатель режимов работы банкомата normal/supervisor в положение supervisor, то есть, перевести банкомат в режим оператора.',
            targetSelector: '.mode-toggle-container', 
            action: 'switchToSupervisor', 
            targetScreen: 'outOfServiceScreen'
        },
        {
            id: 9,
            instruction: 'Введите код пользователя 100 и нажмите кнопку "Ввод"',
            targetSelector: '#loginInput', //#authScreen .info-input
            action: 'loginInput', 
            targetScreen: 'authScreen'
        },
        {
            id: 10,
            instruction: 'Введите пароль 111111 и нажмите кнопку "Ввод"',
            targetSelector: '#passwordInput',
            action: 'passwordInput',
            targetScreen: 'authScreen'
        },
        {
            id: 11,
            instruction: 'На основном экране оператора нажмите "Открытие/закрытие операционного дня"',
            targetSelector: '.supervisor-openclose', //[onclick="openCloseDay()"]
            action: 'openCloseDay',
            targetScreen: 'supervisorScreen'
        },
        {
            id: 12,
            instruction: 'В меню "Открытие/закрытие операционного дня" нужно выбрать кнопку "Дополнительные операции"',
            targetSelector: '[onclick="additionalOperations()"]', //[onclick="additionalOperations()"], .opencloseday-extraoperation'
            action: 'additionalOperations',
            targetScreen: 'opencloseday'
        },
        {
            id: 13,
            instruction: 'Нажмите кнопку "Сброс счётчика задержанных карт"',
            targetSelector: '[onclick="resetHeldCardCounter()"]',
            action: 'resetHeldCardCounter',
            targetScreen: 'additionalOperations'
        },
        {
            id: 14,
            instruction: 'Заберите чек',
            targetSelector: '[onclick="takeHeldCardReceipt()"]',
            action: 'takeHeldCardReceipt',
            targetScreen: 'additionalOperations'
        },
        {
            id: 15, 
            instruction: 'Нажмите кнопку "Возврат" для перехода к предыдущему меню',
            targetSelector: '.additional-backtoopenclosedaymenu', //[onclick="backToOpenCloseDay()"]
            action: 'backToOpenCloseDayMenu',
            targetScreen: 'opencloseday'
        }, 
        {
            id: 16,
            instruction: 'Теперь, в меню "Открытие/закрытие операционного дня", нажмите кнопку "Ресайклер"',
            targetSelector: '.opencloseday-recycler',
            action: 'recycler',
            targetScreen: 'opencloseday'
        },
        {
           id: 17, 
           instruction: 'В следующем меню, "Операционный день ресайклера", нажимаем кнопку "Закрытие операционного дня"',
           targetSelector: '.recyclerday-closeday',
           action: 'closeRecyclerDay', //closeRecyclerDay  showCloseDayScreen
           targetScreen: 'recyclerday'
        },
        {
            id: 18,
            instruction: instructionText,
            targetSelector: isDayOpened() ? '.confirmCloseDay' : '.confirmCloseDayAgain', // [onclick="confirmCloseDay()"] .confirmCloseDay
            action: isDayOpened() ? 'confirmCloseDay' : 'confirmCloseDayAgain', //showCloseRecyclerDayAgainScreen
            targetScreen: isDayOpened() ? 'closeDayConfirmScreen' : 'closeRecyclerDayAgain'
        },
        {
            id: 19,
            instruction: 'Нажмите кнопку "Продолжить", чтобы забрать чек.',
            targetSelector: '.close-receipt-confirm-btn',
            action: 'confirmCloseReceipt',
            targetScreen: 'closeReceiptScreen'
        },
        {
            id: 20,
            instruction: 'Теперь нам нужно открыть сейф банкомата.',
            targetSelector: '.openSafeDoor',
            action: 'openSafeDoor',
            targetScreen: 'cassettesReplacmentScreen'
        },
        {
            id: 21,
            instruction: 'Меняем кассеты',
            targetSelector: '.replaceCassettes',
            action: 'replaceCassettes',
            targetScreen: 'cassettesReplacmentScreen'
        },
        {
            id: 22,
            instruction: 'Закрываем дверь сейфа',
            targetSelector: '.closeSafeDoor',
            action: 'closeSafeDoor',
            targetScreen: 'cassettesReplacmentScreen'
        },
        {
            id: 23,
            instruction: 'После замены кассет открываем новый операционный цикл',
            targetSelector: '.recyclerday-openday',
            action: 'openDay',
            targetScreen: 'recyclerday'
        },
        {
            id: 24,
            instruction: 'Введите количество банкнот, загруженных в кассету №1 (номинал 100 рублей) и нажмите кнопку ВВОД',
            targetSelector: '#LoadInput_1, .enter-btn', //'#LoadInput_1, 
            action: 'enterNoOfNotes_1',
            targetScreen:'replenishcassette_1'
        },
        {
            id: 25,
            instruction: 'Введите количество банкнот, загруженных в кассету №2 (номинал 500 рублей) и нажмите кнопку ВВОД',
            targetSelector: '#LoadInput_2, .enter-btn',
            action: 'enterNoOfNotes_2',
            targetScreen: 'replenishcassette_2'
        }
    ];
}

function startTraining() {
    // document.body.classList.add('training-mode'); // Похоже, это лишнее. 
    isTrainingMode = true;
    currentStepIndex = 0;
    initTrainingSteps();

    // Скрываем меню тренажёра
    const trainerMenu = document.getElementById('trainerMenuScreen');
    if (trainerMenu) trainerMenu.style.display = 'none';

    // Принудительно показываем welcomeScreen
    // Скрываем все экраны
    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });

    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.style.display = 'block';
        console.log('welcomeScreen принудительно запущен');
    }

    // На всякий случай скрываем outOfService
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';

    // Показываем первый шаг с задержкой
    setTimeout(() => {
        showTrainingStep(currentStepIndex);
    }, 300);
}

function showTrainingStep(index) {
    console.log('showTrainingStep вызван, индекс:', index);
    console.log('Всего шагов в массиве:', trainingSteps.length);

    if (index >= trainingSteps.length) {
        console.log('Индекс ('+ index +') >= длины массива ('+ trainingSteps.length +')');
        console.log('Все шаги выполнены! Обучение завершено!');
        finishTraining();
        return;
    }

    const step = trainingSteps[index];
    console.log('Текущий шаг:', step);
    console.log('targetScreen:', step.targetScreen);
    console.log('targetSelector:', step.targetSelector);
    console.log('action:', step.action);

    // Обновляем счётчик шагов
    const stepSpan = document.getElementById('tooltipStep');
    const totalSpan = document.getElementById('tooltipStep');

    if (stepSpan) {
        stepSpan.textContent = index + 1;
    }
    if (totalSpan) {
        totalSpan.textContent = trainingSteps.length;
    }
    if (totalSpan) {
        totalSpan.textContent = trainingSteps.length;
    }
    // Проверяем, что мы на нужном экране
    // Если в шаге указан целевой экран, показываем его
    if (step.targetScreen) {
        console.log('Показываем экран:', step.targetScreen);
        document.querySelectorAll('.atm-screen').forEach(screen => {
            screen.style.display = 'none';
        });
        const targetScreen = document.getElementById(step.targetScreen);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            console.log('Показан экран, display:', targetScreen.style.display);
        } else {
            console.warn('Нет targetScreen в шаге!');
        }
    }

    // Обновляем панель подсказок
    const tooltip = document.getElementById('trainingTooltip');
    if (!tooltip) {
        console.error('Панель подсказок не найдена');
        return;
    }

    // Обновляем панель
    document.getElementById('tooltipStep').textContent = step.id;
    document.getElementById('tooltipTotal').textContent = trainingSteps.length;
    document.getElementById('tooltipText').textContent = step.instruction;

    // Обновляем прогресс
    const progress = ((index + 1) / trainingSteps.length) * 100;
    document.getElementById('tooltipProgressBar').style.width = progress + '%';

    tooltip.style.display = 'block';
    console.log('Показана панель подсказок');

    //==== УБИРАЕМ ПОДСТВЕТКУ И НОМЕР КНОПКИ ======
    // Убираем подсветку с предыдущей кнопки
    document.querySelectorAll('.training-highlight').forEach(el => {
        el.classList.remove('training-highlight');
    });
      

    // Подсвечиваем целевую кнопку
    // const target = document.querySelector(step.targetSelector);
    // if (target) {
    //     target.classList.add('training-highlight');
        
        
   // Удаляем старый номер
    // const oldLabel = target.querySelector('.step-number');
    // if (oldLabel) oldLabel.remove();
    

    //Подсвечиваем целевые элементы (поддержка нескольких селекторов)
    if (step.targetSelector) {
        const selectors = step.targetSelector.split(',').map(s => s.trim());

        selectors.forEach((selector, idx) => {
            const target = document.querySelector(`#${step.targetScreen} ${selector}`);
            if (target) {
                target.classList.add('training-highlight');
                console.log(`Элемент найден по селектору: "${selector}"`);

                //Номер добавляем только на второй элемент (кнопку) или на единственный элемент, если селектор один
                if (selectors.length === 1 || idx === 1) {
                    //Удаляем старый номер
                    const oldLabel = target.querySelector('.step-number');
                    if (oldLabel) oldLabel.remove();

                    //Создаём номер
                    const label = document.createElement('span');
                    label.className = 'step-number';
                    label.textContent = step.id;
                    label.style.cssText = `
                        position: absolute;
                        top: -10px;
                        left: -10px;
                        background: #ff9800;
                        color: white;
                        border-radius: 50%;
                        width: 28px;
                        height: 28px;
                        font-size: 14px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 100;
                        pointer-events: none;
                    `;

                    if (window.getComputedStyle(target).position === 'static') {
                        target.style.position = 'relative';
                    }

                    target.appendChild(label);
                    console.log(`Номер ${step.id} добавлен на "${selector}"`);
                }
            } else {
                console.warn(`Элемент не найден по селектору: "${selector}"`);
            }
        });
    }
}
    // Создаём номер и добавляем его в конец кнопки (не меняя position)
//     const label = document.createElement('span');
//     label.className = 'step-number';
//     label.textContent = step.id;
//     label.style.cssText = `
//         position: absolute;
//         top: -10px;
//         left: -10px;
//         background: #ff9800;
//         color: white;
//         border-radius: 50%;
//         width: 28px;
//         height: 28px;
//         font-size: 14px;
//         font-weight: bold;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         z-index: 100;
//         pointer-events: none;
//         `;

//         target.appendChild(label);
//     }
// }

function completeTrainingStep(action) {

    console.log('=== completeTrainingStep вызвана ===');
    console.log('action:', action);
    console.log('isTrainingMode:', isTrainingMode);
    console.log('currentStepIndex:', currentStepIndex);
    console.log('Текущий шаг:', trainingSteps[currentStepIndex]);

    if (!isTrainingMode) return;

    // Проверяем, совпадает ли действие с ожидаемым
    const step = trainingSteps[currentStepIndex];
    if (!step) {
        console.log('Шаг не найден по индексу', currentStepIndex);
    }

    console.log('Ожидаемое действие:', step.action);
    console.log('Полученное действие:', action);

    if (step && step.action === action) {
        console.log('✅ Действие совпадает, переходим к следующему шагу');

        const currentTarget = document.querySelector(step.targetSelector);
        if (currentTarget) {
            const label = currentTarget.querySelector('.step-number');
            if (label) label.remove();
            currentTarget.classList.remove('training-highlight');
        }
        currentStepIndex++;
        console.log('Новый currentStepIndex:', currentStepIndex);
        
        if (currentStepIndex >= trainingSteps.length) {
            console.log('Шаги закончились, завершаем обучение');
            finishTraining();
            return;
        }
        showTrainingStep(currentStepIndex);
    } else {
        console.log('Действие не совпадает');
    }
}

function skipTrainingStep() {
    if (!isTrainingMode) return;

    const step = trainingSteps[currentStepIndex];
    if (step) {
        const currentTarget = document.querySelector(step.targetSelector);
        if (currentTarget) {
            const label = currentTarget.querySelector('step-number');
            if (label) label.remove();
            currentTarget.classList.remove('training-highlight');
        }
    }
    currentStepIndex++;
    showTrainingStep(currentStepIndex);
}

function finishTraining() {
    // document.body.classList.add('training-mode'); // Похоже, лишнее. 
    isTrainingMode = false;
    currentStepIndex = 0;

    // === УБИРАЕМ ВСЕ НОМЕРА ===
    document.querySelectorAll('.step-number').forEach(el => el.remove());
    document.querySelectorAll('.training-highlight').forEach(el => {
        el.classList.remove('training-highlight');
    });
    
    const tooltip = document.getElementById('trainingTooltip');
    if (tooltip) tooltip.style.display = 'none';
    
    openTrainingMenu();
    
}

function startDragTouch() {
    console.log('startDragTouch вызвана (заглушка)');
}

// ========== ПЕРЕТАСКИВАНИЕ ПАНЕЛИ ПОДСКАЗОК ==========
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let tooltipElement = null;

function initTooltipDrag() {
    tooltipElement = document.getElementById('trainingTooltip');
    if (!tooltipElement) return;

    //=== Привязвываем курсор к окну ===
    tooltipElement.style.position = 'fixed';
    tooltipElement.style.left = '30px';
    tooltipElement.style.bottom = '150px';
    tooltipElement.style.top = 'auto';
    tooltipElement.style.right = 'auto';
    tooltipElement.style.transform = 'none';

    // События для мыши
    tooltipElement.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);

    // События для touch-устройств
    tooltipElement.addEventListener('touchstart', startDragTouch, {passive: false});
    document.addEventListener('touchmove', onDragTouch, {passive: false});
    document.addEventListener('touchend', stopDragTouch, {passive: false});
}

function startDrag(e) {
    if (e.target.closest('.training-tooltip-skip')) return; //Не перетаскивать по кнопке
    isDragging = true;
    const rect = tooltipElement.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    tooltipElement.classList.add('dragging');
    tooltipElement.style.transition = 'none';
    e.preventDefault();
}

function onDrag(e) {
    if (!isDragging) return;
    //Новые координаты панели: курсор минус смещение
    let x = e.clientX - dragOffsetX;
    let y = e.clientY - dragOffsetY;

    const rect = tooltipElement.getBoundingClientRect();
    const panelWidth = rect.width;
    const panelHeight = rect.height;


    const maxX = window.innerWidth - 20; //const maxX = window.innerWidth - rect.width;
    const minX = 20; //-panelWidth + 10;
    const maxY = window.innerHeight - 20; //const maxY = window.innerHeight - rect.height;
    const minY = 20; //-panelHeight + 10;

    x = Math.max(minX, Math.min(x, maxX));
    y = Math.max(minY, Math.min(y, maxY));
    // const x = e.clientX - dragOffsetX;
    // const y = e.clientY - dragOffsetY;
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';
    tooltipElement.style.bottom = 'auto';
    tooltipElement.style.right = 'auto';
    tooltipElement.style.transform = 'none';
}

function stopDrag() {
    if (isDragging) {
        isDragging = false;
        tooltipElement.classList.remove('dragging');
    }
}

//Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    //Инициализация только если панель существует
    if (document.getElementById('trainingTooltip')) {
        initTooltipDrag();
    }
});

// Touch-версия
// function startDragTouch(e) {
//     if (e.target.closest('.training-tooltip-skip')) return;
//     const touch = e.touches[0];
//     isDragging = true;
//     const rect = tooltipElement.getBoundingClientRect();
//     dragOffsetX = touch.clientX - rect.left;
//     dragOffsetY = touch.clientY - rect.top;
//     tooltipElement.classList.add('dragging');
//     e.preventDefault();
// }

// function onDragTouch(e) {
//     if (!isDragging) return;
//     const touch = e.touches[0];
//     const x = touch.clientX - dragOffsetX;
//     const y = touch.clientY - dragOffsetY;
//     tooltipElement.style.left = x + 'px';
//     tooltipElement.style.top = y + 'px';
//     tooltipElement.style.bottom = 'auto';
//     tooltipElement.style.right = 'auto';
//     tooltipElement.style.transform = 'none';
//     e.preventDefault();
// }

// function stopDragTouch() {
//     if (isDragging) {
//         isDragging = false;
//         tooltipElement.classList.remove('dragging');
//     }
// }

