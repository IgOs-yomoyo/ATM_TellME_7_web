// Общие функции для переключения экранов

function showMainMenu() {
    console.log('showMainMenu вызвана')
    const mainScreen = document.getElementById('mainScreen');
    const supervisorScreen = document.getElementById('supervisorScreen');
    const opencloseday = document.getElementById('opencloseday');
    const recyclerday = document.getElementById('recyclerday');

    console.log('mainScreen:', mainScreen);
    console.log('supervisorScreen:', supervisorScreen);
    console.log('opencloseday:', opencloseday);
    console.log('recyclerday:', recyclerday);


    if (mainScreen) {
         mainScreen.style.display = 'block';
        console.log('mainScreen display установлен в block');
    } else {
        console.error('mainScreen не найден!');
    }    
    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (opencloseday) opencloseday.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'none';
}

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

// Фнкция для возврата из экрана "Введите загрузку кассеты ..." на экран "Операционный день ресайклера" 
// через кнопку "Отмена"
// function cancelreplenishcassette(){
//     const replenishcassette_1 = document.getElementById('replenishcassette_1')
//     const recyclerday = document.getElementById('recyclerday')

//     if (replenishcassette_1) replenishcassette_1.style.display = 'none';
//     if (recyclerday) recyclerday.style.display = 'block';
// }

// // Функция подтверждения загрузки кассеты 1 и переход на экран загрузки кассеты 2
// function EnterReplenishCassette_1() {
//     const replenishcassette_1 = document.getElementById('replenishcassette_1')
//     const replenishcassette_2 = document.getElementById('replenishcassette_2')

//     if (replenishcassette_1) replenishcassette_1.style.display = 'none';
//     if (replenishcassette_2) replenishcassette_2.style.display = 'block';
// }

// // Функция подтверждения загрузки кассеты 2 и переход на экран загрузки кассеты 3
// function EnterReplenishCassette_2() {
//     const replenishcassette_2 = document.getElementById('replenishcassette_2')
//     const replenishcassette_3 = document.getElementById('replenishcassette_3')

//     if (replenishcassette_2) replenishcassette_2.style.display = 'none';
//     if (replenishcassette_3) replenishcassette_3.style.display = 'block';
// }