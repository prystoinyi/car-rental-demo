import type { Metadata } from 'next';
import type { ComponentType } from 'react';

export type TopicPage = {
    pathname: string;
    metadata: Metadata;
    component: ComponentType;
};
