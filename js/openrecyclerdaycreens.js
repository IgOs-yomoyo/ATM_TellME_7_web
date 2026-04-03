// Функция возврат в меню "Операционный день ресайклера"
// function Cancel() {
//     cancelreplenishcassette();
// }

// // Функция перехода на экран загрузки кассеты 2
// function Enter() {
//     EnterReplenishCassette_1();
// }

// Функция перехода на экран загрузки кассеты 3
// function Enter() {
//     EnterReplenishCassette_2();
// }

// Функция возврата в меню "Операционный день ресайклера" из любого экрана пополнения кассет
function Cancel(cassetteNumber) {
    // Скрываем все экраны пополнение кассет
    for (let i = 1; i <= 4; i++) {
        const screen = document.getElementById(`replenishcassette_${i}`);
        if (screen) screen.style.display = 'none';
    }
    // Показываем меню ресайклера
    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) recyclerday.style.display = 'block';
}

// Функция "Обнулить"
function Reset(cassetteNumber) {
    const input = document.getElementById(`LoadInput_${cassetteNumber}`);
    if (input) {
        console.log(`Кассета ${cassetteNumber}: ${input.value} шт.`);
    }
}

// Функция "Ввод" - переход к следующему экрану
function Enter(cassetteNumber) {
    // Сохранение данных
    const input = document.getElementById(`LoadInput_$(cassetteNumber)`);
    if (input) {
        console.log(`Кассета ${cassetteNumber}: ${input.value} шт.`);
    }
    // Скрываем текущий экран
    const currentScreen = document.getElementById(`replenishcassette_${cassetteNumber}`);
    if (currentScreen) currentScreen.style.display = 'none';
    if (cassetteNumber < 4) {
        const nextScreen = document.getElementById(`replenishcassette_${cassetteNumber + 1}`);
        if (nextScreen) nextScreen.style.display = 'block';
    } else {
        const recyclerday = document.getElementById('recyclrday');
        if (recyclerday) recyclerday.style.display = 'block';
        alert ('Операционный день открыт');
    }
}
