// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collectionAddress, nftId } = req.body;
  if (req.method === "GET") {
    try {
      const nfts = await prismadb.nFT.findMany();
      res.status(200).json(nfts);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else if (req.method === "POST") {
    const nft = await prismadb.nFT.findFirst({
      where: {
        collectionAddress,
        nftId,
      },
    });
    res.status(200).json(nft);
  } else {
    res.status(500).end();
  }
}
