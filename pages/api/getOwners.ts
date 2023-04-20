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
  res: NextApiResponse<Data | any>
) {
  const config = {
    apiKey: process.env.ALCHEMY_ID,
    network: Network.ETH_GOERLI,
  };
  if (req.method === "POST") {
    try {
      const { address } = req.body;

      const alchemy = new Alchemy(config);
      const owners = await alchemy.nft.getOwnersForContract(address);
      res.status(200).json(owners);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
