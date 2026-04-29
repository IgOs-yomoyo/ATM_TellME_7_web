    // Массив для хранения загрузки кассет
    let cassetteLoads = {
        1: null,
        2: null,
        3: null,
        4: null
    }

    //Сброшенные банкноты. Глобальная переменная. Теперь её нужно использовать в closerecyclerday.js. 
    // let openingDroppedData = {1: 0, 2: 0, 3: 0, 4: 0}; //Пока закомментирую. Считаю, что это лишняя переменная. 

    // Ограничения по кассетам
    const cassetteLimits = {
        1: { nominal: 100, maxBanknotes: 2000, number: '001' },
        2: { nominal: 500, maxBanknotes: 2000, number: '002' },
        3: { nominal: 1000, maxBanknotes: 2000, number: '003' },
        4: { nominal: 5000, maxBanknotes: 2000, number: '004' }
    }

    // Функция для ограничения ввода (только цифры)
    function restrictInputToNumbers(event) {
        // Разрешаем: цифры, Backspace, Delete, Tab, Escape, Enter, стрелки
        const key = event.key;
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 
            'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        
        if (allowedKeys.includes(key)) {
            return; // Разрешаем служебные клавиши
        }
        
        // Проверяем, что введённый символ - цифра
        if (!/^\d$/.test(key)) {
            event.preventDefault(); // Блокируем ввод
            return false;
        }
    }

    // Функция для проверки лимита (не больше 2000)
    function validateLimit(input, cassetteNumber) {
        let value = parseInt(input.value);
        const maxLimit = cassetteLimits[cassetteNumber].maxBanknotes;
        
        if (!isNaN(value) && value > maxLimit) {
            input.value = ''; // Очищаем поле
            alert(`Количество банкнот не может превышать ${maxLimit} шт.`);
            return false;
        }
        return true;
    }

    // Инициализация полей ввода при загрузке экрана
    function initInputField(cassetteNumber) {
        const input = document.getElementById(`LoadInput_${cassetteNumber}`);
        if (input) {
            // Очищаем поле
            input.value = '';
 
         // Создаём функцию для blur
            function handleBlur() {
                validateLimit(input, cassetteNumber);
            }

            // Удаляем старые обработчики, чтобы не накапливать
            input.removeEventListener('keydown', restrictInputToNumbers);
            input.removeEventListener('blur', handleBlur);
            
            // Добавляем обработчик на ввод (только цифры)
            input.addEventListener('keydown', restrictInputToNumbers);
            input.addEventListener('blur', handleBlur);

            // Устанавливаем фокус на поле
            input.focus();
        }
    }
            

    // Функция возврата в меню "Операционный день ресайклера" из любого экрана пополнения кассет
    function Cancel(cassetteNumber) {
        // Очищаем сохранённые данные
        for (let i = 1; i <= 4; i++) {
            cassetteLoads[i] = null;
            // Очищаем поле ввода, если в нём что-то есть
            const input = document.getElementById(`LoadInput_${i}`);
            if (input) {
                input.value = '';
            }
        
        
        // Скрываем все экраны пополнения кассет - то есть переходим на экран открытия опер дня
        for (let i = 1; i <= 4; i++) {
            const screen = document.getElementById(`replenishcassette_${i}`);
            if (screen) screen.style.display = 'none';
        }
    }
        

        // Показываем меню ресайклера
        const recyclerday = document.getElementById('recyclerday');
        if (recyclerday) recyclerday.style.display = 'block';
    }

    // Функция "Обнулить"
    function Reset(cassetteNumber) {
        const input = document.getElementById(`LoadInput_${cassetteNumber}`);
        if (input) {
            input.value = '';
            input.focus();
            console.log(`Кассета ${cassetteNumber}: ${input.value} шт.`);
        }
    }

    // Функция "Ввод" - переход к следующему экрану
    function Enter(cassetteNumber) {
        const input = document.getElementById(`LoadInput_${cassetteNumber}`);
        let value = input ? input.value : '';
        
       
        // Если поле пустое, то это 0
        if (!value || value === '') {
            value = '0';
        }

        let numValue = parseInt(value);
        
        // Проверка на число
        if (isNaN(numValue)) {
            // alert('Пожалуйста, введите число');
            input.value = '';
            input.focus();
            return;
        }
        
        // Проверка лимита
        if (numValue > cassetteLimits[cassetteNumber].maxBanknotes) {
            alert(`Количество банкнот не может превышать ${cassetteLimits[cassetteNumber].maxBanknotes} шт.`);
            input.value = '';
            input.focus();
            return;
        }
        
        // Сохраняем данные
        cassetteLoads[cassetteNumber] = numValue;
        console.log(`Кассета ${cassetteNumber}: ${numValue} шт. номиналом ${cassetteLimits[cassetteNumber].nominal} ₽`);
        console.log('Все данные:', cassetteLoads);
        
        // Скрываем текущий экран
        const currentScreen = document.getElementById(`replenishcassette_${cassetteNumber}`);
        if (currentScreen) currentScreen.style.display = 'none';
        
        if (cassetteNumber < 4) {
            // Показываем следующий экран
            const nextScreen = document.getElementById(`replenishcassette_${cassetteNumber + 1}`);
            if (nextScreen) nextScreen.style.display = 'block';
            // Инициализируем поле ввода на следующем экране
            initInputField(cassetteNumber + 1);
        } else {
            // Все 4 кассеты загружены - завершаем открытие дня
            completeOpeningDay();
        }
    }

    // Флаг, что день открыт
    let isOperationalDayOpen = false;

    // Функция для проверки статуса опер дня
    function isDayOpened() {
        return isOperationalDayOpen;
    }

    // Функция для установки статуса опер дня
    function setDayOpened(status) {
        isOperationalDayOpen = status;
        console.log(`setDayOpened: день ${status ? 'ОТКРЫТ' : 'ЗАКРЫТ'}`);
    }

    // Завершение открытия операционного дня. Функция completeOpeningDay. Она используется в функции Enter. 
    function completeOpeningDay() {
        // Подсчёт итогов (можно убрать)
        // let totalLoaded = 0; // Это лишняя переменная. Общее количество загруженных банкнот нам не нужно. 
        let totalAmount = 0;
        let dropped = {1: 0, 2: 0, 3: 0, 4: 0};
        let totalDroppedAmount = 0; //Не факт, что эта переменная нужна. Нужно посмотреть.

        
        for (let i = 1; i <= 4; i++) {
            if (cassetteLoads[i]) {
                // totalLoaded += cassetteLoads[i];
                totalAmount += cassetteLoads[i] * cassetteLimits[i].nominal;
                dropped[i] = (cassetteLoads[i] === 0) ? 0 : Math.floor(Math.random() * 3) + 1;
                totalDroppedAmount += dropped[i] * cassetteLimits[i].nominal;
            }
        }

        // Сохраняем данные открытия дня
        const openingData = {
        date: new Date().toLocaleDateString('ru-RU'),
        time: new Date().toLocaleTimeString('ru-RU'),
        cassetteLoads: { ...cassetteLoads },
        dropped: {...dropped},
        totalAmount: totalAmount,
        totalDroppedAmount: totalDroppedAmount
    };

    console.log(`openingData:`, openingData);

    console.log(`=== openingData ===`);
    console.log(`dropped:`, openingData.dropped);
    console.log(`cassetteLoads:`, openingData.cassetteLoads);
    console.log(`totalAmount:`, openingData.totalAmount);
    console.log(`totalDropped:`, openingData.totalDroppedAmount);
        
        // Передаём данные в closerecyclerday.js
        if (typeof setOpeningDayData === 'function') {
            setOpeningDayData(openingData);
        }

        // Показываем чек
        showReceiptScreen(openingData);

    }

    // При показе экрана кассеты - инициализируем поле ввода
    function showCassetteScreen(cassetteNumber) {
        const screen = document.getElementById(`replenishcassette_${cassetteNumber}`);
        if (screen) {
            screen.style.display = 'block';
            console.log(`2. Экран отображён, display: ${screen.style.display}`);
        
            
        
            const delay = (cassetteNumber === 1) ? 5000 : 100;
            console.log(`Задержка ${delay} мс для кассеты ${cassetteNumber}`);
        
            setTimeout(function() {
                
                const input = document.getElementById(`LoadInput_${cassetteNumber}`);
                
                if (input) {
                    
                    input.removeAttribute('readonly');
                    input.tabIndex = 0;
                    input.style.display = 'inline-block';
                    input.style.visibility = 'visability';
                    input.style.pointerEvents = 'auto';
                    input.focus();
                    // input.select();
                    
                    //Если фокус всё равно не на поле, принудительно устанавливаем через setTimeout
                    if (document.activeElement !== input) {
                        setTimeout(function() {
                            input.focus();
                            console.log('Повторная попытка фокуса');
                        }, 50);
                    }
                
                    console.log(`Фокус на кассете ${cassetteNumber}, activeElement:`, document.activeElement);
                }
            }, delay);
        }
    }

    // input.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', bubbles: true}));

    // Функция для отображения чека открытия операционного дня
    function showReceiptScreen(openingData) {
        // Скрываем экран загрузки кассеты 4
        const replenishScreen4 = document.getElementById('replenishcassette_4');
        if (replenishScreen4) replenishScreen4.style.display = 'none';
    
        // Показываем экран чека
        const receiptScreen = document.getElementById('receiptScreen');
        if (receiptScreen) receiptScreen.style.display = 'block';
    
        // Формируем содержимое чека
        generateReceiptContent(openingData);
    }

    // Функция для генерации содержимого чека
    function generateReceiptContent(openingData) {
        const receiptContent = document.getElementById('receiptContent');
        if (!receiptContent) return;
    
        // Получаем текущую дату и время
        const now = new Date();
        const currentDate = now.toLocaleDateString('ru-RU');
        const currentTime = now.toLocaleTimeString('ru-RU');
    
        // Формируем чек
        let receiptHtml = '';
        receiptHtml += '<div style="text-align: center; font-family: monospace;">';
        receiptHtml += 'БАНК<br>';
        receiptHtml += 'Волгоградский проспект 32 к45<br>';
        receiptHtml += '--------------------------------<br>';
        receiptHtml += `Дата: ${currentDate}<br>`;
        receiptHtml += '--------------------------------<br>';
        receiptHtml += `Время: ${currentTime}<br>`;
        receiptHtml += '--------------------------------<br>';
        receiptHtml += 'Номер банкомата: 10869631<br>';
        receiptHtml += '--------------------------------<br>';
        receiptHtml += '<strong>Открытие операционного дня ресайклера</strong><br>';
        receiptHtml += '--------------------------------<br>';
        receiptHtml += '</div>';
        
// Таблица
    receiptHtml += '<table style="width: 100%; font-family: monospace; font-size: 12px; border-collapse: collapse; text-align: center;">';
    receiptHtml += '<tr>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Кас №</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ном</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Вал</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Заг</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Выд</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Прин</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Сбр</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ост</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">С</th>';
    receiptHtml += '</tr>';

    // Данные по кассетам
    // let totalLoaded = 0;
    const cassettes = [
        { number: 1000, nominal: 100, loaded: cassetteLoads[1] || 0, index: 1},
        { number: 2000, nominal: 500, loaded: cassetteLoads[2] || 0, index: 2}, 
        { number: 3000, nominal: 1000, loaded: cassetteLoads[3] || 0, index: 3},
        { number: 4000, nominal: 5000, loaded: cassetteLoads[4] || 0, index: 4}
    ];

    // function completeOpeningDay() {
    //     // Подсчёт итогов (можно убрать)
    //     // let totalLoaded = 0; // Это лишняя переменная. Общее количество загруженных банкнот нам не нужно. 
    //     let totalAmount = 0;
    //     let dropped = {1: 0, 2: 0, 3: 0, 4: 0};
    //     let totalDroppedAmount = 0; //Не факт, что эта переменная нужна. Нужно посмотреть.

        
    //     for (let i = 1; i <= 4; i++) {
    //         if (cassetteLoads[i]) {
    //             // totalLoaded += cassetteLoads[i];
    //             totalAmount += cassetteLoads[i] * cassetteLimits[i].nominal;
    //             dropped[i] = (cassetteLoads[i] === 0) ? 0 : Math.floor(Math.random() * 3) + 1;
    //             totalDroppedAmount += dropped[i] * cassetteLimits[i].nominal;
    //         }
    //     }

    //     // Сохраняем данные открытия дня
    //     const openingData = {
    //     date: new Date().toLocaleDateString('ru-RU'),
    //     time: new Date().toLocaleTimeString('ru-RU'),
    //     cassetteLoads: { ...cassetteLoads },
    //     dropped: {...dropped},
    //     totalAmount: totalAmount,
    //     totalDroppedAmount: totalDroppedAmount
    

    let totalLoaded = 0; //Загруженная сумма общая
    let totalDroppedAmount = 0;
    
    // строка 142 cassetteLoads - данные о загрузке кассет. 
    for (let i = 0; i < cassettes.length; i++) {
        const c = cassettes[i];

        const loadedAmount = c.loaded * c.nominal;
        const droppedNotes = openingData?.dropped[c.index] || 0;
        const droppedAmount = droppedNotes * c.nominal;
        const remainingBanknotes = c.loaded - droppedNotes; //dropped не определена. 
        const remainingAmount = remainingBanknotes * c.nominal;
        const issued = 0;  // При открытии опер дня выдано 0
        const accepted = 0;   // При загрузке принято 0
        
        
        // Статус кассеты. Логику добавим позже
        const status = 0;
        

        receiptHtml += '<tr style="border: 1px solid #000;">';
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.number}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.nominal}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">643</td>`;      // Валюта
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${loadedAmount}</td>`;  // Загружено ${loadedAmount.toLocaleString()}</td>
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${accepted}</td>`;  // Принято
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${issued}</td>`;    // Выдано
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${droppedNotes}</td>`;   // Сбр
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.loaded - droppedNotes}</td>`; // Остаток {remainingAmount.toLocaleString()}
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${status}</td>`;    // С    receiptHtml += '</tr>';
        
        totalLoaded += loadedAmount;
        totalDroppedAmount += droppedAmount
    }

    receiptHtml += '</table>';
    receiptHtml += '<div style="text-align: left; font-family: monospace; margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Всего загружено: ${totalLoaded} руб.</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';

    // receiptContent.innerHTML = receiptHtml;


   // Депозит, Реджект, Ретракт (вертикально)
    receiptHtml += '<div style="margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '<strong>Депозит:</strong> 0 руб.<br>';
    receiptHtml += '<strong>Реджект:</strong> 0 шт.<br>';
    receiptHtml += '<strong>Ретракт:</strong> 0 шт.<br>';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';

    //  Итоговые данные
    receiptHtml += '<div style="margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Загружено: ${totalLoaded.toLocaleString()} руб.</strong><br>`;
    receiptHtml += `Принято: 0 руб.<br>`;
    receiptHtml += `Выдано: 0 руб.<br>`;
    receiptHtml += `Сброшено: ${totalDroppedAmount.toLocaleString()}<br>`;
    receiptHtml += `Отбраковано: 0 руб.<br>`;
    receiptHtml += `Ретракт: 0 руб.<br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '<strong>Принято в депозитную кассету</strong><br>';
    receiptHtml += '0 руб.<br>';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';
    
    receiptHtml += '</div>';

    receiptContent.innerHTML = receiptHtml;
}
    

    // Функция подтверждения чека и возврат в меню
    function confirmReceipt() {
        // Скрываем экран чека
        const receiptScreen = document.getElementById('receiptScreen');
        if (receiptScreen) receiptScreen.style.display = 'none';
        
        // Попробуем вставить сюда флаг открытия опер дня
        if (typeof setDayOpened === 'function') {
            setDayOpened(true);
        }


        // Показываем меню оператора (или главное меню)
        const recyclerday = document.getElementById('recyclerday');
        if (recyclerday) recyclerday.style.display = 'block';
    
        // Сбрасываем данные кассет для следующего раза
        resetAllInputFields();
        // for (let i = 1; i <= 4; i++) {
        //     cassetteLoads[i] = null;
        // }
    }

    function resetAllInputFields() {
            for (let i = 1; i <= 4; i++) {
                const input = document.getElementById(`LoadInput_${i}`);
                if (input) {
                    input.value = '';
                }
            }
    }