import { MetaProps } from "@/types/types";
import Head from "next/head";

const Meta: React.FC<MetaProps> = ({ title, keyword, desc }) => {
  return (
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
  );
};

Meta.defaultProps = {
  title: "NFT MarketPlace",
  keyword:
    "NFT MarketPlace",
  desc: "NFT MarketPlace.",
};

export default Meta;
