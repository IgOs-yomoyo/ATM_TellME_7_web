
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




    // const closeDayConfirmScreen = document.getElementById('closeDayConfirmScreen');
    // if (closeDayConfirmScreen) closeDayConfirmScreen.style.display = 'none';


    // const closeRecyclerDayAgain = document.getElementById('closeRecyclerDayAgain');
    // if (closeRecyclerDayAgain) closeRecyclerDayAgain.style.display = 'none';

    // const cassettesReplacmentScreen = document.getElementById('cassettesReplacmentScreen');
    // if (cassettesReplacmentScreen) cassettesReplacmentScreen.style.display = 'block';


