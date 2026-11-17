(function () {
    var root = document.documentElement;
    var media = window.matchMedia('(prefers-color-scheme: light)');

    function readStored() {
        try {
            var value = localStorage.getItem('theme');
            return value === 'light' || value === 'dark' ? value : null;
        } catch (error) {
            return null;
        }
    }

    function systemTheme() {
        return media.matches ? 'light' : 'dark';
    }

    function effectiveTheme() {
        var attr = root.getAttribute('data-theme');
        return attr === 'light' || attr === 'dark' ? attr : systemTheme();
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        syncControls();
    }

    function persist(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            /* preference still applies on the document */
        }
    }

    function syncControls() {
        var theme = effectiveTheme();
        var toggles = document.querySelectorAll('[data-theme-toggle]');
        for (var i = 0; i < toggles.length; i++) {
            var button = toggles[i];
            var choice = button.getAttribute('data-theme-choice');
            var pressed = choice ? choice === theme : theme === 'dark';
            button.setAttribute('aria-pressed', String(pressed));
            var label = button.querySelector('[data-theme-label]');
            if (label && !choice) {
                label.textContent = theme;
            }
            if (!choice) {
                button.setAttribute('aria-label', theme === 'light' ? 'Light mode' : 'Dark mode');
            }
        }
    }

    function setTheme(theme, store) {
        if (theme !== 'light' && theme !== 'dark') {
            theme = systemTheme();
            store = false;
        }
        explicit = theme;
        applyTheme(theme);
        if (store) {
            persist(theme);
        }
    }

    var explicit = readStored();
    applyTheme(explicit || systemTheme());

    function onSystemChange() {
        if (!explicit) {
            applyTheme(systemTheme());
        }
    }

    if (media.addEventListener) {
        media.addEventListener('change', onSystemChange);
    } else if (media.addListener) {
        media.addListener(onSystemChange);
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-theme-toggle]');
        if (!button) {
            return;
        }
        var choice = button.getAttribute('data-theme-choice');
        if (choice === 'light' || choice === 'dark') {
            setTheme(choice, true);
            return;
        }
        setTheme(effectiveTheme() === 'light' ? 'dark' : 'light', true);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncControls);
    }
})();
