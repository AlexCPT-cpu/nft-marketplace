export type social = string;

export type Item = {
  name?: string;
  image?: string;
};

export interface NftProps {
  image?: string;
  name?: string;
  timer?: string;
  likes?: number;
  price?: number;
  nftAddress?: string
}

export interface CreatorProps {
  image?: string;
  name?: string;
  address?: string;
  background?: string;
  followers?: number;
  items?: number;
  socials: social[];
}

export interface CollectionProps {
  image?: string;
  name?: string;
  owners?: number;
  background?: string;
  sold?: number;
  items?: number;
  description?: string;
}

export interface MobileNavProps {
  visible: boolean;
  visibility: any;
}

export interface MetaProps {
  title?: string;
  keyword?: string;
  desc?: string;
}

export interface StatsProps {
  visible: boolean;
}

export interface LayoutProps {
  children: ReactFragment.ReactNode;
}

export interface RankingItemProps {
  name?: string;
  volume?: number;
  tw4?: number;
  svd?: number;
  floor?: number;
  owners?: number;
  items?: number;
}

export interface ActivityItemProps {
  event?: string;
  items?: Item;
  price?: number;
  from?: string;
  to?: string;
  time?: string;
}

export interface UserCardProps {
  image?: string;
  name?: string;
  desc?: string;
  username?: string;
  referrer?: string;
}

export interface UserNftGrid {
  active?: ActiveProps;
}

export interface ActiveProps {
  created?;
  collected?;
  collections?;
  offersReceived?;
  offersMade?;
}

export interface HistoryProps {
  title?;
  sub?;
  item1?;
  item2?;
}

export interface PropertyProps {
  title?;
  trait?;
  value?;
}

export interface CollectionCardProps {
  image?;
  name?;
  desc?;
  username?;
  items?;
  owners?;
  floor?;
  volume?;
}

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  title?: string;
}

export interface ApproveProps {
  collectionAddress: string;
}

export interface CreateSell {
  collectionAddress?: string;
  tokenId?: number;
  payToken?: string;
  price?: number;
}

export interface AcceptOffer {
  collectionAddress?: string;
  tokenId?: number;
  offerer?: string;
}

export interface CreateAuctionProps {
  collectionAddress?: string;
  tokenId?: number;
  payToken?: string;
  price?: number;
  minBid?: number;
  startTime?: number;
  endTime?: number;
}

export interface NftData {
  balance: number;
  contract: any;
  description: string;
  media: [
    {
      bytes: number,
      format: string,
      gateway: string,
      raw: string,
      thumbnail: string,
    }
  ];
  rawMetadata: {
    attributes: [],
    compiler?: string,
    date: number,
    description: string,
    dna?: string,
    edition?: string,
    image?: string,
    name?: string,
  };
  timeLastUpdated: string;
  title: string;
  tokenId: string;
  tokenType: string;
  tokenUri: {
    gateway: string;
    raw: string;
  };
}

export interface ModalProps {
  isOpen: boolean,
  setIsOpen: (state: boolean) => void,
  fileUrl?: string,
  previewData?: any
}