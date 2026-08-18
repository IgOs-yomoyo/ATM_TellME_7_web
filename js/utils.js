// Общие функции для переключения экранов
// let currentMode = 'normal'; 

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
    }, duration);

}

// Имитация звука
function playTestingSound() {
    try {
        const audio = new Audio('audio/testing_sound.mp4');
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
        showTestingScreen(8000, function() {
            if (welcomeScreen) {
                welcomeScreen.style.display = 'block';
                console.log('welcomeScreen показан (день открыт)');
            }else{
                console.log('welcomeScreen не найден');
            }
            if (outOfServiceScreen) outOfServiceScreen.style.display = 'none';
            // Запускаем карусель, если она есть
            if (typeof startCarousel === 'function') startCarousel();
        });
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
    
    //Завершаем шаг в обучении
    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('backToNormalMode');
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

















