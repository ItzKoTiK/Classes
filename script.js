document.addEventListener("DOMContentLoaded", function() {
    function getCurrentWeekNumber() {
        const options = { timeZone: 'Europe/Kiev' };
        const currentDate = new Date().toLocaleString('en-US', options);
        const date = new Date(currentDate);

        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const daysDifference = (date - startOfYear) / (1000 * 60 * 60 * 24);
        return Math.ceil((daysDifference + startOfYear.getDay() + 1) / 7);
    }

    function getClassForWeek(weekNumber) {
        return weekNumber % 2 === 1 ? "Англійська" : "Зарубіжна";
    }

    function getDayMessageAndClass() {
        const options = { timeZone: 'Europe/Kiev' };
        const today = new Date().toLocaleString('en-US', options);
        const date = new Date(today);
        const dayOfWeek = date.getDay(); // 0 = Sunday
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
    
    
    
    const themeToggleButton = document.getElementById("theme-toggle");

    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem("theme", theme);

        // Apply inversion based on the theme
        themeToggleButton.classList.toggle("inverted", theme === "dark-mode");
    }

    function getCurrentTheme() {
        return localStorage.getItem("theme") || "dark-mode";
    }

    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === "dark-mode" ? "light-mode" : "dark-mode";
        setTheme(newTheme);
    }

    // Initialize theme
    setTheme(getCurrentTheme());

    themeToggleButton.addEventListener("click", toggleTheme);
});

