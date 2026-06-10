(function () {
    var taglines = [
        // Classic BBS / FidoNet era
        'Unable to locate Coffee -- Operator Halted!',
        'On a clear disk you can seek forever.',
        'We all live in a yellow subroutine.',
        'Talk is cheap -- supply exceeds demand.',
        "Keyboard not found. Visualize 'F1' to continue.",
        'A problem can be found for almost every solution.',
        'Madness takes its toll. Please have exact change.',
        'Who is General Failure, and why is he reading my disk?',
        'ETHERNET: a device for catching the ether bunny.',
        'I used to have a life, now I have a modem.',
        'Computers make very fast, very efficient mistakes.',
        'Life would be much easier if I had the source code.',
        'Confidence is important; the computer can sense fear.',
        "Back up my hard drive? I can't find the reverse switch!",
        'Behind every good computer is a jumble of wires.',
        'Software Independent: won\'t work with ANY software.',
        'Remember, to a computer 1 + 1 = 10.',
        '53.7% of all statistics are totally incorrect.',
        "If it ain't water-cooled... it's a terminal!",
        'Aibohphobia, n. -- the fear of palindromes.',
        'All wiyht. Rho sritched mg kegtops awound?',
        'Eschew obfuscation!',
        // Modern era
        'There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.',
        "There are 10 types of people: those who understand binary, and those who don't.",
        'Why do programmers prefer dark mode? Because light attracts bugs.',
        'It works on my machine.',
        "It's not a bug, it's an undocumented feature.",
        'In order to understand recursion, one must first understand recursion.',
        "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
        "I'd tell you a UDP joke, but you might not get it.",
        "There's no place like 127.0.0.1.",
        'Real programmers count from 0.',
        '!false -- it\'s funny because it\'s true.',
        'Have you tried turning it off and on again?',
        '99 little bugs in the code... take one down, patch it around, 127 little bugs in the code.',
        'It is only when a mosquito lands on your testicles that you realize there is always a way to solve problems without using violence. -Confucius'
    ];

    document.addEventListener('DOMContentLoaded', function () {
        var el = document.getElementById('tagline');
        if (el) {
            el.textContent = taglines[Math.floor(Math.random() * taglines.length)];
        }
    });
})();
