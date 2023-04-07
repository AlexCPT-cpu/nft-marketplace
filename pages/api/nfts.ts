// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network } from "alchemy-sdk";

type Data = {
  blockHash: string;
  ownedNfts: any[];
  totalCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const config = {
    apiKey: "br-vL2X5K6ZxKDZ8N_U9sEnkIkba9Zw6",
    network: Network.ETH_GOERLI,
  };
  if (req.method === "POST") {
    try {
      const { address } = req.body;

      const alchemy = new Alchemy(config);
      const nfts = await alchemy.nft.getNftsForOwner(address);
      res.status(200).json(nfts);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
