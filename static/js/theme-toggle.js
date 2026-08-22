(function () {
    var saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function syncThemeButton(button) {
        if (button) {
            button.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
        }
    }

    function toggleTheme() {
        var html = document.documentElement;
        var current = currentTheme();
        var next = current === 'light' ? 'dark' : 'light';
        if (next === 'dark') {
            html.removeAttribute('data-theme');
        } else {
            html.setAttribute('data-theme', next);
        }
        localStorage.setItem('theme', next);
        syncThemeButton(document.getElementById('theme-toggle'));
    }

    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            syncThemeButton(btn);
            btn.addEventListener('click', toggleTheme);
        }
    });
})();
