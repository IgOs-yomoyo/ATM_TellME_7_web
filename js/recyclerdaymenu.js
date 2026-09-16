
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
        
        console.log('День закрыт - показываем экран "Закрыть день повторно"');
        showCloseRecyclerDayAgainScreen();

        if (isTrainingMode) {
            completeTrainingStep('closeRecyclerDay');
        }
        return;
    }

    console.log('День открыт - закрываем день');

    closeDayConfirmScreen();
    console.log('Функция closeDayConfirmScreen вызвана')

    if (isTrainingMode) {
        completeTrainingStep('closeRecyclerDay');
    }
}

// Функция повторного закрытия опер дня
function showCloseRecyclerDayAgainScreen() {
    console.log('Экран повторного закрытия');

    const recyclerday = document.getElementById('recyclerday');
    const closeRecyclerDayAgain = document.getElementById('closeRecyclerDayAgain');

    if (recyclerday) recyclerday.style.display = 'none';
    if (closeRecyclerDayAgain) closeRecyclerDayAgain.style.display = 'block';
     // Проверка в режиме обучения
        if (isTrainingMode) {
            completeTrainingStep('showCloseRecyclerDayAgainScreen');
        }
}

// Функция Закрыть день повторно
function confirmCloseDayAgain() {
    console.log('Подтверждение повторного закрытия');
    
    const closeRecyclerDayAgain = document.getElementById('closeRecyclerDayAgain');
    if (closeRecyclerDayAgain) closeRecyclerDayAgain.style.display = 'none';


        // Проверка в режиме обучения
        if (isTrainingMode) {
            completeTrainingStep('confirmCloseDayAgain');
        }

        if (typeof confirmCloseDay === 'function') {
            confirmCloseDay();
        } else {
            console.error('confirmCloseDay не найдена');
            alert('Ошибка: функция подтверждения не найдена');
        }
}

//Функция Отмены повторного закрытия опердня
function cancelCloseRecyclerDayAgain() {
    console.log('Отмена повторного закрытия опер дня');
    
    const closeRecyclerDayAgain = document.getElementById('closeRecyclerDayAgain');
    const recyclerday = document.getElementById('recyclerday');

    if (closeRecyclerDayAgain) closeRecyclerDayAgain.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'block';
}

// Функция демонстрации экрана подтверждения закрытия опер дня. 
function closeDayConfirmScreen() {
    const recyclerday = document.getElementById('recyclerday');
    const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');

    if (recyclerday) recyclerday.style.display = 'none';
    if (closeDayConfirmScreen) closeDayConfirmScreen.style.display = 'block';
}



//Функция подтверждения закрытия опер дня
function confirmCloseDay() {
    console.log('Подтверждение закрытия опер дня');
    
    const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');
    // const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    const recyclerday = document.getElementById('recyclerday');

    if (closeDayConfirmScreen) {
        closeDayConfirmScreen.style.display = 'none';
        console.log('Экран подтверждения закрытия операционного дня закрыт');
    }
    //Сбрасываем статус опер дня
    if (typeof setDayOpened === 'function') {
        setDayOpened(false);
        console.log('Флаг сброшен. Операционный день закрыт');
    }

    //Сбрасываем данные открытия дня
    if (typeof setOpeningDayData === 'function') {
        setOpeningDayData(null);
        console.log ('openingDayData сброшен');
    }
   
    //Сбрасываем транзакции текущего периода
    if (typeof resetCurrentTransactionData === 'function') {
        resetCurrentTransactionData();
        console.log('Транзакции сброшены');
    }

    //Сбрасываем cassetteloads
    if (typeof cassetteLoads !== 'undefined') {
        cassetteLoads = { 1: null, 2: null, 3: null, 4: null };
        console.log('cassetteLoads сброшены');
    }

    //Показываем экран recyclerday
    if (recyclerday) {
        recyclerday.style.display = 'block';
        console.log('Показан экран recyclerday');
    } else {
        console.warn('recyclerday не найден');
    }

    //ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ
    if (isTrainingMode) {
            completeTrainingStep('confirmCloseDay');
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

    // Сначала запускаем тестирование модуля рециркуляции
    showTestingScreen(8000, function() {
        replenishfirstcassette();
    })
//    replenishfirstcassette(); 

   //Обновляем подсветку после показа экрана
   if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
    setTimeout(() => {
        showTrainingStep(currentStepIndex);
    }, 8000); //Здесь изменил длительность демонстрации. Было 100. 
   }
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

