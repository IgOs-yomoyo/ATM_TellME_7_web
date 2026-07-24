// Глобальная переменная для хранения сгенерированного количества задержанных карт. 
let heldCardsCount = 0;
//Проверка состояния счётчик - сбрасывался/не сбрасывался. 
let isCounterReset = false; //Флаг, был ли уже сброс в текущем опер дне. 

//<button id="takeReceiptBtn" class="atm-button" style="display: none;" onclick="takeHeldCardReceipt()">ЗАБРАТЬ ЧЕК</button>

function additionalOperations() {
    console.log('additionalOperations вызвана');

    //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
    if (isTrainingMode) {
        completeTrainingStep('additionalOperations');
    }

    // Скрываем экран opencloseday.
    const opencloseday = document.getElementById('opencloseday');
    if (opencloseday) opencloseday.style.display = 'none';

    // Показываем экран additionaloperations
    const additionalOperations = document.getElementById('additionalOperations');
    if (additionalOperations) additionalOperations.style.display = 'block';

    //Прячем кнопку Забрать чек
    const takeReceiptBtn = document.getElementById('takeReceiptBtn');
    console.log('takeReceiptBtn найдена:', takeReceiptBtn);
    if(takeReceiptBtn) takeReceiptBtn.style.display = 'none';
    
}


function resetHeldCardCounter() {
    console.log('resetHeldCardCounter вызвана');
    console.log('isTrainingMode:', isTrainingMode);
    console.log('currentStepIndex:', currentStepIndex);
    console.log('Текущий шаг:', trainingSteps[currentStepIndex]);

    if (isCounterReset) {
        heldCardsCount = 0;
        console.log('Сброс уже был выполнен. Задержанных карт 0');
    }else{
        heldCardsCount = Math.floor(Math.random() * 5);
        isCounterReset = true;
        console.log('HeldCardsCount', heldCardsCount);
    }
    

    //Формируем содержание чека
    const heldCardReceiptContent = document.getElementById('heldCardReceiptContent');
    if (heldCardReceiptContent) {
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
        receiptHtml += '<strong>ЗАДЕРЖАННЫЕ КАРТЫ</strong><br>';
        receiptHtml += '--------------------------------<br>';
        receiptHtml += '</div>';
        
        receiptHtml += '<div style="text-align: center; margin-top: 30px;">';
        receiptHtml += `<div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Задержано карт: ${heldCardsCount}</div>`;
        
        // Если есть задержанные карты, показываем их список
        if (heldCardsCount > 0) {
            receiptHtml += '<table style="width: 100%; border-collapse: collapse; text-align: center; margin-top: 20px;">';
            receiptHtml += '<tr style="border: 1px solid #000;">';
            receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">№</th>';
            receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Номер карты</th>';
            receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Тип</th>';
            receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Причина</th>';
            receiptHtml += '</tr>';
            
            const cardTypes = ['Visa', 'MasterCard', 'МИР'];
            const reasons = ['Просрочена', 'Утеряна', 'Заблокирована', 'Неверный PIN'];
            
            for (let i = 0; i < heldCardsCount; i++) {
                const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
                const reason = reasons[Math.floor(Math.random() * reasons.length)];
                const cardNumber = '**** ' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                
                receiptHtml += '<tr style="border: 1px solid #000;">';
                receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${i + 1}</td>`;
                receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${cardNumber}</td>`;
                receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${cardType}</td>`;
                receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${reason}</td>`;
                receiptHtml += '</tr>';
            }
            receiptHtml += '</table>';
        }
        
        receiptHtml += '</div>';
        receiptHtml += '<div style="margin-top: 30px;">';
        receiptHtml += '--------------------------------<br>';
        receiptHtml += '</div>';
        receiptHtml += '</div>';
        
        heldCardReceiptContent.innerHTML = receiptHtml;
        
    }

    // Прячем кнопки, показываем чек - просто показываем чек, ничего не прячем!
     const receiptContainer = document.getElementById('receiptContainer');
    //  const takeReceiptButton = document.querySelector('.take-receipt-btn');
     if (receiptContainer) receiptContainer.style.display = 'block';
    //  if (takeReceiptButton) takeReceiptButton.style.display = 'block';

    // Показываем ТОЛЬКО нужную кнопку (для задержанных карт)
    const takeReceiptBtn = document.getElementById('takeReceiptBtn');
    console.log('takeReceiptBtn найден:', takeReceiptBtn);
    if (takeReceiptBtn) {
        takeReceiptBtn.style.display = 'block';
        console.log('display установлен в block');
    } else {
        console.log('takeReceiptBtn НЕ НАЙДЕН');
    }


    // console.log('Кнопка должна быть видна');
     
    //=== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ===
    if (isTrainingMode) {
        completeTrainingStep('resetHeldCardCounter'); }
    
}

// Скрываем чек, показываем кнопки (просто скрываем чек)
function takeHeldCardReceipt() {
    const receiptContainer = document.getElementById('receiptContainer');
    const additionalOperations = document.getElementById('additionalOperations');
    const takeReceiptBtn = document.getElementById('takeReceiptBtn');
    if (receiptContainer) receiptContainer.style.display = 'none';
    if (takeReceiptBtn) takeReceiptBtn.style.display = 'none';
    if (additionalOperations) additionalOperations.style.display = 'block';
}


function backToOpenCloseDay() {
    const additionalOperations = document.getElementById('additionalOperations');
    if (additionalOperations) additionalOperations.style.display = 'none';

    const opencloseday = document.getElementById('opencloseday');
    if (opencloseday) opencloseday.style.display = 'block';
}

