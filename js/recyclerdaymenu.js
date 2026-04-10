
function рrevious() {
    showopenclosedaymenu();
}

function closerecyclerday() {
    console.log('closerecyclerday вызвана');
    console.log('isDayOpened():', typeof isDayOpened === 'function' ? isDayOpened() : 'функция не найдена');
    console.log('openingDayData:', openingDayData);

    if (typeof isDayOpened === 'function' && !isDayOpened()) {
        alert('Операционный день закрыт. Сначала откройте операционный день. Вызвано из recyclerdaymenu.js');
        return;
    }
    if (!openingDayData) {
        alert('Нет данных об открытии опер дня! Сначала откройте опер день!');
        return;
    }
    showCloseDayScreen();
    console.log('Функция showCloseDayScreen вызвана.')
}

function openrecyclerday() {
    console.log('openrecyclerday вызвана');
    console.log('isDayOpened():', typeof isDayOpened === 'function' ? isDayOpened() : 'функция не найдена');
    console.log('openingDayData:', openingDayData);

    if (typeof isDayOpened === 'function' && isDayOpened()) {
        alert('Операционный день открыт. Сначала закройте операционный день. Вызвано из recyclerdaymenu.js');
        return;
    }
    if (openingDayData) {
        alert('Операционный день открыт. Нужно закрыть!!!');
        return;
    }
   replenishfirstcassette(); 
}

// function closerecyclerday() {
//     if (typeof isDayOpened === 'function' && !isDayOpened()) {
//         alert('Операционный день закрыт. Сначала откройте операционный день. Вызвано из recyclerdaymenu.js');
//         return;
//     }
//     if (typeof closeDayOperetion === 'function') {
//         closeDayOperetion();
//     }else{
//         alert('Функция closeDayOperation не найдена');
//     }
// }