let zIndex = 64;
const openedDrawers = new Set<HTMLElement>();

export function useDrawer() {
    function setOpened(drawer: HTMLDivElement) {
        zIndex++;
        drawer.style.zIndex = zIndex.toString();
        openedDrawers.add(drawer);
    }

    function setClosed(drawer: HTMLDivElement) {
        openedDrawers.delete(drawer);
        if (openedDrawers.size === 0) {
            zIndex = 64;
        }
    }

    return { setOpened, setClosed };
}
