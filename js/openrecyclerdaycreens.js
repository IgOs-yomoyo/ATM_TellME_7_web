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
        if (!value || value === '') {
            // alert('Пожалуйста, введите количество банкнот');
            input.focus();
            return;
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
        // Подсчёт итогов
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
        
        // Показываем меню ресайклера
        const recyclerday = document.getElementById('recyclerday');
        if (recyclerday) recyclerday.style.display = 'block';
        alert(`Операционный день успешно открыт!\nЗагружено банкнот: ${totalBanknotes} шт.\nНа сумму: ${totalAmount.toLocaleString()} ₽`);
    }

    // При показе экрана кассеты 1 - инициализируем поле ввода
    function showCassetteScreen(cassetteNumber) {
        const screen = document.getElementById(`replenishcassette_${cassetteNumber}`);
        if (screen) {
            screen.style.display = 'block';
            initInputField(cassetteNumber);
        }
    }