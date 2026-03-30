function exitApp() {
    let answer = confirm("Вы уверены, что хотите выйти?");
    if (answer == true) {
        window.close();
    } 
}

// Функция инициализации кассет
function initCassettes() {
    // console.log("Инициализация кассет");
    alert("Инициализация кассет");
    
}

// Функция инкассация ресайклера
function recyclCollection() {
    // console.log("Инкассация ресайклера");
    // let answer = confirm("Вы уверены, что хотите выполнить инкассацию ресайклера?");
    // if (answer == true) {
    alert("Инкассация ресайклера выполнена успешно!");
    }
}

// Функция меню оператора
function gotoSupervisor() {
    // console.log("Меню оператора");
    // alert("Меню оператора ещё не сформировано");
    window.location.href="supervisor.html";
}