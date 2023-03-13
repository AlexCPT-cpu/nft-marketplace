export type social = string

export interface NftProps { 
    image?: string, 
    name?: string, 
    timer?: string, 
    likes?: number, 
    price?: number 
}

export interface CreatorProps {
    image?: string, 
    name?: string, 
    address?: string, 
    background?: string, 
    followers?: number, 
    items?: number ,
    socials: social[]
}

export interface CollectionProps {
    image?: string,
    name?: string,
    owners?: number,
    background?: string,
    sold?: number,
    items?: number,
    description?: string,
}

export interface MobileNavProps {
    visible: boolean,
    visibility: any
}

export interface MetaProps {
    title?: string,
    keyword?: string,
    desc?: string
}

export interface StatsProps {
    visible: boolean
}

export interface LayoutProps {
    children: ReactFragment.ReactNode
}