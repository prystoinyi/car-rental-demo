import {
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
} from './navigation-menu';

const NavigationMenu = Object.assign(NavigationMenuRoot, {
    List: NavigationMenuList,
    Item: NavigationMenuItem,
    Trigger: NavigationMenuTrigger,
    Content: NavigationMenuContent,
    Portal: NavigationMenuPortal,
    Positioner: NavigationMenuPositioner,
    Popup: NavigationMenuPopup,
    Viewport: NavigationMenuViewport,
    Backdrop: NavigationMenuBackdrop,
    Arrow: NavigationMenuArrow,
    Link: NavigationMenuLink,
    Icon: NavigationMenuIcon,
});

export { NavigationMenu };
