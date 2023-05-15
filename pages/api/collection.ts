// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Alchemy, Network } from "alchemy-sdk";
import prisma from "@/lib/prismadb";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = {
    apiKey: process.env.ALCHEMY_ID,
    network: Network.ETH_GOERLI,
  };
  if (req.method === "POST") {
    const alchemy = new Alchemy(config);

    try {
      const { address } = req.body;

      const omitMetadata = false;

      // Get all NFTs
      const response = await alchemy.nft.getNftsForContract(address, {
        omitMetadata: omitMetadata,
      });
      res.status(200).json(response);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else  if (req.method === "GET") {
    const collection = await prisma.collection.findMany()
    res.status(200).json(collection);
  } else {
    res.status(500).end();
  }
}
