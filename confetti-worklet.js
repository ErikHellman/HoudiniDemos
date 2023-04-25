registerPaint('confetti', class {
    static get inputProperties() {
        return ['--confetti-colors', '--confetti-seed'];
    }

    paint(ctx, size, properties) {
        console.log('colors', properties.get('--confetti-colors'));
        const colors = properties.get('--confetti-colors').toString().split(' ');
        console.log('seed', properties.get('--confetti-seed'));
        const seed = parseInt(properties.get('--confetti-seed').value);
        const numConfetti = 10000;
        const rand = this.mulberry32(seed);

        function drawConfetti(x, y, width, height, color, rotation) {
            ctx.save();
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.restore();
        }


        for (let i = 0; i < numConfetti; i++) {
            const x = rand.next() * size.width;
            const y = rand.next() * size.height;
            const width = 2 + rand.next() * 6;
            const height = 2 + rand.next() * 6;
            const color = colors[Math.floor(rand.next() * colors.length)].trim();
            const rotation = rand.next() * 360;

            drawConfetti(x, y, width, height, color, rotation);
        }
    }

    // PRNG that allows us to set the seed
    mulberry32(seed) {
        let state = seed;

        const next = () => {
            state |= 0;
            state = (state + 0x6d2b79f5) | 0;
            var t = Math.imul(state ^ (state >>> 15), 1 | state);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };

        return {
            next,
            nextBetween: (from, to) => next() * (to - from) + from,
            fork: () => mulberry32(next() * 2 ** 32),
        };
    }
});
