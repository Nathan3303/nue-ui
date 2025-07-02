import { ref } from 'vue';
import type { NueDropdownPool, NueDropdownPoolId, NueDropdownPoolItem } from './types';

const dropdownPool = ref<NueDropdownPool>(new Map());

const createPool = (poolId: NueDropdownPoolId) => {
    dropdownPool.value.set(poolId, []);
};

const destroyPool = (poolId: NueDropdownPoolId) => {
    dropdownPool.value.delete(poolId);
};

export const register = (poolId: NueDropdownPoolId, item: NueDropdownPoolItem) => {
    const isPoolExist = dropdownPool.value.has(poolId);
    if (!isPoolExist) createPool(poolId);
    dropdownPool.value.get(poolId)?.push(item);
};

export const unregister = (poolId: NueDropdownPoolId, item: NueDropdownPoolItem) => {
    const pool = dropdownPool.value.get(poolId);
    if (!pool) return;
    const index = pool.indexOf(item);
    if (index !== -1) pool.splice(index, 1);
    if (pool.length === 0) destroyPool(poolId);
};
