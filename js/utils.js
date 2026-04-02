// Общие функции для переключения экранов

function showMainMenu() {
    const mainScreen = document.getElementById('mainScreen');
    const supervisorScreen = document.getElementById('supervisorScreen');
    
    if (mainScreen) mainScreen.style.display = 'block';
    if (supervisorScreen) supervisorScreen.style.display = 'none';
}

function showSupervisorMenu() {
    const mainScreen = document.getElementById('mainScreen');
    const supervisorScreen = document.getElementById('supervisorScreen');
    
    if (mainScreen) mainScreen.style.display = 'none';
    if (supervisorScreen) supervisorScreen.style.display = 'block';
}

function exitApp() {
    let answer = confirm("Вы уверены, что хотите выйти?");
    if (answer == true) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #1a1a2e; font-family: Arial;">
                <div style="text-align: center; color: white;">
                    <h1>🔌 Банкомат TellME 7 выключен</h1>
                    <p>Спасибо за использование</p>
                    <button onclick="location.reload()" style="margin-top: 30px; padding: 12px 24px; font-size: 16px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 8px;">
                        Включить банкомат
                    </button>
                </div>
            </div>
        `;
    }
}

function showopenclosedaymenu(){
    const supervisorScreen = document.getElementById('supervisorScreen')
    const opencloseday = document.getElementById('opencloseday')

    if (supervisorScreen) supervisorScreen.style.display = 'none';
    if (opencloseday) opencloseday.style.display = 'block';
}

// function showRecyclerDayMenu()
function showRecyclerDayMenu() {
    const opencloseday = document.getElementById('opencloseday')
    const recyclerday = document.getElementById('recyclerday')

    if (opencloseday) opencloseday.style.display = 'none';
    if (recyclerday) recyclerday.style.display = 'block';
}