registerPaint('pixel-gradient', class {
    static get inputProperties() {
        return ['--pixel-gradient-color', '--pixel-gradient-size', '--pixel-gradient-seed'];
    }

    paint(ctx, bounds, props) {
        const size = props.get('--pixel-gradient-size').value;
        ctx.fillStyle = props.get('--pixel-gradient-color');

        let seed = props.get('--pixel-gradient-seed').value;

        for (let x = 0; x < bounds.width; x += size) {
            // Create a new rand() for this column:
            const rand = this.mulberry32(seed);
            // Increment the seed for next time:
            seed++;

            for (let y = 0; y < bounds.height; y += size) {
                const pos = (y + size / 2) / bounds.height;
                if (rand.next() < pos) ctx.fillRect(x, y, size, size);
            }
        }
    }

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