import { nextTick } from 'vue';

let tooltipPool: HTMLDivElement | null = null;

const createTooltipPool = () => {
    const tp = document.createElement('div');
    tp.id = 'NueTooltipPool';
    tp.classList.add('nue-tooltip-pool');
    document.body.appendChild(tp);
    tooltipPool = tp as HTMLDivElement;
    return tp;
};

const activeTooltipPool = () => {
    if (!tooltipPool) return;
    tooltipPool.classList.add('nue-tooltip-pool--actived');
};

const deactiveTooltipPool = async () => {
    await nextTick(() => {
        if (!tooltipPool) return;
        const children = tooltipPool.children;
        if (children.length) return;
        tooltipPool.classList.remove('nue-tooltip-pool--actived');
    });
};

export function useTooltipPool() {
    const isTooltipPoolExists = !!document.getElementById('NueTooltipPool');
    if (!isTooltipPoolExists) createTooltipPool();
    return {
        tooltipPool,
        activeTooltipPool,
        deactiveTooltipPool
    };
}
