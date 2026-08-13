
console.log('cassettesreplacement.js начал загрузку');

function showCassettesReplacmentScreen() {
    console.log('showCassettesReplacmentScreen вызвана');

    //Скрываем все экраны
    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });

    //Показываем экран замены кассет
    const cassettesreplacementScreen = document.getElementById('cassettesReplacmentScreen');
    if (cassettesReplacmentScreen) {
        cassettesReplacmentScreen.style.display = 'block';
        console.log('Показан экран Замена кассет');
        resetSafeButtons();

        if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {  
            console.log('Вызываем showTrainingStep для обновления подсветки');
            showTrainingStep(currentStepIndex);
        }
    } else {
        console.error('Экран cassettesReplacmentScreen не найден');
    }
}

//         const openBtn = document.querySelector('.openSafeDoor');
//         const replaceBtn = document.querySelector('.replaceCassettes');
//         const closeBtn = document.querySelector('.closeSafeDoor');

//         if (openBtn) openBtn.style.display = 'block';
//         if (replaceBtn) replaceBtn.style.display = 'none';
//         if (closeBtn) closeBtn.style.display = 'none';

//         console.log ('Кнопки: открыть - активна, заменить - не активна, закрыть - не активна');
//     } else {
//         console.error('Экран cassettesReplacmentScreen не найден!');
//     }
// }

//         //Сбрасываем состояние кнопок
//         resetSafeButtons();

//     } else {
//         console.error('Экран cassettesReplacmentScreen не найден');
//     }
// }

console.log('cassettesreplacement.js загружен');

// Функция сброса состояния кнопок
function resetSafeButtons() {
    console.log('resetSafeButtons вызвана');

    const openBtn = document.querySelector('.openSafeDoor');
    const replaceBtn = document.querySelector('.replaceCassettes');
    const closeBtn = document.querySelector('.closeSafeDoor');

     // Все кнопки видимы, но не активны
    [openBtn, replaceBtn, closeBtn].forEach(btn => {
        if (btn) {
            btn.classList.remove('active', 'training-highlight');
            btn.classList.add('inactive');
            btn.style.display = 'block';
            btn.style.opacity = '';       //Что это такое, непонятно. 
            btn.style.pointerEvents = '';
        }
    });

    // Активна только кнопка ОТКРЫТЬ
    if (openBtn) {
        openBtn.classList.remove('inactive');
        openBtn.classList.add('active');
        console.log('Кнопка "ОТКРЫТЬ" активна');
    }
}

//     //Обновляем состояние в глобальной переменной
//     if (window.safeState) {
//         window.safeState.isOpen = false;
//         window.safeState.areCassettesReplaced = false;
//         window.safeState.isClosed = false;
//         window.safeState.currentStep = 'open';
//     }
// }

//Функция активации следующей кнопки
// function activateNextButton(currentAction) {

//     const openBtn = document.querySelector('.openSafeDoor');
//     const replaceBtn = document.querySelector('.replaceCassettes');
//     const closeBtn = document.querySelector('.closeSafeDoor');

//     // //Деактивируем все
//     [openBtn, replaceBtn, closeBtn].forEach(btn => {
//         if (btn) {
//             btn.classList.remove('active');
//             btn.classList.add('inactive');
//         }
//     });

//     //Активируем нужную
//     if (currentAction === 'open' && replaceBtn) {
//         if (replaceBtn) {
//             replaceBtn.classList.remove('inactive');
//             replaceBtn.classList.add('active');
//             console.log('Кнопка "Заменить кассеты" активна');
//         }
//     }else if (currentAction === 'replace' &&  closeBtn) {
//             closeBtn.classList.remove('inactive');
//             closeBtn.classList.add('active');
//             console.log('Кнопка "ЗАКРЫТЬ" активна');
//         }
// }

//Функция открытия сейфа
function openSafeDoor() {
    console.log('openSafeDoor вызвана');

    const openBtn = document.querySelector('.openSafeDoor');
    const replaceBtn = document.querySelector('.replaceCassettes');

    // if (openBtn) openBtn.style.display = 'none';
    // if (replaceBtn) replaceBtn.style.display = 'block';

    if (openBtn) {
        openBtn.classList.remove('active');
        openBtn.classList.add('inactive');
        openBtn.style.display = 'none';
    }
    if (replaceBtn) {
        replaceBtn.style.display = 'block';
        replaceBtn.classList.remove('inactive');
        replaceBtn.classList.add('active');
    }

    //Активируем следующую кнопку
    // activateNextButton('open');

    console.log('Сейф открыт');

    // const openBtn = document.querySelector('.openSafeDoor');
    // const replaceBtn = document.querySelector('.replaceCassettes');

    // if (openBtn) openBtn.style.display = 'none';
    // if (replaceBtn) replaceBtn.style.display = 'block';

    // console.log('Сейф открыт');

    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('openSafeDoor');
    }
}

//Функция замены кассет
function replaceCassettes() {
    console.log('replaceCassettes вызвана');

    //Активируем следующую кнопку
    // activateNextButton('replace');

    const replaceBtn = document.querySelector('.replaceCassettes');
    const closeBtn = document.querySelector('.closeSafeDoor');

    // if (replaceBtn) replaceBtn.style.display = 'none';
    // if (closeBtn) closeBtn.style.display = 'block';

    //Скрываем кнопку Заменить
    if (replaceBtn) {
        replaceBtn.classList.remove('active');
        replaceBtn.classList.add('inactive');
        replaceBtn.style.display = 'none';
    }

    //Показываем кнопку Закрыть
    if (closeBtn) {
        closeBtn.style.display = 'block';
        closeBtn.classList.remove('inactive');
        closeBtn.classList.add('active');
        console.log('Кнопка Закрыть дверь сейфа активна');
    }

    console.log('Кассеты заменены');

    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('replaceCassettes');
    }
}

//Функция закрытия сейфа
function closeSafeDoor() {
    console.log('closeSafeDoor вызвана');

    const closeBtn = document.querySelector('.closeSafeDoor');
    if (closeBtn) {
        closeBtn.classList.remove('active');
        closeBtn.classList.add('inactive');
        closeBtn.style.display = 'none';
    }
        

    // //Дактивируем все кнопки
    // const openBtn = document.querySelector('.openSafeDoor');
    // const replaceBtn = document.querySelector('.replaceCassettes');
    // const closeBtn = document.querySelector('.closeSafeDoor');

    // Все кнопки видимы, но не активны
    // [openBtn, replaceBtn, closeBtn].forEach(btn => {
    //     if (btn) {
    //         btn.classList.remove('active', 'training-highlight');
    //         btn.classList.add('inactive');
    //     }
    // });


    console.log('Сейф закрыт');

    // //Проверяем, существует ли кнопка
    // const closeBtn = document.querySelector('closeSafeDoor');
    // if (closeBtn) {
    //     closeBtn.style.display = 'none';
    //     console.log('Сейф закрыт');
    // } else {
    //     console.warn('Кнопка closeSafeDoor не найдена');
    // }

    //Завершаем шаг в обучении
    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('closeSafeDoor');
    }

    //Возврат в меню ресайклера
    const cassettesReplacementScreen = document.getElementById('cassettesReplacmentScreen');
    if (cassettesReplacementScreen) {
        cassettesReplacementScreen.style.display = 'none';
    }

    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) {
        recyclerday.style.display = 'block';
        console.log('Вернулись в меню Операционный день ресайклера')
    }
}

console.log('cassettesreplacement.js загружен полностью');