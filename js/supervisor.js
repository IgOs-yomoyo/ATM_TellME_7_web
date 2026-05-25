// Функции меню оператора

function shutdownATM() {

    //Проверяем положение переключателя
    const checkbox = document.getElementById('modeCheckbox');
    const isSupervisorMode = checkbox && checkbox.checked;

    if (isSupervisorMode) {
        alert('Переведите ключ оператора в рабочее положение');
        return;
    }else{
        let answer = confirm("Вы уверены, что хотите выключить банкомат?");
    if (answer == true) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #1a1a2e; font-family: Arial;">
                <div style="text-align: center; color: white;">
                    <h1>🔌 Банкомат выключен</h1>
                    <button onclick="location.reload()" style="margin-top: 30px; padding: 12px 24px; font-size: 16px; cursor: pointer; background: #4CAF50; color: white; border: none; border-radius: 8px;">
                        Включить банкомат
                    </button>
                </div>
            </div>
        `;
    }
}
}



function deviceStatus() {
    alert("Состояние устройств:\n- Кассеты: OK\n- Принтер: OK\n- Дисплей: OK");
}

function openCloseDay() {
    // alert("Открытие/закрытие операционного дня");
    showopenclosedaymenu();
}

function gotoNormalMode() {
    // showMainMenu();
    backToWelcomeScreen();
}

function NottoService(){
    // alert('Переход в режим "Банкомат не обслуживает"')
    toOutOfService();
}