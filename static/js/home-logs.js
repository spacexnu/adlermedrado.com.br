(function () {
    var root = document.documentElement;
    root.classList.add('js-logs');

    function setup() {
        var switcher = document.querySelector('[data-log-switch]');
        if (!switcher) {
            return;
        }
        var buttons = switcher.querySelectorAll('[data-log-target]');
        var desktop = window.matchMedia('(min-width: 1024px)');
        var selected = 'english';

        function panels() {
            return document.querySelectorAll('[data-log-panel]');
        }

        function show(lang) {
            selected = lang;
            panels().forEach(function (panel) {
                var match = panel.getAttribute('data-log-panel') === lang;
                if (desktop.matches) {
                    panel.hidden = false;
                } else {
                    panel.hidden = !match;
                }
            });
            buttons.forEach(function (button) {
                var match = button.getAttribute('data-log-target') === lang;
                button.setAttribute('aria-pressed', String(match));
            });
        }

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                show(button.getAttribute('data-log-target'));
            });
        });

        function onViewport() {
            show(selected);
        }

        if (desktop.addEventListener) {
            desktop.addEventListener('change', onViewport);
        }
        show('english');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
