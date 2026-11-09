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
            ndcStatus: 'ok'
        },

        // Шаги (пока просто для примера, потом свяжем с действиями)
        steps: [
            { id: 1, action: 'logoClick', message: 'Нажмите 5 раз на логотип OZON' },
            { id: 2, action: 'enterOTP', message: 'Введите код инкассатора' },
            { id: 3, action: 'getBalance', message: 'Нажмите кнопку "Получить баланс"'}, 
            { id: 4, action: 'closeBalanceReceipt', message: 'Нажмите "Меню инкассации" на экране'},
            { id: 5, action: 'performCollection', message: 'Нажмите "Провести инкассацию"' },
            { id: 6, action: 'continueCollection', message: 'Нажмите "Продолжить"' },
            { id: 7, action: 'switchToSupervisor', message: 'Переключите тумблер в SUPERVISOR' },
            { id: 8, action: 'loginInput', message: 'Введите код пользователя 100' },
            { id: 9, action: 'passwordInput', message: 'Введите пароль 111111' }
            // ... остальные шаги добавим позже
        ]
    }
];