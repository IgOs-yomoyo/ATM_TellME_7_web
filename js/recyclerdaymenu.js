
function backtoOpenCloseDay() {
    console.log('функция backtoOpenCloseDay вызвана');
    const recyclerday = document.getElementById('recyclerday');
    const opencloseday = document.getElementById('opencloseday');
    // showopenclosedaymenu();

    if(recyclerday) recyclerday.style.display = 'none';
    if(opencloseday) opencloseday.style.display = 'block';
}

function closerecyclerday() {
    console.log('closerecyclerday вызвана');
    console.log('isDayOpened():', typeof isDayOpened === 'function' ? isDayOpened() : 'функция не найдена');
    // console.log('openingDayData:', openingDayData);

    if (typeof isDayOpened === 'function' && !isDayOpened()) {
        alert('Операционный день закрыт. Сначала откройте операционный день. Вызвано из recyclerdaymenu.js');
        return;
    }
    // showCloseDayScreen();
    // console.log('Функция showCloseDayScreen вызвана.')
    closeDayConfirmScreen();
    console.log('Функция closeDayConfirmScreen вызвана')
}

// Функция демонстрации экрана подтверждения закрытия опер дня. 
function closeDayConfirmScreen() {
    const recyclerday = document.getElementById('recyclerday');
    const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');

    if (recyclerday) recyclerday.style.display = 'none';
    if (closeDayConfirmScreen) closeDayConfirmScreen.style.display = 'block';
}

function confirmCloseDay() {
    console.log('Подтверждение закрытия опер дня');

    const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');
    const closeReceiptScreen = document.getElementById('closeReceiptScreen');

    if (typeof showCloseDayScreen === 'function') {
        showCloseDayScreen();
    }else{
        console.error('showCloseDayScreen не найдена');
    }
}

function cancelCloseDay() {
    console.log('Отмена закрытия опер дня');

    const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');
    const recyclerday = document.getElementById('recyclerday');

    if (closeDayConfirmScreen) closeDayConfirmScreen.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'block';
}


function openrecyclerday() {
    console.log('openrecyclerday вызвана');
    console.log('isDayOpened():', typeof isDayOpened === 'function' ? isDayOpened() : 'функция не найдена');
    // console.log('openingDayData:', openingDayData);

    if (typeof isDayOpened === 'function' && isDayOpened()) {
        alert('Операционный день открыт. Сначала закройте операционный день. Вызвано из recyclerdaymenu.js');
        return;
    }
   replenishfirstcassette(); 
}

