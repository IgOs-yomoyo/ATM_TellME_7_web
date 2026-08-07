
console.log('cassettesreplacement.js начал загрузку');

function showCassettesReplacmentScreen() {
    console.log('showCassettesReplacmentScreen вызвана');

    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });

    //Показываем экран замены кассет
    const cassettesreplacementScreen = document.getElementById('cassettesReplacmentScreen');
    if (cassettesReplacmentScreen) {
        cassettesReplacmentScreen.style.display = 'block';
        console.log('Показан экран Замена кассет');
    } else {
        console.error('Экран cassettesReplacmentScreen не найден');
    }

}

console.log('cassettesreplacement.js загружен');

function openSafeDoor() {
    console.log('openSafeDoor вызвана');

    const openBtn = document.querySelector('.openSafeDoor');
    const replaceBtn = document.querySelector('.replaceCassettes');

    if (openBtn) openBtn.style.display = 'none';
    if (replaceBtn) replaceBtn.style.display = 'block';

    console.log('Сейф открыт');

    if (typeof isTrainingMode !== 'underfined' && isTrainingMode) {
        completeTrainingStep('openSareDoor');
    }
}

function replaceCassettes() {
    console.log('replaceCassettes вызвана');

    const replaceBtn = document.querySelector('replaceCassettes');
    const closeBtn = document.querySelector('closeSafeDoor');

    console.log('Кассеты заменены');

    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('replaceCassettes');
    }
}

function closeSafeDoor() {
    console.log('closeSafeDoor вызвана');

    const closeBtn = document.querySelector('closeSafeDoor');
    if (closeBtn) closeBtn.style.display = 'none';

    console.log('Сейф закрыт');

    if (typeof isTrainingMode !== 'undefined' && isTrainingMode) {
        completeTrainingStep('closeSafeDoor');
    }

    const cassettesReplacementScreen = document.getElementById('cassettesReplacementScreen');
    if (cassettesReplacmentScreen) {
        cassettesReplacementScreen.style.display = 'none';
    }

    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) {
        recyclerday.style.display = 'block';
        console.log('Вернулись в меню Операционный день ресайклера')
    }
}
