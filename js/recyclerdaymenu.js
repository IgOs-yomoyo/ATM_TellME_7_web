
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
    if (isTrainingMode) {
        completeTrainingStep('openDay');
    }
    console.log('openrecyclerday вызвана');
    console.log('isDayOpened():', typeof isDayOpened === 'function' ? isDayOpened() : 'функция не найдена');
    // console.log('openingDayData:', openingDayData);

    if (typeof isDayOpened === 'function' && isDayOpened()) {
        alert('Операционный день открыт. Сначала закройте операционный день. Вызвано из recyclerdaymenu.js');
        return;
    }
   replenishfirstcassette(); 
}

// Функция - печать баланса
function printbalance() {
     console.log('printBalanceReceipt вызвана');

     if (typeof generateReceiptContentForScreen === 'function') {
        generateReceiptContentForScreen('currentRecyclerBalance', false);
     }else{
        console.error('generateReceiptContentForScreen не найдена');
        alert('Ошибка генерации чека');
        return;
     }

     //Показываем экран с чеком
     const supervisorbalanceprint = document.getElementById('supervisorbalanceprint');
     if (supervisorbalanceprint) {
        supervisorbalanceprint.style.display = 'block';
     }
}

function takeBalanceReceipt() {
    //Скрываем экран supervisorbalanceprint
    const supervisorbalanceprint = document.getElementById('supervisorbalanceprint');
    if (supervisorbalanceprint) supervisorbalanceprint.style.display = 'none';

    //Показываем экран recyclerday
    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) recyclerday.style.display = 'block';
}

function intermediateresult() {
    console.log('supervisorinterimresult вызвана');

    //Скрываем экран recyclerday
     const recyclerday = document.getElementById('recyclerday');
     if (recyclerday) recyclerday.style.display = 'none';
   
    if (typeof generateReceiptContentForScreen === 'function') {
        generateReceiptContentForScreen('interimReceiptContent', false);
     }else{
        console.error('generateReceiptContentForScreen не найдена');
        alert('Ошибка генерации чека');
        return;
     }

     //Показываем экран с чеком
     const supervisorinterimresult = document.getElementById('sepervisorinterimresult');
     if (supervisorinterimresult) supervisorinterimresult.style.display = 'block';
}

function takeInterimResult() {
    const sepervisorinterimresult = document.getElementById('sepervisorinterimresult');
    if (sepervisorinterimresult) sepervisorinterimresult.style.display = 'none';

    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) recyclerday.style.display = 'block';
}

