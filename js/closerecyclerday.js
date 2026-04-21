// Генерация данных за рабочий день
function generateDayTransactions(openingDayData) {
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
            issuedCount = 0;
            acceptedCount = 0;
        }
        
        const droppedCount = random(0, Math.min(2, finalCount));
        finalCount = finalCount - droppedCount;
        
        const status = finalCount < 300 ? 1 : 0;

        transactions.cassettes.push({
            number: c.number,
            nominal: c.nominal,
            loadedCount: loadedCount,
            acceptedCount: acceptedCount,
            issuedCount: issuedCount,
            droppedCount: droppedCount,
            balanceCount: finalCount,
            status: status
        });

        transactions.totalAccepted += acceptedCount * c.nominal;
        transactions.totalIssued += issuedCount * c.nominal;
        transactions.totalDropped += droppedCount * c.nominal;
    }

    transactions.totalRejected = random(0, 4);
    transactions.totalRetracted = random(0, 2);
    transactions.depositAccepted = random(10000, 110000);
    
    return transactions;
}


// // Функция для установки данных открытия (вызывается из openrecyclerdaycreens.js)
// function setOpeningDayData(data) {
//     openingDayData = data;
// }

// // Генерация случайных данных за рабочий день
// function generateDayTransactions(openingDayData) {
//     const transactions = {
//         cassettes: [],
//         totalAccepted: 0,
//         totalIssued: 0, 
//         totalDropped: 0,
//         totalRejected: 0, 
//         totalRetracted: 0,
//         depositAccepted: 0
//     };

//     const cassettes = [
//         { number: 1000, nominal: 100, loaded: openingDayData?.cassetteLoads[1] || 0 },
//         { number: 2000, nominal: 500, loaded: openingDayData?.cassetteLoads[2] || 0 },
//         { number: 3000, nominal: 1000, loaded: openingDayData?.cassetteLoads[3] || 0 },
//         { number: 4000, nominal: 5000, loaded: openingDayData?.cassetteLoads[4] || 0 }
//     ];

//     for (let i = 0; i < cassettes.length; i++) {
//         const c = cassettes[i];
//         const loadedNotes = c.loaded;  //banknotesCount - ключ loaded из массива cassettes. loadedNotes - количество банкнот, загруженных в кассету



//         // Если кассета пустая, все значения равны 0. 
//         if (loadedNotes === 0){
//             transactions.cassettes.push({
//                 number: c.number,
//                 nominal: c.nominal,
//                 loadedAmount: 0,
//                 acceptedAmount: 0, 
//                 issuedAmount: 0, 
//                 droppedAmount: 0, 
//                 balanceAmount: 0, 
//                 status: 0
//             });
//             continue;
//         }

//         //Функция для определения случайного количества выданных банкнот
//         function issuedNotes(min, max){
//              const minIssuedNotesQuantity = Math.ceil(min);
//              const maxIssuedNotesQuantity = Math.floor(max);    
//              return Math.floor(Math.random() * (maxIssuedNotesQuantity - minIssuedNotesQuantity + 1) + minIssuedNotesQuantity);
//         }

//         //Выдано банкнот из кассеты в течение операционного дня - случайное число
//         let issuedNotesQuantity; //= issuedNotes(1, 1999);

//         //Функция для определения случайного количества принятых в кассету банкнот
//         function acceptedNotes(min, max) {
//             const minacceptedNotesQuantity = Math.ceil(min);
//             const maxacceptedNotesQuantity = Math.floor(max);
//             return Math.floor(Math.random() * (maxacceptedNotesQuantity - minacceptedNotesQuantity + 1) + minacceptedNotesQuantity);
//         }
        
//         //Принято банкнот в кассету - случайное число
//         let acceptedNotesQuantity; //= acceptedNotes(1, 1999);

//         //Функция для определения случайного количества отбракованных банкнот
//         function droppedNotes (min, max) {
//             const minDroppedNotes = Math.ceil(min);
//             const maxDroppedNotes = Math.floor(max);
//             return Math.floor(Math.random() * (maxDroppedNotes - minDroppedNotes + 1) + minDroppedNotes);
//         }
        
//         // Отбраковано банк
//         let droppedNotesQuantity;
        
//         // Цикл подбора числа выданных и принятых банкнот
//         while(true) {
//             issuedNotesQuantity = issuedNotes(1, 1999);
//             acceptedNotesQuantity = acceptedNotes(1, 1999);
//             droppedNotesQuantity = droppedNotes(1, 10);
//             if (((loadedNotes + acceptedNotesQuantity) - issuedNotesQuantity - droppedNotesQuantity) <= 2000) {
//                 break;
//             }
//         }


//         // Итоговое количество банкнот в кассете
//         const finalBanknotes = loadedNotes + acceptedNotesQuantity - issuedNotesQuantity - droppedNotesQuantity;

//         const balanceAmount = finalBanknotes * c.nominal;

        
//         // Суммы остатков банкнот в кассетах
//         const loadedAmount = loadedNotes * c.nominal;
        
//         const acceptedAmount = acceptedNotesQuantity * c.nominal
        
//         const issuedAmount = issuedNotesQuantity * c.nominal;
//         const droppedAmount = droppedNotesQuantity * c.nominal;
      
        
//         // const remainingBanknotes = c.loaded - issuedBanknotes - droppedBanknotes + acceptedBanknotes;
//         const status = safeFinal < 300 ? 1 : 0;

//         //Банкноты в кассетах в штуках - это переделать! 
//         transactions.cassettes.push({
//             number: c.number,
//             nominal: c.nominal,
//             loadedCount: loadedNotes,              
//             acceptedCount: acceptedNotesQuantity,                         
//             issuedCount:  issuedNotesQuantity,                              
//             droppedCount: droppedNotesQuantity,
//             balanceCount: finalBanknotes,
//             status: status
//         });

//         transactions.totalAccepted += acceptedAmount;
//         transactions.totalIssued += issuedAmount;
//         transactions.totalDropped += droppedAmount;
//     }

//     transactions.totalRejected = Math.floor(Math.random() * 5);
//     transactions.totalRetracted = Math.floor(Math.random() * 3);
//     transactions.depositAccepted = Math.floor(Math.random() * 100000) + 10000;
    
//     return transactions;
// }

// // Функция для отображения чека закрытия
// function showCloseDayScreen() {
//     console.log('=== showCloseDayScreen: НАЧАЛО ===');

//     if (typeof isDayOpened === 'function' && !isDayOpened()) {
//         console.log('showCloseDayScreen: день не открыт, выход');
//         alert('Операционный день закрыт! Сначала откройте операционный день!');
//         return;
//     }
    
//     console.log('showCloseDayScreen: проверка isDayOpened пройдена');

//     // Если openingDayData нет, создаём из текущих данных (Возможно, это лишнее)
//     if (!openingDayData) {
//         console.log('showCloseDayScreen: openingDayData = null, выход');
//         let totalAmount = 0;
//         for (let i = 1; i <= 4; i++) {
//             if (cassetteLoads[i]) {
//                 const nominal = [100, 500, 1000, 5000][i-1];
//                 totalAmount += cassetteLoads[i] * nominal;
//             }
//         }
//         openingDayData = {
//             date: new Date().toLocaleDateString('ru-RU'),
//             time: new Date().toLocaleTimeString('ru-RU'),
//             cassetteLoads: { ...cassetteLoads },
//             totalAmount: totalAmount
//         };
//     }

//     //Генерируем данные за операционный день
//     const transactions = generateDayTransactions(openingDayData);


//     const receiptContent = document.getElementById('closeReceiptContent');
//     if (!receiptContent) return;

//     const now = new Date();
//     const currentDate = now.toLocaleDateString('ru-RU');
//     const currentTime = now.toLocaleTimeString('ru-RU');

//     let receiptHtml = '';
//     receiptHtml += '<div style="font-family: monospace; font-size: 12px;">';
//     receiptHtml += '<div style="text-align: center;">';
//     receiptHtml += '<strong>СБЕРБАНК РОССИИ ПАО</strong><br>';
//     receiptHtml += 'ОТДЕЛ СЕРВИСНОГО ОБСЛУЖИВАНИЯ<br>';
//     receiptHtml += 'Волгоградский пр-т д. 32 к. 45<br>';
//     receiptHtml += `ДАТА: ${currentDate} ВРЕМЯ: ${currentTime}<br>`;
//     receiptHtml += 'НОМЕР БАНКОМАТА: 10869631<br>';
//     receiptHtml += '--------------------------------<br>';
//     receiptHtml += '<strong>ЗАКРЫТИЕ ОПЕРАЦИОННОГО ДНЯ</strong><br>';
//     receiptHtml += `ВРЕМЯ ОТКРЫТИЯ: ${openingDayData.time} ${openingDayData.date}<br>`;
//     receiptHtml += '--------------------------------<br>';
//     receiptHtml += '</div>';

//     // Таблица
//     receiptHtml += '<table style="width: 100%; border-collapse: collapse; text-align: center;">';
//     receiptHtml += '<tr style="border: 1px solid #000;">';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">№</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ном</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Вал</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Загружено</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Принято</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Выдано</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Сбр</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">С</th>';
//     receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Остаток</th>';
//     receiptHtml += '</tr>';

//     for (let i=0; i<transactions.cassettes.length; i++) {
//         const c = transactions.cassettes[i];
//         receiptHtml += '<tr style="border: 1px solid #000;">';
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.number}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.nominal}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">643</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.loadedCount.toLocaleString()}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.acceptedCount.toLocaleString()}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.issuedCount.toLocaleString()}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.droppedCount.toLocaleString()}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.status}</td>`;
//         receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.balanceCount.toLocaleString()}</td>`;
//         receiptHtml += '</tr>';
//     }

//     // Депозит, Реджект, Ретракт
//     receiptHtml += '<tr style="border: 1px solid #000;">';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">Депозит</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${transactions.depositAccepted.toLocaleString()}</td>`;
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '</tr>';
    
//     receiptHtml += '<tr style="border: 1px solid #000;">';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">Реджект</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${transactions.totalRejected}</td>`;
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '</tr>';
    
//     receiptHtml += '<tr style="border: 1px solid #000;">';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">Ретракт</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${transactions.totalRetracted}</td>`;
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '<td style="border: 1px solid #000; padding: 4px;">-</td>';
//     receiptHtml += '</tr>';
    
//     receiptHtml += '</table>';

//     //Итоги
//     const totalBalance = openingDayData.totalAmount + transactions.depositAccepted + transactions.totalAccepted - transactions.totalIssued - transactions.totalDropped;

//     receiptHtml += '<div style="margin-top: 10px;">';
//     receiptHtml += '--------------------------------<br>';
//     receiptHtml += `<strong>Загружено: ${openingDayData.totalAmount.toLocaleString()} руб.</strong><br>`;
//     receiptHtml += `Принято: ${(transactions.totalAccepted + transactions.depositAccepted).toLocaleString()} руб.<br>`;
//     receiptHtml += `Выдано: ${transactions.totalIssued.toLocaleString()} руб.<br>`;
//     receiptHtml += `Сброшено: ${transactions.totalDropped.toLocaleString()} руб.<br>`;
//     receiptHtml += `Отбраковано: ${transactions.totalRejected} шт.<br>`;
//     receiptHtml += `Ретракт: ${transactions.totalRetracted} шт.<br>`;
//     receiptHtml += '--------------------------------<br>';
//     receiptHtml += `<strong>ОБЩИЙ БАЛАНС: ${totalBalance.toLocaleString()} руб.</strong><br>`;
//     receiptHtml += '--------------------------------<br>';
//     receiptHtml += '</div>';
    
//     receiptHtml += '</div>';
    
//     receiptContent.innerHTML = receiptHtml;

//     const closeReceiptScreen = document.getElementById('closeReceiptScreen');
//     if (closeReceiptScreen) {
//         closeReceiptScreen.style.display = 'block';
//     }
// }

// // Функция подтверждения чека закрытия
// function confirmCloseReceipt() {
//     const closeReceiptScreen = document.getElementById('closeReceiptScreen');
//     if (closeReceiptScreen) closeReceiptScreen.style.display = 'none';

//      // Сбрасываем флаг, что день открыт
//     if (typeof setDayOpened === 'function') {
//         setDayOpened(false);
//         console.log('Флаг сброшен, день закрыт');
//     }
//     // Сбрасываем счётчики
//     openingDayData = null;
//     console.log('openingDayData очищен');
    
//     // Сброс данных кассет
//     if (typeof resetAllInputFields === 'function') {
//         resetAllInputFields();
//     }
//     for (let i = 1; i <= 4; i++) {
//         if (typeof cassetteLoads !== 'undefined') {
//             cassetteLoads[i] = null;
//         }
//     }
//     console.log('Данные о загрузке очищены.');
//     // const supervisorScreen = document.getElementById('supervisorScreen');
//     // if (supervisorScreen) supervisorScreen.style.display = 'block';

//     // Возвращаемся на экран recyclerday. 
//     const recyclerday = document.getElementById('recyclerday');
//     if (recyclerday) {
//         recyclerday.style.display = 'block';
//     }
// }

// // Функция закрытия дня (вызывается из кнопки)
// // function closerecyclerday() {
// //     // Проверяем флаг через функцию из openrecyclerdaycreens.js
// //     if (typeof isDayOpened === 'function' && !isDayOpened()) {
// //         alert('Операционный день не был открыт! Сначала откройте операционный день.');
// //         return;
// //     }
// //     showCloseDayScreen();
// // }
