// Кнопка Продолжить
// function Continue() {
//     if(typeof setDayOpened === 'function') {
//         setDayOpened(false);
//         console.log('День закрыт, флаг сброшен')
//     }
//     showRecyclerDayMenu();
// }

// Проверка, что день открыт - эта функция лишняя. 
// function isDayOpen() {
//     if (typeof cassetteLoads === 'undefined') return false;
//     for (let i=1; i <= 4; i++   ) {
//         if (cassetteLoads[i] && cassetteLoads[i] > 0) {
//             return true;
//         }
//     }
//     return false;
// }


// Данные открытого операционного дня (будут получены из openrecyclerdaycreens.js)
let openingDayData = null;


// Функция закрытия опер дня
// function closeDay() {
//     if (!isDayOpen()) {
//         alert('Операционный день закрыт. Сначала откройте операционный день');
//         return;
//     }
//     showCloseDayScreen();
// }



// Функция для установки данных открытия (вызывается из openrecyclerdaycreens.js)
function setOpeningDayData(data) {
    openingDayData = data;
}

// Генерация случайных данных за рабочий день
function generateDayTransactions() {
    const transactions = {
        cassettes: [],
        totalAccepted: 0,
        totalIssued: 0, 
        totalDropped: 0,
        totalRejected: 0, 
        totalRetracted: 0,
        depositAccepted: 0
    };

    const cassettes = [
        { number: 1000, nominal: 100, loaded: openingDayData?.cassetteLoads[1] || 0 },
        { number: 2000, nominal: 500, loaded: openingDayData?.cassetteLoads[2] || 0 },
        { number: 3000, nominal: 1000, loaded: openingDayData?.cassetteLoads[3] || 0 },
        { number: 4000, nominal: 5000, loaded: openingDayData?.cassetteLoads[4] || 0 }
    ];

    for (let i = 0; i < cassettes.length; i++) {
        const c = cassettes[i];
        const banknotesCount = c.loaded;

        const acceptedBanknotes = Math.floor(Math.random() * (banknotesCount * 0.3 + 1));
        const issuedBanknotes = Math.floor(Math.random() * (banknotesCount * 0.2 + 1));
        const droppedBanknotes = (banknotesCount === 0) ? 0 : Math.floor(Math.random() * 3) + 1;


        const acceptedAmount = acceptedBanknotes * c.nominal;
        const issuedAmount = issuedBanknotes * c.nominal;
        const droppedAmount = droppedBanknotes * c.nominal;
        const balanceAmount = (c.loaded - issuedBanknotes - droppedBanknotes + acceptedBanknotes) * c.nominal;
        
        const remainingBanknotes = c.loaded - issuedBanknotes - droppedBanknotes + acceptedBanknotes;
        const status = remainingBanknotes < 300 ? 1 : 0;

        transactions.cassettes.push({
            number: c.number,
            nominal: c.nominal,
            loadedAmount: c.loaded * c.nominal,
            acceptedAmount: acceptedAmount,
            issuedAmount: issuedAmount,
            droppedAmount: droppedAmount,
            balanceAmount: balanceAmount,
            status: status
        });

        transactions.totalAccepted += acceptedAmount;
        transactions.totalIssued += issuedAmount;
        transactions.totalDropped += droppedAmount;
    }

    transactions.totalRejected = Math.floor(Math.random() * 5);
    transactions.totalRetracted = Math.floor(Math.random() * 3);
    transactions.depositAccepted = Math.floor(Math.random() * 100000) + 10000;
    
    return transactions;
}

// Функция для отображения чека закрытия
function showCloseDayScreen() {
    console.log('=== showCloseDayScreen: НАЧАЛО ===');

    if (typeof isDayOpened === 'function' && !isDayOpened()) {
        console.log('showCloseDayScreen: день не открыт, выход');
        alert('Операционный день закрыт! Сначала откройте операционный день!');
        return;
    }
    
    console.log('showCloseDayScreen: проверка isDayOpened пройдена');

    // Если openingDayData нет, создаём из текущих данных (Возможно, это лишнее)
    if (!openingDayData) {
        console.log('showCloseDayScreen: openingDayData = null, выход');
        let totalAmount = 0;
        for (let i = 1; i <= 4; i++) {
            if (cassetteLoads[i]) {
                const nominal = [100, 500, 1000, 5000][i-1];
                totalAmount += cassetteLoads[i] * nominal;
            }
        }
        openingDayData = {
            date: new Date().toLocaleDateString('ru-RU'),
            time: new Date().toLocaleTimeString('ru-RU'),
            cassetteLoads: { ...cassetteLoads },
            totalAmount: totalAmount
        };
    }

    
    const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    if (closeReceiptScreen) closeReceiptScreen.style.display = 'block';
}

// Функция подтверждения чека закрытия
function confirmCloseReceipt() {
    const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    if (closeReceiptScreen) closeReceiptScreen.style.display = 'none';

     // Сбрасываем флаг, что день открыт
    if (typeof setDayOpened === 'function') {
        setDayOpened(false);
        console.log('Флаг сброшен, день закрыт');
    }
    // Сбрасываем счётчики
    openingDayData = null;
    console.log('openingDayData очищен');
    
    // Сброс данных кассет
    if (typeof resetAllInputFields === 'function') {
        resetAllInputFields();
    }
    for (let i = 1; i <= 4; i++) {
        if (typeof cassetteLoads !== 'undefined') {
            cassetteLoads[i] = null;
        }
    }
    console.log('Данные о загрузке очищены.');
    // const supervisorScreen = document.getElementById('supervisorScreen');
    // if (supervisorScreen) supervisorScreen.style.display = 'block';

    // Возвращаемся на экран recyclerday. 
    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) {
        recyclerday.style.display = 'block';
    }
}

// Функция закрытия дня (вызывается из кнопки)
// function closerecyclerday() {
//     // Проверяем флаг через функцию из openrecyclerdaycreens.js
//     if (typeof isDayOpened === 'function' && !isDayOpened()) {
//         alert('Операционный день не был открыт! Сначала откройте операционный день.');
//         return;
//     }
//     showCloseDayScreen();
// }
