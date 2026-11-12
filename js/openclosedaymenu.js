
// function gotorecyclerday() {  // Эта функция, похоже, лишняя. Она дублируем функцию recyclerday. 
//     showRecyclerDayMenu();
// }

//Функция возврата в предыдущее меню
// function backtosupervisor() {
//     console.log('backtosupervisor вызвана')
//     showSupervisorMenu();
// }

//Функция возврата в предыдущее меню
function backtosupervisorScreen() {
    console.log('Функция previous вызвана');
    // showSupervisorMenu();
    const opencloseday = document.getElementById('opencloseday');
    const supervisorScreen = document.getElementById('supervisorScreen');

    if(opencloseday) opencloseday.style.display = 'none';
    if(supervisorScreen) supervisorScreen.style.display = 'block';
}

function backtonormal() {
    console.log('backtonormal вызвана');

    if (typeof checkTestAction === 'function') {
        if (!checkTestAction('backToNormalMode')) return;
    }
    
    // //Завершаем шаг в обучении
    // if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
    //     completeTrainingStep('backToNormalMode');
    // }
    // showMainMenu();
    backToWelcomeScreen();
}

function recyclerday() {
    // Проверка для режима тестирования
    if (typeof checkTestAction === 'function') {
        if (!checkTestAction('recycler')) return;
    }

     //====== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ======
    if (isTrainingMode) {
        completeTrainingStep('recycler');
    };

    showRecyclerDayMenu();
}

// Здесь нужно будет добавить функцию "Дополнительные операции"
function additionalOperations() {
    console.log('Вызвана функция additionalOperation');

    const opencloseday = document.getElementById('opencloseday');
    const additionalOperations = document.getElementById('additionalOperations');

    if (opencloseday) opencloseday.style.display = 'none';
    if (additionalOperations) additionalOperations.style.display = 'block';
}