import {
    Badge,
    Camera,
    CarFront,
    ChevronDown,
    ChevronRight,
    CircleHelp,
    Home,
    Info,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Newspaper,
    Phone,
    Wrench,
    X,
} from 'lucide-react';

export const icons = {
    'badge': Badge,
    'camera': Camera,
    'car-front': CarFront,
    'chevron-down': ChevronDown,
    'chevron-right': ChevronRight,
    'circle-help': CircleHelp,
    'home': Home,
    'info': Info,
    'mail': Mail,
    'map-pin': MapPin,
    'menu': Menu,
    'message-circle': MessageCircle,
    'newspaper': Newspaper,
    'phone': Phone,
    'wrench': Wrench,
    'x': X,
} as const;

export type IconKey = keyof typeof icons;
