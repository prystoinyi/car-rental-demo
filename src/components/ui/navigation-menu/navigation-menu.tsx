import { NavigationMenu } from '@base-ui/react/navigation-menu';

function NavigationMenuRoot({ ...props }: NavigationMenu.Root.Props) {
    return <NavigationMenu.Root data-slot="navigation-menu" {...props} />;
}

function NavigationMenuList({ ...props }: NavigationMenu.List.Props) {
    return <NavigationMenu.List data-slot="navigation-menu-list" {...props} />;
}

function NavigationMenuItem({ ...props }: NavigationMenu.Item.Props) {
    return <NavigationMenu.Item data-slot="navigation-menu-item" {...props} />;
}

function NavigationMenuTrigger({ ...props }: NavigationMenu.Trigger.Props) {
    return <NavigationMenu.Trigger data-slot="navigation-menu-trigger" {...props} />;
}

function NavigationMenuContent({ ...props }: NavigationMenu.Content.Props) {
    return <NavigationMenu.Content data-slot="navigation-menu-content" {...props} />;
}

function NavigationMenuPortal({ ...props }: NavigationMenu.Portal.Props) {
    return <NavigationMenu.Portal data-slot="navigation-menu-portal" {...props} />;
}

function NavigationMenuPositioner({ ...props }: NavigationMenu.Positioner.Props) {
    return <NavigationMenu.Positioner data-slot="navigation-menu-positioner" {...props} />;
}

function NavigationMenuPopup({ ...props }: NavigationMenu.Popup.Props) {
    return <NavigationMenu.Popup data-slot="navigation-menu-popup" {...props} />;
}

function NavigationMenuViewport({ ...props }: NavigationMenu.Viewport.Props) {
    return <NavigationMenu.Viewport data-slot="navigation-menu-viewport" {...props} />;
}

function NavigationMenuBackdrop({ ...props }: NavigationMenu.Backdrop.Props) {
    return <NavigationMenu.Backdrop data-slot="navigation-menu-backdrop" {...props} />;
}

function NavigationMenuArrow({ ...props }: NavigationMenu.Arrow.Props) {
    return <NavigationMenu.Arrow data-slot="navigation-menu-arrow" {...props} />;
}

function NavigationMenuLink({ ...props }: NavigationMenu.Link.Props) {
    return <NavigationMenu.Link data-slot="navigation-menu-link" {...props} />;
}

function NavigationMenuIcon({ ...props }: NavigationMenu.Icon.Props) {
    return <NavigationMenu.Icon data-slot="navigation-menu-icon" {...props} />;
}

export {
    NavigationMenuArrow,
    NavigationMenuBackdrop,
    NavigationMenuContent,
    NavigationMenuIcon,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuPopup,
    NavigationMenuPortal,
    NavigationMenuPositioner,
    NavigationMenuRoot,
    NavigationMenuTrigger,
    NavigationMenuViewport,
};
