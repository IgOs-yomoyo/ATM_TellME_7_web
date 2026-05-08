// Функции меню оператора

function shutdownATM() {
    let answer = confirm("Вы уверены, что хотите выключить банкомат?");
    if (answer == true) {
        alert("Банкомат выключается...");
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
    alert('Переход в режим "Банкомат не обслуживает"')
}