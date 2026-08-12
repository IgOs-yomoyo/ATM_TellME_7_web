
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

        const openBtn = document.querySelector('.openSafeDoor');
        const replaceBtn = document.querySelector('.replaceCassettes');
        const closeBtn = document.querySelector('.closeSafeDoor');

        if (openBtn) openBtn.style.display = 'block';
        if (replaceBtn) replaceBtn.style.display = 'none';
        if (closeBtn) closeBtn.style.display = 'none';

        console.log ('Кнопки: открыть - активна, заменить - не активна, закрыть - не активна');
    } else {
        console.error('Экран cassettesReplacmentScreen не найден!');
    }
}

//         //Сбрасываем состояние кнопок
//         resetSafeButtons();

//     } else {
//         console.error('Экран cassettesReplacmentScreen не найден');
//     }
// }

console.log('cassettesreplacement.js загружен');

// Функция сброса состояния кнопок
// function resetSafeButtons() {
//     console.log('resetSafeButtons вызвана');

//     const openBtn = document.querySelector('.openSafeDoor');
//     const replaceBtn = document.querySelector('.replaceCassettes');
//     const closeBtn = document.querySelector('.closeSafeDoor');

//     // Все кнопки видимы, но не активны
//     [openBtn, replaceBtn, closeBtn].forEach(btn => {
//         if (btn) {
//             btn.classList.remove('active', 'training-highlight');
//             btn.classList.add('inactive');
//         }
//     });

//     // Активна только кнопка ОТКРЫТЬ
//     if (openBtn) {
//         openBtn.classList.remove('inactive');
//         openBtn.classList.add('active');
//         console.log('Кнопка "ОТКРЫТЬ" активна');
//     }

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

    // const openBtn = document.querySelector('.openSafeDoor');
    // const replaceBtn = document.querySelector('.replaceCassettes');
    // const closeBtn = document.querySelector('.closeSafeDoor');

    // //Деактивируем все
    // [openBtn, replaceBtn, closeBtn].forEach(btn => {
    //     if (btn) {
    //         btn.classList.remove('active', 'training-highlight');
    //         btn.classList.add('inactive');
    //     }
    // });

    //Активируем нужную
//     if (currentAction === 'open') {
//         if (replaceBtn) {
//             replaceBtn.classList.remove('inactive');
//             replaceBtn.classList.add('active');
//             console.log('Кнопка "Заменить кассеты" активна');
//         }
//     }else if (currentAction === 'replace') {
//         if (closeBtn) {
//             closeBtn.classList.remove('inactive');
//             closeBtn.classList.add('active');
//             console.log('Кнопка "ЗАКРЫТЬ" активна');
//         }
//     }
// }

//Функция открытия сейфа
function openSafeDoor() {
    console.log('openSafeDoor вызвана');

    const openBtn = document.querySelector('.openSafeDoor');
    const replaceBtn = document.querySelector('.replaceCassettes');

    if (openBtn) openBtn.style.display = 'none';
    if (replaceBtn) replaceBtn.style.display = 'block';

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

    if (replaceBtn) replaceBtn.style.display = 'none';
    if (closeBtn) closeBtn.style.display = 'block';

    console.log('Кассеты заменены');

    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('replaceCassettes');
    }
}

//Функция закрытия сейфа
function closeSafeDoor() {
    console.log('closeSafeDoor вызвана');

    const closeBtn = document.querySelector('.closeSafeDoor');
    if (closeBtn) closeBtn.style.display = 'none';

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