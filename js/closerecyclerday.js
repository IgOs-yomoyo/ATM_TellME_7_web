console.log('closerecyclerday.js начал загрузку');

let openingDayData = null;


function setOpeningDayData(data) {
    console.log('setOpeningDayData вызвана', data);
    openingDayData = data;
}

function generateDayTransactions(openingDayData) {
    console.log('generateDayTransactions: openingDayData=', openingDayData);
    console.log('openingDayData?.dropped=', openingDayData?.dropped);
    const transactions = {
        cassettes: [],
        totalAccepted: 0,
        totalIssued: 0, 
        // totalRejected: 0,
        totalDropped: 0,
        totalRetracted: 0, 
        depositAccepted: 0
    };

    const cassettes = [
        {number: 1000, nominal: 100, loaded: openingDayData?.cassetteLoads[1] || 0},
        {number: 2000, nominal: 500, loaded: openingDayData?.cassetteLoads[2] || 0},
        {number: 3000, nominal: 1000, loaded: openingDayData?.cassetteLoads[3] || 0},
        {number: 4000, nominal: 5000, loaded: openingDayData?.cassetteLoads[4] || 0}
    ];

    const openingDropped = openingDayData?.dropped || {1: 0, 2: 0, 3: 0, 4: 0};
    console.log('openingDropped=', openingDropped);

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < cassettes.length; i++) {
        const c = cassettes[i];
        const loadedCount = c.loaded;

        if (loadedCount === 0) {
            transactions.cassettes.push({
                number: c.number,
                nominal: c.nominal,
                loadedCount: 0, 
                acceptedCount: 0, 
                issuedCount: 0,
                droppedCount: 0,
                balanceCount: 0,
                status: 0
            });
            continue;
        }

        let issuedCount, acceptedCount, finalCount;
        let attempts = 0;

        do {
            issuedCount = random(0, 2000);
            acceptedCount = random(0, 2000);
            finalCount = loadedCount + acceptedCount - issuedCount;
            attempts++;
            if (attempts > 100) break;
        } while (finalCount < 0 || finalCount > 2000);

        if (attempts > 100) {
            finalCount = loadedCount;
            acceptedCount = 0, 
            issuedCount = 0;
        }
        // const droppedCount = random(0, Math.min(2, finalCount));
        const droppedCount = openingDropped[i + 1] || 0;
        const finalBalance = finalCount - droppedCount;
        const status = finalBalance < 300 ? 1 : 0;

        transactions.cassettes.push({
            number: c.number,
            nominal: c.nominal,
            loadedCount: loadedCount,
            acceptedCount: acceptedCount,
            issuedCount: issuedCount,
            droppedCount: droppedCount,
            balanceCount: finalBalance,
            status: status
        });

        transactions.totalAccepted += acceptedCount * c.nominal;
        transactions.totalIssued += issuedCount * c.nominal;
        transactions.totalDropped += droppedCount * c.nominal;
    }

    function generateRetractedAmount() {
        const nominals = [100, 500, 1000, 5000];
        let total = 0;
        let notesCount = 0;

        const count = Math.floor(Math.random() * 21);

        for (let i = 0; i < count; i++) {
            const nominal = nominals[Math.floor(Math.random() * nominals.length)];
            total += nominal;
            notesCount ++;
        }
        console.log(`Ретракт: ${notesCount} банкноты на сумму: ${total} руб`);
        return total;

    }
    // transactions.totalRejected = random(0, 4);
    // console.log(`transactions.totalRejected: ${transactions.totalRejected}` )
    //console.log(`2. Экран отображён, display: ${screen.style.display}`);
    transactions.totalRetracted = generateRetractedAmount();
    console.log(`transactions.totalRetracted: ${transactions.totalRetracted}`)
    transactions.depositAccepted = random(10000, 110000);
    console.log(`transactions.depositAccepted: ${transactions.depositAccepted}`)
    return transactions;
}

function showCloseDayScreen() {
    console.log('showCloseDayScreen вызвана');

    // if (typeof isDayOpened === 'function' && !isDayOpened()) {
    //     alert('Операционный день не был открыт!');
    //     return;
    // }

    // if (!openingDayData) {
    //     alert('Нет данных об открытии опер дня.');
    //     return;
    // }

    //Получаем данные о транзакциях за день
    // const transactions = generateDayTransactions(openingDayData);
    const transactions = getCurrentTransactionData();

    // if (!transactions) {
    //     alert('Нет данных о транзакциях.');
    //     return;
    // }

    const receiptContent = document.getElementById('closeReceiptContent');
    if (!receiptContent) return;

    const now = new Date;
    const currentDate = now.toLocaleDateString('ru-RU');
    const currentTime = now.toLocaleTimeString('ru-RU');

    let receiptHtml = '';
    receiptHtml += '<div style="font-family: monospace; font-size: 12px;">';
    receiptHtml += '<div style="text-align: center;">';
    receiptHtml += '<strong>СБЕРБАНК РОССИИ ПАО</strong><br>';
    receiptHtml += 'ОТДЕЛ СЕРВИСНОГО ОБСЛУЖИВАНИЯ<br>';
    receiptHtml += 'Волгоградский пр-т д. 32 к. 45<br>';
    receiptHtml += `ДАТА: ${currentDate} ВРЕМЯ: ${currentTime}<br>`;
    receiptHtml += 'НОМЕР БАНКОМАТА: 10869631<br>';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '<strong>ЗАКРЫТИЕ ОПЕРАЦИОННОГО ДНЯ</strong><br>';

    if (openingDayData && openingDayData.time && openingDayData.date) {
        receiptHtml += 'ВРЕМЯ ОТКРЫТИЯ: ${openingDayData.time} ${openingDayData.date}<br>'
    }else{
        receiptHtml += 'ВРЕМЯ ОТКРЫТИЯ: данные отсутствуют<br>';
    }

    // receiptHtml += `ВРЕМЯ ОТКРЫТИЯ: ${openingDayData.time} ${openingDayData.date}<br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';
    
    // Таблица
    receiptHtml += '<table style="width: 100%; border-collapse: collapse; text-align: center;">';
    receiptHtml += '<tr style="border: 1px solid #000;">';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">№</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ном</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Вал</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Загружено</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Принято</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Выдано</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Сбр</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Остаток</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">С</th>';
    receiptHtml += '</tr>';

    for (let i = 0; i < transactions.cassettes.length; i++) {
        const c = transactions.cassettes[i];
        receiptHtml += '<tr style="border: 1px solid #000;">';
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.number}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.nominal}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">643</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.loadedCount}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.acceptedCount}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.issuedCount}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.droppedCount}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.balanceCount}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.status}</td>`;
        receiptHtml += '</tr>';
    }

    // Депозит, Реджект, Ретракт
    receiptHtml += '<tr style="border: 1px solid #000;">';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">Депозит</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${transactions.depositAccepted.toLocaleString()}</td>`;
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<tr>';

    
    receiptHtml += '<tr style="border: 1px solid #000;">';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">Ретракт</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${transactions.totalRetracted}</td>`;
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '</tr>';
    
    receiptHtml += '</table>';

    // Итоги
    // const totalLoadedAmount = openingDayData.totalAmount;
    const totalLoadedAmount = openingDayData && openingDayData.totalAmount ? openingDayData.totalAmount : 0;
    const totalAcceptedAmount = transactions.totalAccepted;
    const totalIssuedAmount = transactions.totalIssued;
    const totalDroppedAmount = transactions.totalDropped;
    const depositAccepted = transactions.depositAccepted;
    const totalBalance = totalLoadedAmount + transactions.depositAccepted + totalAcceptedAmount - totalIssuedAmount - totalDroppedAmount;
    
    receiptHtml += '<div style="margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Загружено: ${totalLoadedAmount.toLocaleString()} руб.</strong><br>`;
    receiptHtml += `Принято: ${(totalAcceptedAmount + transactions.depositAccepted).toLocaleString()} руб.<br>`;
    receiptHtml += `Выдано: ${totalIssuedAmount.toLocaleString()} руб.<br>`;
    receiptHtml += `Сброшено: ${totalDroppedAmount.toLocaleString()} руб.<br>`;
    receiptHtml += `Ретракт: ${transactions.totalRetracted} руб.<br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Принято в депозитную кассету: ${depositAccepted.toLocaleString()}</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>ОБЩИЙ БАЛАНС: ${totalBalance.toLocaleString()} руб.</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';
    
    receiptHtml += '</div>';
    
    receiptContent.innerHTML = receiptHtml;

    const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    if (closeReceiptScreen) {
        closeReceiptScreen.style.display = 'block';
        console.log('Экран закрытия показан');
    } else {
        console.error('closeReceiptScreen не найден');
    }

    const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');
    if (closeDayConfirmScreen) closeDayConfirmScreen.style.display = 'none';
}

// Функция, подтверждающая закрытие опер дня при нажатии кнопки "Продолжить"
function confirmCloseReceipt() {
    console.log('confirmCloseReceipt вызвана');

     //ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ
    if (isTrainingMode) {
            completeTrainingStep('confirmCloseReceipt');
        }
    
    //Скрываем экран с чеком
    const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    if (closeReceiptScreen) {
        closeReceiptScreen.style.display = 'none';
    }
    
    //Сбрасываем статус операционного дня
    if (typeof setDayOpened === 'function') {
        setDayOpened(false);
        console.log('Флаг сброшен');
    }
    
    openingDayData = null;

    resetCurrentTransactionData();
    
    //Показываем экран Замена кассет
    if (typeof showCassettesReplacmentScreen === 'function') {
        console.log('Переход к замене кассет');
        showCassettesReplacmentScreen();
    }else{
        console.error('showCassettesReplacementScreen не найдена!');
        const recyclerday = document.getElementById('recyclerday');
        if (recyclerday)  {
            recyclerday.style.display = 'block';
        }
    }
}

// const recyclerday = document.getElementById('recyclerday');
    // if (recyclerday) {
    //     recyclerday.style.display = 'block';


console.log('closerecyclerday.js загружен полностью');

function getCurrentDayData() {
    if(!openingDayData) {
        return{
            date: new Date().toLocaleDateString('ru-RU'), 
            time: new Date().toLocaleTimeString('ru-RU'),
            cassetteLoads: {1: 0, 2: 0, 3: 0, 4: 0},
            totalAmount: 0, 
            dropped: {1: 0, 2: 0, 3: 0, 4: 0}
        };
    }
    return openingDayData;
}


let currentTransactionData = null;
let closedDayTransactionData = null; // Отдельный кэш для закрытого дня

// Функция для получения или генерации данных транзакций для текущего дня
function getCurrentTransactionData() {
    if(!openingDayData) {
        if (!closedDayTransactionData) {
            const zeroDayData = {
                date: new Date().toLocaleDateString('ru-RU'),
                time: new Date().toLocaleTimeString('ru-RU'),
                cassetteLoads: {1: 0, 2: 0, 3: 0, 4: 0},
                totalAmount: 0, 
                dropped: {1: 0, 2: 0, 3: 0, 4: 0}
            };
            const transactions = generateDayTransactions(zeroDayData);
            transactions.depositAccepted = 0;
            transactions.totalRetracted = 0;
            closedDayTransactionData = transactions;
        }
        return closedDayTransactionData;
    }

    if (!currentTransactionData) {
        currentTransactionData = generateDayTransactions(openingDayData);
    }
    return currentTransactionData;
}

        


// Функция сброса, обнуления данных о текущем опер дне
function resetCurrentTransactionData() {
    currentTransactionData = null;
    console.log('Кэш транзакций сброшен');
}