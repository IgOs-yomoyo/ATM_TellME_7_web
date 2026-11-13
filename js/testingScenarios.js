// js/testingScenarios.js

const testingScenarios = [
    {
        id: 'normal_cycle',
        title: 'Стандартный цикл обслуживания',
        description: 'Банкомат работает. Выполните стандартные шаги обслуживания.',
        
        // Начальное состояние: банкомат работает, день открыт, экран welcome
        initialState: {
            isOperationalDayOpen: true,
            screen: 'welcomeScreen',
            ndcStatus: 'ok',
             // 👇 Эталонные значения для заявки
            cassetteLoads: {
            1: 1000, // кассета 1 (100 руб) - 1000 шт
            2: 1200, // кассета 2 (500 руб) - 1200 шт
            3: 700,  // кассета 3 (1000 руб) - 700 шт
            4: 800   // кассета 4 (5000 руб) - 800 шт
            }
        },

        // Шаги (пока просто для примера, потом свяжем с действиями)
        steps: [
            { id: 1, action: 'logoClick', message: 'Нажмите 5 раз на логотип OZON', expectedText: 'OZON'},
            { id: 2, action: 'enterOTP', message: 'Введите код инкассатора', expectedText: 'ВВОД'},
            { id: 3, action: 'getBalance', message: 'Нажмите кнопку "Получить баланс"', expectedText: 'ПОЛУЧИТЬ БАЛАНС'}, 
            { id: 4, action: 'closeBalanceReceipt', message: 'Нажмите "Меню инкассации" на экране', expectedText: 'МЕНЮ ИНКАССАЦИИ'},
            { id: 5, action: 'performCollection', message: 'Нажмите "Провести инкассацию"', expectedText: 'ПРОВЕСТИ ИНКАССАЦИЮ'},
            { id: 6, action: 'continueCollection', message: 'Нажмите "Продолжить"', expectedText: 'ПРОДОЛЖИТЬ'},
            { id: 7, action: 'switchToSupervisor', message: 'Переключите тумблер в SUPERVISOR', expectedText: 'SUPERVISOR'},
            { id: 8, action: 'loginInput', message: 'Введите код пользователя 100', expectedText: 'ВВОД'},
            { id: 9, action: 'passwordInput', message: 'Введите пароль 111111', expectedText: 'ВВОД'},
            { id: 10, action: 'openCloseDay', message: 'Нажмите "Открытие/закрытие операционного дня"', expectedText: 'ОТКРЫТИЕ/ЗАКРЫТИЕ'},
            { id: 11, action: 'additionalOperations', message: 'Нажмите "Дополнительные операции"', expectedText: 'ДОПОЛНИТЕЛЬНЫЕ ОПЕРАЦИИ'},
            { id: 12, action: 'resetHeldOption', message: 'Выберите "Сброс счётчика задержанных карт"', expectedText: 'СБРОС СЧЁТЧИКА ЗАДЕРЖАННЫХ КАРТ'},
            { id: 13, action: 'resetHeldCardCounter', message: 'Нажмите "ВЫБРАТЬ"', expectedText: 'ВЫБРАТЬ'},
            { id: 14, action: 'backToOpenCloseDayMenu', message: 'Нажмите "ВОЗВРАТ"', expectedText: 'ВОЗВРАТ'},
            { id: 15, action: 'recycler', message: 'Нажмите "Ресайклер"', expectedText: 'РЕСАЙКЛЕР'},
            { id: 16, action: 'closeRecyclerDay', message: 'Нажмите "Закрытие операционного дня"', expectedText: 'ЗАКРЫТИЕ ОПЕРАЦИОННОГО ДНЯ'},
            { id: 17, action: 'confirmCloseDay', message: 'Нажмите "ПОДТВЕРДИТЬ" (или "Закрыть день повторно")', expectedText: 'ПОДТВЕРДИТЬ'}, //Здесь нужно добавить "Закрыть день повторно"
            { id: 18, action: 'openSafeDoor', message: 'Откройте дверь сейфа' },
            { id: 19, action: 'replaceCassettes', message: 'Замените кассеты' },
            { id: 20, action: 'closeSafeDoor', message: 'Закройте дверь сейфа' },
            { id: 21, action: 'openDay', message: 'Открытие операционного дня', expectedText: 'ОТКРЫТИЕ ОПЕРАЦИОННОГО'},
            { id: 22, action: 'enterNoOfNotes_1', message: 'Введите количество банкнот в кассету 1', expectedText: 'ВВОД'},
            { id: 23, action: 'enterNoOfNotes_2', message: 'Введите количество банкнот в кассету 2', expectedText: 'ВВОД' },
            { id: 24, action: 'enterNoOfNotes_3', message: 'Введите количество банкнот в кассету 3', expectedText: 'ВВОД' },
            { id: 25, action: 'enterNoOfNotes_4', message: 'Введите количество банкнот в кассету 4', expectedText: 'ВВОД' },
            { id: 26, action: 'backToNormalMode', message: 'Переключите тумблер в NORMAL и нажмите "В режим обслуживания клиентов"' },
            { id: 27, action: 'logoClick', message: 'Снова нажмите 5 раз на логотип OZON' },
            { id: 28, action: 'enterOTP', message: 'Введите OTP-код' },
            { id: 29, action: 'getBalance', message: 'Нажмите "Получить баланс"' },
            { id: 30, action: 'exitButton', message: 'Нажмите "Выход" на чеке' },
            { id: 31, action: 'diagnosticComplete', message: 'Нажмите 4-5-6 для диагностики' },
            { id: 32, action: 'toAppMainMenu', message: 'Нажмите "В ГЛАВНОЕ МЕНЮ"' }
        ]
    }
];