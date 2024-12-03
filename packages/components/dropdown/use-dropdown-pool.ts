import { nextTick } from 'vue';

let dropdownPool: HTMLDivElement | null = null;

const createDropdownPool = () => {
    const pool = document.createElement('div');
    pool.classList.add('nue-dropdown-pool');
    pool.id = 'NueDropdownPool';
    document.body.appendChild(pool);
    dropdownPool = pool as HTMLDivElement;
    return pool;
};

const activeDropdownPool = () => {
    if (!dropdownPool) return;
    dropdownPool.classList.add('nue-dropdown-pool--actived');
};

const deactiveDropdownPool = () => {
    nextTick(() => {
        if (!dropdownPool) return;
        const children = dropdownPool.children;
        if (children.length) return;
        dropdownPool.classList.remove('nue-dropdown-pool--actived');
    });
};

export function useDropdownPool() {
    const isPoolExist = !!document.getElementById('NueDropdownPool');
    if (!isPoolExist) createDropdownPool();
    return {
        pool: dropdownPool,
        activePool: activeDropdownPool,
        deactivePool: deactiveDropdownPool
    };
}
