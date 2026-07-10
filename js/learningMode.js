

// ========== ТРЕНАЖЁР ========== 

// ========== ОТКРЫТЬ МЕНЮ ТРЕНАЖЁРА
function openTrainingMenu() {
    document.querySelectorAll('.atm-screen').forEach(screen => {
        screen.style.display = 'none';
    });
    // Показываем меню тренажёра
    const trainerMenu = document.getElementById('trainerMenuScreen');
    if (trainerMenu) trainerMenu.style.display = 'block';
}

function backToATMService() {
    const trainerMenu = document.getElementById('trainerMenuScreen');
    if (trainerMenu) trainerMenu.style.display = 'none';

    if (typeof showClientScreen === 'function') {
        showClientScreen();
    }

}