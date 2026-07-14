

// ========== ТРЕНАЖЁР ========== 

// ========== ОТКРЫТЬ МЕНЮ ТРЕНАЖЁРА
function openTrainingMenu() {
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
            targetSelector: 'pin-input',
            action: 'enterPin',
            targetScreen: 'pinScreen'
        }
    ];
}

function startTraining() {
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


//     if (typeof showClientScreen === 'function') {
//         showClientScreen();
//     }

//     // Показываем первый шаг
//     showTrainingStep(currentStepIndex);

// }

function showTrainingStep(index) {
    console.log('showTrainingStep вызван, индекс:', index);

    if (index >= trainingSteps.length) {
        finishTraining();
        return;
    }

    const step = trainingSteps[index];
    console.log('Текущий шаг:', step);
    console.log('targetScreen:', step.targetScreen);

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

    // Убираем подсветку с предыдущей кнопки
    document.querySelectorAll('.training-highlight').forEach(el => {
        el.classList.remove('training-highlight');
    });

    // Подсвечиваем целевую кнопку
    const target = document.querySelector(step.targetSelector);
    if (target) {
        target.classList.add('training-highlight');
        // Прокручиваем к кнопке, если она не видна
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Добавляем номер на кнопку
    if (target) {
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
        `;
        // Удаляем старый номер, если был
        const oldLabel = target.querySelector('.step-number');
        if (oldLabel) oldLabel.remove();
        target.style.position = 'relative';
        target.appendChild(label);
    }
}

function completeTrainingStep(action) {
    // Проверяем, совпадает ли действие с ожидаемым
    const step = trainingSteps[currentStepIndex];
    if (step && step.action === action) {
        currentStepIndex++;
        showTrainingStep(currentStepIndex);
    }
}

function skipTrainingStep() {
    currentStepIndex++;
    showTrainingStep(currentStepIndex);
}

function finishTraining() {
    isTrainingMode = false;
    const panel = document.getElementById('trainingPanel');
    if (panel) panel.style.display = 'none';
    
    // Убираем подсветку
    document.querySelectorAll('.training-highlight').forEach(el => {
        el.classList.remove('training-highlight');
    });
    
    alert('🎉 Обучение завершено! Теперь вы знаете, как пользоваться банкоматом.');
}

