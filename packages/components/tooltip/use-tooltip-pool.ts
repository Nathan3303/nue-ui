import { nextTick } from 'vue';
import './tooltip-pool.css';

let tooltipPool: HTMLDivElement | null = null;

const createTooltipPool = () => {
    const tp = document.createElement('div');
    tp.classList.add('nue-tooltip-pool');
    tp.id = 'NueTooltipPool';
    document.body.appendChild(tp);
    tooltipPool = tp as HTMLDivElement;
    return tp;
};

const activeTooltipPool = () => {
    if (!tooltipPool) return;
    tooltipPool.classList.add('nue-tooltip-pool--actived');
};

const deactiveTooltipPool = () => {
    nextTick(() => {
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
