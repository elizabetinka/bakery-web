(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const startTime = window.performance.timing.navigationStart;
        const endTime = new Date().getTime();
        const loadTime = endTime - startTime;
        const statsContainer = document.getElementById('load-stats');
        if (statsContainer) {
            statsContainer.innerText = `Время загрузки страницы: ${loadTime} мс`;
        } else {
            console.warn('Элемент для статистики загрузки не найден!');
        }
    });
})();