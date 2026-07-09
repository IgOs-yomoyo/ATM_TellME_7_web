

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