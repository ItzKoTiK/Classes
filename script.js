document.addEventListener("DOMContentLoaded", function() {
    function getCurrentWeekNumber() {
        const options = { timeZone: 'Europe/Kiev' };
        const currentDate = new Date().toLocaleString('en-US', options);
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const daysDifference = (currentDate - startOfYear) / (1000 * 60 * 60 * 24);
        return Math.ceil((daysDifference + startOfYear.getDay() + 1) / 7);
    }

    function getClassForWeek(weekNumber) {
        return weekNumber % 2 === 0 ? "Англійська" : "Зарубіжна";
    }

    function getDayMessageAndClass() {
        const today = new Date();
        const dayOfWeek = today.getDay() + 1; // 0 = Sunday
        const currentWeekNumber = getCurrentWeekNumber();
        let message, classForWeek;

        if (dayOfWeek === 2) {
            message = "Сьогодні в нас";
            classForWeek = getClassForWeek(currentWeekNumber);
        } else if (dayOfWeek === 1) {
            message = "Завтра в нас";
            classForWeek = getClassForWeek(currentWeekNumber);
        } else if (dayOfWeek > 2 && dayOfWeek <= 6 || dayOfWeek === 0) {
            message = "Наступного тижня в нас";
            classForWeek = getClassForWeek(currentWeekNumber + 1); 
        }

        return { message, classForWeek };
    }

    const { message, classForWeek } = getDayMessageAndClass();

    document.getElementById('weekday').textContent = message;
    document.getElementById('class').textContent = classForWeek;
});
