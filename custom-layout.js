registerLayout('custom-layout', class {
    static get inputProperties() { return []; }

    static get childrenInputProperties() { return []; }

    static get layoutOptions() { return []; }

    async intrinsicSizes(children, edges, styleMap) { }

    async layout(children, edges, constraintSpace, props) {
        const childFragments = []
        console.log('constraintSpace', constraintSpace);

        for (const child of children) {
            const childFragment = await child.layoutNextFragment();
            console.log(`child ${childFragments.length}`, childFragment);
            childFragment.inlineOffset = 0;
            childFragment.blockOffset = 0;
            childFragments.push(childFragment);
        }

        return {
            childFragments
        };
    }
});