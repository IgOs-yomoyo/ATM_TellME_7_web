
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
    
    // //Завершаем шаг в обучении
    // if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
    //     completeTrainingStep('backToNormalMode');
    // }
    // showMainMenu();
    backToWelcomeScreen();
}

function recyclerday() {

     //====== ПРОВЕРКА ДЛЯ РЕЖИМА ОБУЧЕНИЯ ======
    if (isTrainingMode) {
        completeTrainingStep('recycler');
    };

    showRecyclerDayMenu();
}

// Здесь нужно будет добавить функцию "Дополнительные операции"