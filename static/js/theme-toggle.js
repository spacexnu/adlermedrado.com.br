(function () {
    var saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    function toggleTheme() {
        var html = document.documentElement;
        var current = html.getAttribute('data-theme');
        var next = current === 'light' ? 'dark' : 'light';
        if (next === 'dark') {
            html.removeAttribute('data-theme');
        } else {
            html.setAttribute('data-theme', next);
        }
        localStorage.setItem('theme', next);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    });
})();
