
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


// Функция для генерации содержимого чека (общая для баланса и инкассации)
// использует данные из openingDayData или cassetteLoads
function generateReceiptContentForScreen(receiptContentId, isCollectionMode) {
    console.log('generateReceiptContentForScreen вызвана, id:', receiptContentId, 'isCollectionMode:', isCollectionMode);
    const receiptContent = document.getElementById(receiptContentId);
    if (!receiptContent) return;
    
    // Получаем данные дня (если день не открыт, то нули)
    let dayData = openingDayData;
    if (!dayData) {
        dayData = {
            date: new Date().toLocaleDateString('ru-RU'),
            time: new Date().toLocaleTimeString('ru-RU'),
            cassetteLoads: {1: 0, 2: 0, 3: 0, 4: 0},
            totalAmount: 0,
            dropped: { 1: 0, 2: 0, 3: 0, 4: 0 }
        };

    }

    //Используем единые данные о транзакциях текущего периода
    let transactions;
    if (typeof getCurrentTransactionData === 'function') {
        transactions = getCurrentTransactionData();
    }


    if (!transactions) {
        transactions = generateDayTransactions(dayData);
    }

    // // Генерируем транзакции (принято/выдано/сброшено) на основе загрузки
    // const transactions = generateDayTransactions(dayData);
    
    const now = new Date();
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
    if (isCollectionMode) {
        receiptHtml += '<strong>ЧЕК ИНКАССАЦИИ</strong><br>';
    } else {
        receiptHtml += '<strong>ЧЕК БАЛАНСА</strong><br>';
    }
    receiptHtml += `ВРЕМЯ ОТКРЫТИЯ: ${dayData.time} ${dayData.date}<br>`;
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
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">С</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Остаток</th>';
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
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.status}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.balanceCount}</td>`;
        receiptHtml += '</tr>';
    }
    
    // Депозит
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
    
    // Ретранс
    receiptHtml += '<tr style="border: 1px solid #000;">';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">Ретракт</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${transactions.totalRetracted.toLocaleString()}</td>`;
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
    receiptHtml += '</tr>';
    
    receiptHtml += '</table>';
    
    // Итоги
    const totalBalance = dayData.totalAmount + transactions.depositAccepted + transactions.totalAccepted - transactions.totalIssued - transactions.totalDropped;
    
    receiptHtml += '<div style="margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Загружено: ${dayData.totalAmount.toLocaleString()} руб.</strong><br>`;
    receiptHtml += `Принято: ${(transactions.totalAccepted + transactions.depositAccepted).toLocaleString()} руб.<br>`;
    receiptHtml += `Выдано: ${transactions.totalIssued.toLocaleString()} руб.<br>`;
    receiptHtml += `Сброшено: ${transactions.totalDropped.toLocaleString()} руб.<br>`;
    receiptHtml += `Ретракт: ${transactions.totalRetracted.toLocaleString()} руб.<br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Принято в депозитную кассету: ${transactions.depositAccepted.toLocaleString()} руб.</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>ОБЩИЙ БАЛАНС: ${totalBalance.toLocaleString()} руб.</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';
    
    receiptHtml += '</div>';
    
    receiptContent.innerHTML = receiptHtml;
    console.log('Чек успешно сгенерирован');
}

// Функция - печать баланса
function printbalance() {
     console.log('Функция printbalance вызвана');
    // Скрываем экран recyclerday - опер день ресайклера
    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) recyclerday.style.display = 'none';

     if (typeof generateReceiptContentForScreen === 'function') {
        generateReceiptContentForScreen('currentRecyclerBalance', false);
     }else{
        console.error('generateReceiptContentForScreen не найдена');
        alert('Ошибка генерации чека');
        return;
     }

<<<<<<< HEAD
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

=======
    //  //Показываем экран с чеком
    const supervisorbalanceprint = document.getElementById('balanceReceiptContent');
    if (supervisorbalanceprint) supervisorbalanceprint.style.display = 'block';
    //  const supervisorbalanceprint = document.getElementById('supervisorbalanceprint');
    //  console.log('Экран supervisorbalanceprint найден:', supervisorbalanceprint);
    //  if (supervisorbalanceprint) {
    //     console.log('Текущий display:', supervisorbalanceprint.style.display);
    //     supervisorbalanceprint.style.display = 'block';
    //     console.log('Новый display установлен в block');
    //  }else{
    //     console.error('Экран supervisorbalanceprint НЕ НАЙДЕН в DOM!');
    //  }

    //  const content = document.getElementById('balanceReceiptContent');
    //  console.log('Содержимое чека:', content.innerHTML.length, 'символов');
    //  console.log('Первые 200 символов:', content.innerHTML.substring(0, 200));
}

// function showBalanceReceipt() {
//     // Скрываем меню инкассации
//     const mainScreen = document.getElementById('mainScreen');
//     if (mainScreen) mainScreen.style.display = 'none';
//     // Генерируем чек
//     generateReceiptContentForScreen('balanceReceiptContent', false);
//     // Показываем экран чека баланса
//     const balanceScreen = document.getElementById('balanceReceiptScreen');
//     if (balanceScreen) balanceScreen.style.display = 'block';
// }


function takeBalanceReceipt() {
    console.log('takeBalanceReceipt вызвана');

    const supervisorbalanceprint = document.getElementById('supervisorbalanceprint');
    if (supervisorbalanceprint) {
        supervisorbalanceprint.style.display = 'none';
    }

    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) {
        recyclerday.style.display = 'block';
    }
}
>>>>>>> a53043a4fc0224a7e76554c1acd5b25ef6d9ec32
