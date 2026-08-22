(function () {
    var root = document.documentElement;
    root.classList.add('js-navigation');

    function setupNavigation() {
        var button = document.querySelector('.menu-toggle');
        var navigation = document.getElementById('primary-navigation');

        if (!button || !navigation) {
            return;
        }

        function setExpanded(expanded) {
            navigation.classList.toggle('is-open', expanded);
            button.setAttribute('aria-expanded', String(expanded));
        }

        button.addEventListener('click', function () {
            setExpanded(!navigation.classList.contains('is-open'));
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
                setExpanded(false);
                button.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupNavigation);
    } else {
        setupNavigation();
    }
})();
