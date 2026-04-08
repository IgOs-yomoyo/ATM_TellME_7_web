    // Массив для хранения загрузки кассет
    let cassetteLoads = {
        1: null,
        2: null,
        3: null,
        4: null
    }

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
            
            // Добавляем обработчик на ввод (только цифры)
            input.addEventListener('keydown', restrictInputToNumbers);
            
            // Добавляем обработчик на потерю фокуса (проверка лимита)
            input.addEventListener('blur', function() {
                validateLimit(this, cassetteNumber);
            });
            
            // Фокус на поле
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
        
        // Проверка, что поле не пустое
        // if (!value || value === '') {
        //     // alert('Пожалуйста, введите количество банкнот');
        //     input.focus();
        //     return;
        // }
        

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

    // Завершение открытия операционного дня
    function completeOpeningDay() {
        // Подсчёт итогов (можно убрать)
        let totalBanknotes = 0;
        let totalAmount = 0;
        
        for (let i = 1; i <= 4; i++) {
            if (cassetteLoads[i]) {
                totalBanknotes += cassetteLoads[i];
                totalAmount += cassetteLoads[i] * cassetteLimits[i].nominal;
            }
        }
        
        console.log(`Всего банкнот: ${totalBanknotes} шт.`);
        console.log(`Общая сумма: ${totalAmount.toLocaleString()} ₽`);

        showReceiptScreen();
        
        // // Показываем меню ресайклера
        // const recyclerday = document.getElementById('recyclerday');
        // if (recyclerday) recyclerday.style.display = 'block';
        // alert(`Операционный день успешно открыт!\nЗагружено банкнот: ${totalBanknotes} шт.\nНа сумму: ${totalAmount.toLocaleString()} ₽`);
    }

    // При показе экрана кассеты 1 - инициализируем поле ввода
    function showCassetteScreen(cassetteNumber) {
        const screen = document.getElementById(`replenishcassette_${cassetteNumber}`);
        if (screen) {
            screen.style.display = 'block';
            initInputField(cassetteNumber);
        }
    }

    // Функция для отображения чека открытия операционного дня
    function showReceiptScreen() {
        // Скрываем экран загрузки кассеты 4
        const replenishScreen4 = document.getElementById('replenishcassette_4');
        if (replenishScreen4) replenishScreen4.style.display = 'none';
    
        // Показываем экран чека
        const receiptScreen = document.getElementById('receiptScreen');
        if (receiptScreen) receiptScreen.style.display = 'block';
    
        // Формируем содержимое чека
        generateReceiptContent();
    }

    // Функция для генерации содержимого чека
    function generateReceiptContent() {
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
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">№</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ном</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Вал</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Заг</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Ост</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Выд</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">Сбр</th>';
    receiptHtml += '<th style="border: 1px solid #000; padding: 4px;">С</th>';
    receiptHtml += '</tr>';

    // Данные по кассетам
    let totalLoaded = 0;
    const cassettes = [
        { number: 1000, nominal: 100, loaded: cassetteLoads[1] || 0 },
        { number: 2000, nominal: 500, loaded: cassetteLoads[2] || 0 },
        { number: 3000, nominal: 1000, loaded: cassetteLoads[3] || 0 },
        { number: 4000, nominal: 5000, loaded: cassetteLoads[4] || 0 }
    ];

    for (let i = 0; i < cassettes.length; i++) {
        const c = cassettes[i];

        const loadedAmount = c.loaded * c.nominal;
    
        const maxDropped = Math.min(c.loaded, 2);
        // const banknotesCount = c.loaded / c.nominal;
        const dropped = c.loaded > 0 ? Math.floor(Math.random() * (maxDropped + 1)) : 0;

        const remainingBanknotes = c.loaded - dropped;

        const remainingAmount = remainingBanknotes * c.nominal;
        
        receiptHtml += '<tr>';
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.number}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${c.nominal}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">643</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${loadedAmount}</td>`;  // ← сумма загрузки
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${remainingAmount}</td>`; // ← остаток
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">-</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">${dropped}</td>`;
        receiptHtml += `<td style="border: 1px solid #000; padding: 4px;">0</td>`;
        receiptHtml += '</tr>';
        
        totalLoaded += loadedAmount;
    }

    receiptHtml += '</table>';
    receiptHtml += '<div style="text-align: center; font-family: monospace; margin-top: 10px;">';
    receiptHtml += '--------------------------------<br>';
    receiptHtml += `<strong>Всего загружено: ${totalLoaded} руб.</strong><br>`;
    receiptHtml += '--------------------------------<br>';
    receiptHtml += '</div>';

    receiptContent.innerHTML = receiptHtml;
}

    // Функция подтверждения чека и возврат в меню
    function confirmReceipt() {
        // Скрываем экран чека
        const receiptScreen = document.getElementById('receiptScreen');
        if (receiptScreen) receiptScreen.style.display = 'none';
    
        // Показываем меню оператора (или главное меню)
        const recyclerday = document.getElementById('recyclerday');
        if (recyclerday) recyclerday.style.display = 'block';
    
        // Сбрасываем данные кассет для следующего раза
        resetAllInputFields()
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