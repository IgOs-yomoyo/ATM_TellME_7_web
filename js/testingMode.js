// js/testingMode.js

let currentTestScenario = null;
let currentTestStepIndex = 0;
let isTestingModeActive = false;

// Запуск случайного теста (вызывается из кнопки)
function startRandomTest() {
    if (typeof testingScenarios === 'undefined' || testingScenarios.length === 0) {
        alert('Ошибка: Сценарии не загружены.');
        return;
    }

    // Берём первый сценарий (пока один)
    const scenario = testingScenarios[0];
    startTest(scenario);
}

// Запуск конкретного теста
function startTest(scenario) {
    currentTestScenario = scenario;
    currentTestStepIndex = 0;
    isTestingModeActive = true;

    console.log('Запуск теста:', scenario.title);

    // 1. Скрываем все экраны (и главный экран тренажёра тоже)
    document.querySelectorAll('.atm-screen').forEach(s => s.style.display = 'none');
    
    // 2. Показываем нужный экран из начального состояния
    const targetScreen = document.getElementById(scenario.initialState.screen);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }

    // 3. Убеждаемся, что кнопка "Главное меню" видна (на всякий случай)
    const mainMenuBtn = document.querySelector('.training-main-menu-btn');
    if (mainMenuBtn) {
        mainMenuBtn.style.display = 'block';
    }

    // 4. Показываем первый шаг (просто выводим в консоль для проверки)
    showTestStep();
}

// Показ текущего шага
function showTestStep() {
    if (!isTestingModeActive) return;

    const step = currentTestScenario.steps[currentTestStepIndex];
    if (!step) {
        finishTest();
        return;
    }

    console.log('Текущий шаг теста:', step.message);
    // Пока просто выводим в консоль, потом добавим визуальные подсказки
}

// Завершение теста
function finishTest() {
    isTestingModeActive = false;
    console.log('Тест завершён!');
    alert('Тест завершён!');
}

// Проверка действия пользователя
function checkTestAction(actionName) {
    if (!isTestingModeActive) return true; // Если тест не идёт, разрешаем всё

    const step = currentTestScenario.steps[currentTestStepIndex];
    if (!step) return true;

    if (step.action === actionName) {
        console.log('✅ Тест: действие совпало:', actionName);
        currentTestStepIndex++;
        showTestStep(); // Переходим к следующему шагу
        return true; // Действие разрешено
    } else {
        console.log('❌ Тест: ошибка. Ожидалось:', step.action, 'Получено:', actionName);
        // В тестовом режиме мы не прерываем процесс, просто записываем ошибку
        // Но чтобы пользователь не запутался, можно показать alert
        alert('Неверное действие! Ожидалось: ' + step.message);
        return false; // Действие ЗАПРЕЩЕНО (функция не выполнится)
    }
}