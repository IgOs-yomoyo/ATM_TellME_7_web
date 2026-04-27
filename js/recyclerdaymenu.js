
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
    showCloseDayScreen();
    console.log('Функция showCloseDayScreen вызвана.')
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

