import { reactive } from 'vue';
import { usePopupPool } from '@nue-ui/components';
import { generateElementId } from '@nue-ui/utils';

const usePopupAnchor = (popupPoolId?: string) => {
    const popupPool = usePopupPool(popupPoolId);
    const popupAnchor = document.createElement('div');
    const popupAnchorId = generateElementId();
    const tpState = reactive({ disabled: true, to: 'body' });

    popupAnchor.id = popupAnchorId;
    popupAnchor.classList.add('nue-popup-anchor');

    const mountPopupAnchor = () => {
        if (!popupPool.element) return;
        popupPool.element.appendChild(popupAnchor);
        try {
            tpState.to = '#' + popupAnchorId;
            tpState.disabled = false;
        } catch (err) {
            console.log('[UsePopupAnchor] Mount anchor element error:', err);
        } finally {
            popupPool.setZIndex();
        }
    };

    const unmountPopupAnchor = () => {
        if (!popupPool.element) return;
        try {
            popupPool.element.removeChild(popupAnchor);
        } catch (err) {
            console.log('[UsePopupAnchor] Unmount anchor element error:', err);
        } finally {
            popupPool.setZIndex();
            tpState.disabled = true;
        }
    };

    return {
        popupPool,
        popupAnchor,
        popupAnchorId,
        tpState,
        mountPopupAnchor,
        unmountPopupAnchor
    };
};

export default usePopupAnchor;
