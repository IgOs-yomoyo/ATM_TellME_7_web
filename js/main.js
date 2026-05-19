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


// Функция для генерации содержимого чека (общая для баланса и инкассации)
// использует данные из openingDayData или cassetteLoads
function generateReceiptContentForScreen(receiptContentId) {
    const receiptContent = document.getElementById(receiptContentId);
    if (!receiptContent) return;
    
    // Получаем данные дня (если день не открыт, то нули)
    let totalLoaded = 0;
    const cassettes = [
        { number: 1000, nominal: 100, loaded: (typeof cassetteLoads !== 'undefined' && cassetteLoads[1]) || 0 },
        { number: 2000, nominal: 500, loaded: (typeof cassetteLoads !== 'undefined' && cassetteLoads[2]) || 0 },
        { number: 3000, nominal: 1000, loaded: (typeof cassetteLoads !== 'undefined' && cassetteLoads[3]) || 0 },
        { number: 4000, nominal: 5000, loaded: (typeof cassetteLoads !== 'undefined' && cassetteLoads[4]) || 0 }
    ];
    
    // Простой расчёт суммы загрузки (без случайных принятых/выданных)
    for (let i = 0; i < cassettes.length; i++) {
        totalLoaded += cassettes[i].loaded * cassettes[i].nominal;
    }
    
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
    receiptHtml += '</div>';
    
    // Таблица (упрощённая, без принято/выдано/сбр)
    receiptHtml += '<table style="width: 100%; border-collapse: collapse; text-align: center;">';
    receiptHtml += '<tr style="border: 1px solid #000;">';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">№</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ном</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Вал</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Загружено</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Остаток</th>';
    receiptHtml += '</tr>';
    
    for (let i = 0; i < cassettes.length; i++) {
        const c = cassettes[i];
        const loadedAmount = c.loaded * c.nominal;
        // Остаток пока равен загруженному (без учёта принятых/выданных – для баланса это нормально)
        const remainingAmount = loadedAmount;
        receiptHtml += '<tr style="border: 1px solid #000;">';
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.number}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.nominal}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">643</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${loadedAmount.toLocaleString()}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${remainingAmount.toLocaleString()}</td>`;
        receiptHtml += '</tr>';
    }
    receiptHtml += '</table>';
    receiptHtml += '<div style="margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>ОБЩАЯ СУММА: ${totalLoaded.toLocaleString()} руб.</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';
    receiptHtml += '</div>';
    
    receiptContent.innerHTML = receiptHtml;
}

function showBalanceReceipt() {
    // Скрываем меню инкассации
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';
    // Генерируем чек
    generateReceiptContentForScreen('balanceReceiptContent');
    // Показываем экран чека баланса
    const balanceScreen = document.getElementById('balanceReceiptScreen');
    if (balanceScreen) balanceScreen.style.display = 'block';
}

function closeBalanceReceipt() {
    const balanceScreen = document.getElementById('balanceReceiptScreen');
    if (balanceScreen) balanceScreen.style.display = 'none';
    // Возвращаемся в меню инкассации
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'block';
}

function showCollectionReceipt() {
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';
    generateReceiptContentForScreen('collectionReceiptContent');
    const collectionScreen = document.getElementById('collectionReceiptScreen');
    if (collectionScreen) collectionScreen.style.display = 'block';
}

function closeCollectionReceipt() {
    const collectionScreen = document.getElementById('collectionReceiptScreen');
    if (collectionScreen) collectionScreen.style.display = 'none';
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'block';
}

function exitCollectionScreen(){
    const mainScreen = document.getElementById('mainScreen');
    if (mainScreen) mainScreen.style.display = 'none';
    const outOfServiceScreen = document.getElementById('outOfServiceScreen');
    if (outOfServiceScreen) outOfServiceScreen.style.display = 'block';
}

// Обновляем кнопки в mainScreen
function getBalance() {
    showBalanceReceipt();
}

function performCollection() {
    showCollectionReceipt();
}


// exitCollectionScreen()

//<script>
        // Функции переключения экранов
        // function showMainMenu() {
        //     document.getElementById('mainScreen').style.display = 'block';
        //     document.getElementById('supervisorScreen').style.display = 'none';
        // }

        // function showSupervisorMenu() {
        //     document.getElementById('mainScreen').style.display = 'none';
        //     document.getElementById('supervisorScreen').style.display = 'block';
        // }

        // // Функции главного меню
        // function initCassettes() {
        //     alert("Инициализация кассет выполнена!");
        // }

        // function recyclCollection() {
        //     alert("Инкассация ресайклера выполнена!");
        // }

        // function exitApp() {
        //     if (confirm("Вы уверены, что хотите выйти?")) {
        //         document.body.innerHTML = '<div style="text-align:center; margin-top:50px;"><h1>🔌 Банкомат выключен</h1><button onclick="location.reload()">Включить</button></div>';
        //     }
        // }

        // Функции меню оператора
        // function shutdownATM() {
        //     if (confirm("Выключить банкомат?")) {
        //         alert("Банкомат выключается...");
        //     }
        // }

        // function deviceStatus() {
        //     alert("Состояние устройств:\n- Кассеты: OK\n- Принтер: OK\n- Дисплей: OK");
        // }

        // function openCloseDay() {
        //     alert("Открытие/закрытие операционного дня");
        // }
    // </script>