registerPaint('swedish-flag', class {
    paint(ctx, size, properties) {
        console.log(ctx, size, properties)
        const width = size.width;
        const height = size.height;

        // Background color
        ctx.fillStyle = '#004B87';
        ctx.fillRect(0, 0, width, height);

        // Draw horizontal stripe
        ctx.fillStyle = '#FFCD00';
        ctx.fillRect(0, height * 0.4, width, height * 0.2);

        // Draw vertical stripe
        ctx.fillRect(width * 0.3125, 0, width * 0.125, height);
    }
});


