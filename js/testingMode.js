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

// Перехват клика по кнопке "Главное меню" в режиме теста
document.addEventListener('click', (e) => {
    // Проверяем, что кликнули именно по кнопке "Главное меню"
    const menuBtn = e.target.closest('.training-main-menu-btn');
    
    // Если это не она — ничего не делаем
    if (!menuBtn) return;
    
    // Если тест не активен — даём кнопке сработать как обычно
    if (typeof isTestingModeActive === 'undefined' || !isTestingModeActive) return;

    // 👇 ЕСЛИ ТЕСТ АКТИВЕН:
    e.preventDefault(); // Отменяем стандартное поведение
    e.stopPropagation(); // Останавливаем всплытие

    console.log('Тест прерван пользователем через кнопку "Главное меню"');
    
    // Завершаем тест
    isTestingModeActive = false;
    currentTestScenario = null;
    currentTestStepIndex = 0;
    
    // Возвращаемся в меню тренажёра (вызываем функцию, которая уже есть в learningMode.js)
    if (typeof openTrainingMenu === 'function') {
        openTrainingMenu();
    } else {
        // Если функции нет — просто показываем меню вручную
        document.querySelectorAll('.atm-screen').forEach(s => s.style.display = 'none');
        const trainerMenu = document.getElementById('trainerMenuScreen');
        if (trainerMenu) trainerMenu.style.display = 'block';
        menuBtn.style.display = 'none';
    }
}, true); // true = capture, чтобы сработало ДО обычного onclick

// ГЛОБАЛЬНЫЙ ПЕРЕХВАТЧИК КЛИКОВ ДЛЯ ТЕСТОВОГО РЕЖИМА
document.addEventListener('click', (e) => {
    // Если тест не идёт — не вмешиваемся
    if (typeof isTestingModeActive === 'undefined' || !isTestingModeActive) return;

    const step = currentTestScenario.steps[currentTestStepIndex];
    if (!step) return; // Если шагов больше нет

    // 1. Исключение: кнопка "Главное меню" всегда работает
    const menuBtn = e.target.closest('.training-main-menu-btn');
    if (menuBtn) {
        // ... (код аварийного выхода, который мы написали ранее) ...
        return; // Не блокируем
    }

    // 2. Ищем кнопку, по которой кликнули
    const button = e.target.closest('button, .atm-button, [onclick], .otp-logo-wrapper, .switch-vertical');
    
    // Если кликнули мимо кнопок (например, по фону) — блокируем на всякий случай
    if (!button) {
        // Можно разрешить клики по пустому месту, но лучше заблокировать, чтобы не сбить фокус
        // return; 
    }

    // 3. Получаем текст кнопки или её onclick для сравнения
    let buttonText = '';
    let onclickAttr = '';

    if (button) {
        buttonText = (button.textContent || '').trim().toUpperCase();
        onclickAttr = (button.getAttribute('onclick') || '').toLowerCase();
    }

    // 4. Проверяем, совпадает ли действие
    let isCorrectAction = false;

    // 4.1. Если в шаге указан текст — проверяем его
    if (step.expectedText) {
        const expected = step.expectedText.toUpperCase();
        // Проверяем, есть ли ожидаемый текст в тексте кнопки или в её onclick
        if (buttonText.includes(expected) || onclickAttr.includes(step.action.toLowerCase())) {
            isCorrectAction = true;
        }
    } 
    // 4.2. Если текста нет — проверяем только по action (onclick)
    else if (onclickAttr.includes(step.action.toLowerCase())) {
        isCorrectAction = true;
    }
    
    // 4.3. Специфичное исключение для логотипа OZON
    if (step.action === 'logoClick' && e.target.closest('.otp-logo-wrapper')) {
        isCorrectAction = true;
    }

    // 4.4. Специфичное исключение для тумблера (шаг 7)
    if (step.action === 'switchToSupervisor' && e.target.closest('.switch-vertical')) {
        isCorrectAction = true;
    }

    // 5. Если действие НЕВЕРНОЕ — блокируем
    if (!isCorrectAction) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Важно! Останавливает другие обработчики

        console.log('❌ Тест: заблокирован клик по:', buttonText || 'неизвестно', 'Ожидалось:', step.expectedText || step.action);
        
        // Показываем сообщение (используем вашу функцию alert или модалку)
        alert('Неверное действие! ' + step.message);
        return;
    }

    // 6. Если действие верное — пропускаем клик дальше
    console.log('✅ Тест: правильный клик по:', buttonText || step.action);
}, true); // capture = true — перехватываем ДО того, как сработают onclick