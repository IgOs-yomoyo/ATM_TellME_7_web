// Общие функции для переключения экранов

// Функция кнопки "В режим обслуживания клиентов". Новая. 
function backToWelcomeScreen() {
    console.log('Функция backToWelcomeScreen вызвана');

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
        if (welcomeScreen) {
            welcomeScreen.style.display = 'block';
            console.log('welcomeScreen показан (день открыт)');
        }else{
            console.log('welcomeScreen не найден');
        }
        if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';
        // Запускаем карусель, если она есть
        if (typeof startCarousel === 'function') startCarousel();
    }else{
        // День закрыт - показываем экран outofServece
        if (outOfServiceScreen) {
            outOfServiceScreen.style.display = 'block';
            console.log('outofService показан, день закрыт');
        }else{
            console.log('outofService не найден');
        }
        if (welcomeScreen) welcomeScreen.style.display = 'none';
    }
    
}

//Функция кнопки "В режим обслуживания клиентов". Переход на экран режима инкассации. Устарело. 
// function showMainMenu() {
//     console.log('showMainMenu вызвана')
//     const mainScreen = document.getElementById('mainScreen');
//     const supervisorScreen = document.getElementById('supervisorScreen');
//     const opencloseday = document.getElementById('opencloseday');
//     const recyclerday = document.getElementById('recyclerday');

//     console.log('mainScreen:', mainScreen);
//     console.log('supervisorScreen:', supervisorScreen);
//     console.log('opencloseday:', opencloseday);
//     console.log('recyclerday:', recyclerday);


//     if (mainScreen) {
//          mainScreen.style.display = 'block';
//         console.log('mainScreen display установлен в block');
//     } else {
//         console.error('mainScreen не найден!');
//     }    
//     if (supervisorScreen) supervisorScreen.style.display = 'none';
//     if (opencloseday) opencloseday.style.display = 'none';
//     if (recyclerday) recyclerday.style.display = 'none';
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


// Функция инициализации переключателя
let currentMode = 'normal';

// Функция инициализации переключателя
function initModeSwitch() {
    console.log('initModeSwitch вызвана');
    const checkbox = document.getElementById('modeCheckbox');
    if (!checkbox) return;

    // При загрузке, если текущий режим supervisor, ставим галочку
    checkbox.checked = (currentMode === 'supervisor');

    checkbox.addEventListener('change', function(e){
        if (this.checked) {
            //Хотят переключиться в supervisor
            requestSupervisorMode();
        }else{
            // Переключиться в normal
            switchToNormalMode();
        }
    });
}

function requestSupervisorMode() {
    // Показываем экран авторизации
    const authScreen = document.getElementById('authScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const outScreen = document.getElementById('outOfServiceScreen');
    if (welcomeScreen && welcomeScreen.style.display === 'block') welcomeScreen.style.display = 'none';
    if (outScreen && outScreen.style.display === 'block') outScreen.style.display = 'none';
    if (authScreen) authScreen.style.display = 'block';
    // Сохраняем, что мы пытались переключиться в Supervisor (чтобы после успешной авторизации поставить галочку)
    window.pendingModeSwitch = 'supervisor';
}

function switchToNormalMode() {
    // Переключаем в Normal режим
    if (currentMode === 'supervisor') {
        exitSupervisorMode(); // выходим из режима оператора (уже есть)
    } else {
        // Просто обновляем экран
        if (typeof backToWelcomeScreen === 'function') backToWelcomeScreen();
    }
    const checkbox = document.getElementById('modeCheckbox');
    if (checkbox) checkbox.checked = false;
}

function onAuthSuccess() {
    // Вызывается после успешной авторизации
    if (window.pendingModeSwitch === 'supervisor') {
        currentMode = 'supervisor';
        const checkbox = document.getElementById('modeCheckbox');
        if (checkbox) checkbox.checked = true;
        // Показываем меню оператора
        const supervisorScreen = document.getElementById('supervisorScreen');
        const authScreen = document.getElementById('authScreen');
        if (authScreen) authScreen.style.display = 'none';
        if (supervisorScreen) supervisorScreen.style.display = 'block';
        window.pendingModeSwitch = null;
    }
}

function exitSupervisorMode() {
    currentMode = 'normal';
    const supervisorScreen = document.getElementById('supervisorScreen');
    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (typeof backToWelcomeScreen === 'function') backToWelcomeScreen();
    const checkbox = document.getElementById('modeCheckbox');
    if (checkbox) checkbox.checked = false;
    // Меняем текст на кнопке переключения? Не нужно, используем радио.
}

