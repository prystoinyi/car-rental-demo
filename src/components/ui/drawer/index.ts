import {
    createHandle,
    DrawerBackdrop,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerPopup,
    DrawerPortal,
    DrawerRoot,
    DrawerSwipeArea,
    DrawerTitle,
    DrawerTrigger,
    DrawerViewport,
} from './drawer';

const Drawer = Object.assign(DrawerRoot, {
    Trigger: DrawerTrigger,
    SwipeArea: DrawerSwipeArea,
    Portal: DrawerPortal,
    Backdrop: DrawerBackdrop,
    Viewport: DrawerViewport,
    Popup: DrawerPopup,
    Content: DrawerContent,
    Title: DrawerTitle,
    Description: DrawerDescription,
    Close: DrawerClose,
    createHandle,
});

export { Drawer };
