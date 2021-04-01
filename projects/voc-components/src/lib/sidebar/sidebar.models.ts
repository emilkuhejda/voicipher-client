export interface SidebarItemModel {
    title: string;
    url: string[];
    isActive?: boolean;
    items: SubSidebarItemModel[];
}

interface SubSidebarItemModel {
    title: string;
    url: string[];
    isActive?: boolean;
}
