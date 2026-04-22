console.log('closerecyclerday.js начал загрузку');

let openingDayData = null;

function setOpeningDayData(data) {
    console.log('setOpeningDayData вызвана', data);
    openingDayData = data;
}

function showCloseDayScreen() {
    console.log('showCloseDayScreen вызвана');
    alert('showCloseDayScreen сработала!');
    
    const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    if (closeReceiptScreen) {
        closeReceiptScreen.style.display = 'block';
        console.log('Экран закрытия показан');
    } else {
        console.error('closeReceiptScreen не найден');
    }
}

function confirmCloseReceipt() {
    console.log('confirmCloseReceipt вызвана');
    
    const closeReceiptScreen = document.getElementById('closeReceiptScreen');
    if (closeReceiptScreen) {
        closeReceiptScreen.style.display = 'none';
    }
    
    if (typeof setDayOpened === 'function') {
        setDayOpened(false);
        console.log('Флаг сброшен');
    }
    
    openingDayData = null;
    
    const recyclerday = document.getElementById('recyclerday');
    if (recyclerday) {
        recyclerday.style.display = 'block';
    }
}

console.log('closerecyclerday.js загружен полностью');