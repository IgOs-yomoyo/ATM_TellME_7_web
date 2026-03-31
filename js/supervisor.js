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
    alert("Открытие/закрытие операционного дня");
}

function gotoNormalMode() {
    showMainMenu();
}