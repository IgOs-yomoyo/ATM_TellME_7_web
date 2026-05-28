// Функции главного меню

// function initCassettes() {
//     alert("Инициализация кассет выполнена!");
// }

// function recyclCollection() {
//     alert("Инкассация ресайклера выполнена!");
// }

// function goToSupervisor() {
//     showSupervisorMenu();
// }

// Флаг для правильной работы функций
let isCollectionMode = false; //false - баланс, true - инкассация


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

function showBalanceReceipt() {
    // Скрываем меню инкассации
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';
    // Генерируем чек
    generateReceiptContentForScreen('balanceReceiptContent', false);
    // Показываем экран чека баланса
    const balanceScreen = document.getElementById('balanceReceiptScreen');
    if (balanceScreen) balanceScreen.style.display = 'block';
}

function closeBalanceReceipt() {
    const balanceScreen = document.getElementById('balanceReceiptScreen');
    if (balanceScreen) balanceScreen.style.display = 'none';

    if (isCollectionMode) {
        //Если после кнопки Провести инкассацию, то показываем экран Заберите карту
        showTakeCardScreen();
    }else{
        //После кнопки Получить баланс возвращаемся в Меню инкассации
        const mainScreen = document.getElementById('mainScreen');
        if (mainScreen) mainScreen.style.display = 'block';
    }
}


function showCollectionReceipt() {
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';
    generateReceiptContentForScreen('collectionReceiptContent', true);
    const collectionScreen = document.getElementById('collectionReceiptScreen');
    if (collectionScreen) collectionScreen.style.display = 'block';
}

function closeCollectionReceipt() {
    const collectionScreen = document.getElementById('collectionReceiptScreen');
    if (collectionScreen) collectionScreen.style.display = 'none';

    if (isCollectionMode) {
        showTakeCardScreen();
    }else{
        const mainScreen = document.getElementById('mainScreen');
        if (mainScreen) mainScreen.style.display = 'block';    
    }
}

function exitCollectionScreen(){
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';

    if (typeof backToWelcomeScreen === 'function') {
        backToWelcomeScreen();
    }
    // const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    // if (outOfServiceScreen) outOfServiceScreen.style.display = 'block';
}

// Обновляем кнопки в mainScreen
function getBalance() {
    isCollectionMode = false; //Чек Баланс, поэтому false
    showBalanceReceipt();
}

function performCollection() {
    isCollectionMode = true; //Чек Инкассация, поэтому true
    showCollectionReceipt();
}

//Функция демонстрации экрана "Заберите карту"
function showTakeCardScreen() {
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';
    const takeCardScreen = document.getElementById('takeCardScreen');
    if (takeCardScreen) takeCardScreen.style.display = 'block';
}

//Функция для кнопки "Забрать карту"
function takeCard() {
    const takeCardScreen = document.getElementById('takeCardScreen');
    if (takeCardScreen) takeCardScreen.style.display = 'none';

    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    if (outOfServiceScreen) outOfServiceScreen.style.display = 'block'; 
}

