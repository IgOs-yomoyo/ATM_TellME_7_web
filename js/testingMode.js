// js/testingMode.js

let currentTestScenario = null;
let currentTestStepIndex = 0;
let isTestingModeActive = false;
let testErrors = [];

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
        console.log('initialState:', scenario.initialState);

        // Сохраняем данные заявки
        if (scenario.initialState.cassetteLoads) {
            window.testCassetteLoads = scenario.initialState.cassetteLoads;
            console.log('Данные заявки сохранены:', window.testCassetteLoads);
        }

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
        // alert('Неверное действие! Ожидалось: ' + step.message);
        return false; // Действие ЗАПРЕЩЕНО (функция не выполнится)
    }
}

// Перехват клика по кнопке "Главное меню" в режиме теста
// document.addEventListener('click', (e) => {
//     // Проверяем, что кликнули именно по кнопке "Главное меню"
//     const menuBtn = e.target.closest('.training-main-menu-btn');
    
//     // Если это не она — ничего не делаем
//     if (!menuBtn) return;
    
//     // Если тест не активен — даём кнопке сработать как обычно
//     if (typeof isTestingModeActive === 'undefined' || !isTestingModeActive) return;

//     // 👇 ЕСЛИ ТЕСТ АКТИВЕН:
//     e.preventDefault(); // Отменяем стандартное поведение
//     e.stopPropagation(); // Останавливаем всплытие

//     console.log('Тест прерван пользователем через кнопку "Главное меню"');
    
//     // Завершаем тест
//     isTestingModeActive = false;
//     currentTestScenario = null;
//     currentTestStepIndex = 0;
    
//     // Возвращаемся в меню тренажёра (вызываем функцию, которая уже есть в learningMode.js)
//     if (typeof openTrainingMenu === 'function') {
//         openTrainingMenu();
//     } else {
//         // Если функции нет — просто показываем меню вручную
//         document.querySelectorAll('.atm-screen').forEach(s => s.style.display = 'none');
//         const trainerMenu = document.getElementById('trainerMenuScreen');
//         if (trainerMenu) trainerMenu.style.display = 'block';
//         menuBtn.style.display = 'none';
//     }
// }, true); // true = capture, чтобы сработало ДО обычного onclick


function showTestError(message) {
    // Создаём/показываем уведомление
    let notice = document.getElementById('testErrorNotice');
    if (!notice) {
        notice = document.createElement('div');
        notice.id = 'testErrorNotice';
        notice.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffebee;
            color: #b71c1c;
            padding: 15px 30px;
            border-radius: 10px;
            border: 1px solid #ef9a9a;
            font-size: 16px;
            z-index: 1000000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.style.opacity = '1';

    // Скрываем через 3 секунды
    clearTimeout(window.testErrorTimer);
    window.testErrorTimer = setTimeout(() => {
        notice.style.opacity = '0';
        setTimeout(() => { notice.style.display = 'none'; }, 300);
    }, 3000);
    
    // Сразу показываем (если было скрыто)
    notice.style.display = 'block';
}


// ГЛОБАЛЬНЫЙ ПЕРЕХВАТЧИК КЛИКОВ ДЛЯ ТЕСТОВОГО РЕЖИМА
document.addEventListener('click', (e) => {
    // Если тест не идёт — не вмешиваемся
    if (typeof isTestingModeActive === 'undefined' || !isTestingModeActive) return;

    const step = currentTestScenario.steps[currentTestStepIndex];
    if (!step) return; // Если шагов больше нет

    // 1. Исключение: кнопка "Главное меню" всегда работает
    const menuBtn = e.target.closest('.training-main-menu-btn');
    if (menuBtn) {
        // 1. Если это последний шаг - разрешаем выход без ошибки
        if (step && step.id === 33) {// 33 - последний шаг
           return;
        }

         // 2. Шаги с 27 по 32 - блокируем выход
        if (step && step.id >= 28 && step.id <= 32) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            testErrors.push({
                step: step.id,
                expected: step.expectedText || step.action,
                got: 'Попытка выхода в главное меню (заблокировано)'
            });
            console.log('Тест: выход заблокирован (шаги 28 - 32). Ошибкок:', testErrors.length);
            // console.log('Тест прерван через кнопку "Главное меню". Ошибка:', testErrors.length);
            // Показываем сообщение, но не блокируем
            showTestError('Нельзя прервать тест! Действие не выполнено.');
            return;
        }
        
        // 3. Во всех остальных случаях прерываем тест (кнопка работает), показываем ошибку и количество ошибок пользователя
        if (step) {
            testErrors.push({
                step: step.id,
                expected: step.expectedText || step.action,
                got: 'Выход в главное меню (тест прерван)'
            });
            console.log('Тест прерван через кнопку "Главное меню". Ошибка:', testErrors.length);
            showTestError('Тест прерван. Действие не выполнено.');
        }
        return;
    }

    // 1.1 Исключение: кнопка Приступить к загрузке на экране с заявкой
    const orderBtn = e.target.closest('.order-continue-btn');
    if (orderBtn) {
        return; // Не блокируем
    }

    // 2. Ищем кнопку, по которой кликнули
    const button = e.target.closest('button, .atm-button, [onclick], .otp-logo-wrapper, .switch-vertical');
    
    // Если кликнули мимо кнопок (например, по фону) — не вмешиваемся
    if (!button) {
        return; 
    }

    // Очищаем текст от лишних пробелов
    const cleanText = (str) => (str || '').replace(/\s+/g, ' ').trim().toUpperCase();

    // 3. Получаем текст кнопки или её onclick для сравнения
    // let buttonText = '';
    const buttonText = cleanText(button.textContent);
    const onclickAttr = (button.getAttribute('onclick') || '').toLowerCase();
    const expectedText = cleanText(step.expectedText);
    const expectedAction = (step.action || '').toLowerCase();
    // let onclickAttr = '';

    // Исключение для кнопки ОБНУЛИТЬ на экране ввода количества банкнот
    if (buttonText.includes('ОБНУЛИТЬ') || onclickAttr.includes('reset')) {
        return; // Пропускаем без блокировки
    }


    // 4. Проверяем, совпадает ли действие
    let isCorrectAction = false;

    // 4.1 Если в кнопке указан текст - проверяем его наличие в кнопке или onclick
    if (expectedText && buttonText.includes(expectedText)) {
        isCorrectAction = true;
    }
    // 4.2 Если текста нет или он не совпадает - проверяем по action (onclick)
    else if (onclickAttr.includes(expectedAction)) {
        isCorrectAction = true;
    }

    // 4.3 Специфическое исключение для логотипа OZON
    if (step.action === 'logoClick' && e.target.closest('.otp-logo-wrapper')) {
        isCorrectAction = true;
    }

     // 4.4. Специфичное исключение для тумблера (для всех шагов)
    if (e.target.closest('.switch-vertical') || e.target.closest('.mode-toggle-container')) {
        // Если тест ждёт переключения тумблера - засчитываем
        if (step.action === 'switchToSupervisor' || step.action === 'switchToNormal') {
            isCorrectAction = true;
        } else {
            isCorrectAction = false;
        }
    }


    // 5. Если действие НЕВЕРНОЕ — блокируем
    if (!isCorrectAction) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Важно! Останавливает другие обработчики

        // Записываем ошибку - неправильный клик пользователя
        testErrors.push({
            step: step.id,
            expected: step.expectedText || step.action,
            got: buttonText || 'Клик мимо кнопки'
        });

        console.log('❌ Тест: заблокирован клик по:', buttonText || 'неизвестно', 'Ожидалось:', step.expectedText || step.action);
        
        // Показываем сообщение
        showTestError('Неверное действие! Ожидалось: ' + step.message);
        return;
    }

    // 6. Если действие верное — пропускаем клик дальше
    console.log('✅ Тест: правильный клик по:', buttonText || step.action);
}, true); // capture = true — перехватываем ДО того, как сработают onclick

function finishTest() {
    isTestingModeActive = false;
    const errorCount = testErrors.length;
    console.log('Тест завершён. Ошибок:', errorCount);

    // Формируем сообщение
    let message = `Тест завершён!\n\nОшибок: ${errorCount}`;
    if (errorCount === 0) {
        message += '\n\nОтлично! Ошибок нет!';
    } else {
        message += '\n\nРекомендуем повторить обучение.';
    }

    alert(message);
    // Возвращаемся в меню
    document.querySelectorAll('.atm-screen').forEach(s => s.style.display = 'none');
    const trainerMenu = document.getElementById('trainerMenuScreen');
    if (trainerMenu) trainerMenu.style.display = 'block';
}

// Логика работы экрана демонстрации заявки
function showCassetteOrderScreen() {
    console.log('showCassetteOrderScreen вызвана');
    console.log('window.testCassetteLoads =', window.testCassetteLoads);
    // Заполняем дату
    const dateEl = document.getElementById('orderDate');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('ru-RU');

    // Заполняем таблицу
    const tbody = document.getElementById('orderTableBody');
    const totalEl = document.getElementById('orderTotalSum');
    if (!tbody || !window.testCassetteLoads) return;

    tbody.innerHTML = '';
    let total = 0;
    const nominals = { 1: 100, 2: 500, 3: 1000, 4: 5000 };

    for (let i = 1; i <= 4; i++) {
        const count = window.testCassetteLoads[i] || 0;
        const nominal = nominals[i];
        const sum = count * nominal;
        total += sum;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i}</td>
            <td>${nominal}</td>
            <td>${count}</td>
            <td>${sum.toLocaleString()}</td>
        `;
        tbody.appendChild(tr);
    }

    if (totalEl) totalEl.textContent = total.toLocaleString();

    // Показываем экран
    document.querySelectorAll('.atm-screen').forEach(s => s.style.display = 'none');
    const screen = document.getElementById('cassetteOrderScreen');
    if (screen) screen.style.display = 'block';
}

function closeCassetteOrderScreen() {
    const screen = document.getElementById('cassetteOrderScreen');
    if (screen) screen.style.display = 'none';

     // Увеличиваем шаг (завершаем шаг openDay)
    if (typeof isTestingModeActive !== 'undefined' && isTestingModeActive) {
        currentTestStepIndex++;
        console.log('Тест: заявка закрыта, переходим к шагу', currentTestStepIndex);
    }
    // Переходим к первому экрану
    const cassetteScreen = document.getElementById('replenishcassette_1');
    if (cassetteScreen) {
        cassetteScreen.style.display = 'block';
        if (typeof initInputField === 'function') initInputField(1);
    }
}