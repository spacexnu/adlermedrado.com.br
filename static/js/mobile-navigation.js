(function () {
    var root = document.documentElement;

    function setup() {
        var button = document.querySelector('.menu-toggle');
        var dialog = document.getElementById('site-menu');
        if (!button || !dialog || typeof dialog.showModal !== 'function') {
            return;
        }
        root.classList.add('js-navigation');

        var trigger = null;
        var lockedScroll = 0;
        var desktop = window.matchMedia('(min-width: 1024px)');

        function lockScroll() {
            lockedScroll = window.scrollY || 0;
            if (document.body) {
                document.body.style.top = '-' + lockedScroll + 'px';
            }
            root.classList.add('menu-open');
        }

        function unlockScroll() {
            if (!root.classList.contains('menu-open')) {
                return;
            }
            var y = lockedScroll;
            root.classList.remove('menu-open');
            if (document.body) {
                document.body.style.top = '';
            }
            if (!window.scrollTo) {
                return;
            }
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(function () {
                    window.scrollTo(0, y);
                });
            } else {
                window.scrollTo(0, y);
            }
        }

        function closeMenu(restore) {
            if (dialog.open) {
                dialog.close();
            } else {
                unlockScroll();
            }
            button.setAttribute('aria-expanded', 'false');
            if (restore && trigger) {
                trigger.focus({ preventScroll: true });
            }
        }

        button.addEventListener('click', function () {
            trigger = button;
            button.setAttribute('aria-expanded', 'true');
            lockScroll();
            dialog.showModal();
            var close = dialog.querySelector('[data-menu-close]');
            if (close) {
                close.focus({ preventScroll: true });
            }
        });

        dialog.addEventListener('close', function () {
            button.setAttribute('aria-expanded', 'false');
            unlockScroll();
        });

        dialog.addEventListener('keydown', function (event) {
            if (event.key !== 'Tab') {
                return;
            }
            var controls = Array.prototype.filter.call(
                dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
                function (control) { return control.getClientRects().length > 0; }
            );
            var first = controls[0];
            var last = controls[controls.length - 1];
            if (first && event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (last && !event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) {
                closeMenu(true);
            }
        });

        dialog.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                closeMenu(false);
            }
        });

        dialog.querySelectorAll('[data-menu-close]').forEach(function (control) {
            control.addEventListener('click', function () {
                closeMenu(true);
            });
        });

        function onViewport() {
            if (desktop.matches) {
                closeMenu(false);
            }
        }

        if (desktop.addEventListener) {
            desktop.addEventListener('change', onViewport);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
