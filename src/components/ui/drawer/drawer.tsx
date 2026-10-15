import { Drawer } from '@base-ui/react/drawer';

function DrawerRoot({ ...props }: Drawer.Root.Props) {
    return <Drawer.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: Drawer.Trigger.Props) {
    return <Drawer.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerSwipeArea({ ...props }: Drawer.SwipeArea.Props) {
    return <Drawer.SwipeArea data-slot="drawer-swipe-area" {...props} />;
}

function DrawerPortal({ ...props }: Drawer.Portal.Props) {
    return <Drawer.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerBackdrop({ ...props }: Drawer.Backdrop.Props) {
    return <Drawer.Backdrop data-slot="drawer-backdrop" {...props} />;
}

function DrawerViewport({ ...props }: Drawer.Viewport.Props) {
    return <Drawer.Viewport data-slot="drawer-viewport" {...props} />;
}

function DrawerPopup({ ...props }: Drawer.Popup.Props) {
    return <Drawer.Popup data-slot="drawer-popup" {...props} />;
}

function DrawerContent({ ...props }: Drawer.Content.Props) {
    return <Drawer.Content data-slot="drawer-content" {...props} />;
}

function DrawerTitle({ ...props }: Drawer.Title.Props) {
    return <Drawer.Title data-slot="drawer-title" {...props} />;
}

function DrawerDescription({ ...props }: Drawer.Description.Props) {
    return <Drawer.Description data-slot="drawer-description" {...props} />;
}

function DrawerClose({ ...props }: Drawer.Close.Props) {
    return <Drawer.Close data-slot="drawer-close" {...props} />;
}

const createHandle = Drawer.createHandle;

export {
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
};
