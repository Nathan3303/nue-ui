import type { NueDropdownGroups, NueDropdownGroupId } from './types';

const dropdownGroups: NueDropdownGroups = new Map();

const createGroup = (groupId: NueDropdownGroupId) => {
    dropdownGroups.set(groupId, []);
};

const destroyGroup = (groupId: NueDropdownGroupId) => {
    dropdownGroups.delete(groupId);
};

export const register = (groupId: NueDropdownGroupId, dropdownId: string, close: () => void) => {
    const isPoolExist = dropdownGroups.has(groupId);
    if (!isPoolExist) createGroup(groupId);
    const item = { dropdownId, close };
    const group = dropdownGroups.get(groupId);
    if (!group) return;
    // console.log(groupId, group);
    group.push(item);
};

export const unregister = (groupId: NueDropdownGroupId, dropdownId: string) => {
    const isPoolExist = dropdownGroups.has(groupId);
    if (!isPoolExist) return;
    const group = dropdownGroups.get(groupId);
    if (!group) return;
    const newGroup = group.filter(item => {
        return item.dropdownId !== dropdownId;
    });
    // console.log(groupId, newGroup);
    if (newGroup.length === 0) {
        destroyGroup(groupId);
    } else {
        dropdownGroups.set(groupId, newGroup);
    }
};

export const closeDropdownsInGroup = (groupId: NueDropdownGroupId) => {
    const isPoolExist = dropdownGroups.has(groupId);
    if (!isPoolExist) return;
    const group = dropdownGroups.get(groupId);
    if (!group) return;
    group.forEach(item => item.close());
};
