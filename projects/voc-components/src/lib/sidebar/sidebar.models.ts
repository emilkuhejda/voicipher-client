export interface SidebarItemModel {
    title: string;
    url: string[],
    items: SubSidebarItemModel[]
}

interface SubSidebarItemModel {
    title: string;
    url: string[]
}
