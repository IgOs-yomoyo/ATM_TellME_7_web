

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
            instruction: 'Нажмите кнопку "Вставьте карту"',
            targetSelector: '.insert-card-btn',
            action: 'insertCard'
        },
        {
            id: 2, 
            instruction: 'Введите PIN-код 1478',
            targetSelector: '.main-btn',
            action: 'selectOperation'
        }
    ];
}

function startTraining() {
    isTrainingMode = true;
    currentStepIndex = 0;
    initTrainingSteps();

    // Показываем панель инструкций
    const panel = document.getElementById('trainingPanel');
    if (panel) panel.style.display = 'block';

    // Показываем первый шаг
    showTestingScreen(currentStepIndex);
}

function showTrainingStep(index) {
    if (index >= trainingSteps.length) {
        finishTraining();
        return;
    }

    const step = trainingSteps[index];

    // Обновляем панель
    document.getElementById('currntStep').textContent = step.id;
    document.getElementById('totalSteps').textContent = trainingSteps.length;
    document.getElementById('trainingInstruction').textContent = step.instruction;

    // Обновляем прогресс
    const progress = ((index + 1) / trainingSteps.length) * 100;
    document.getElementById('trainingProgressBar').style.width = progress + '%';

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

