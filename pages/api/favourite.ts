// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId, userId } = req.body;
  if (req.method === "POST") {
    try {
      const nft = await prisma.nFT.update({
        where: {
          id: nftId,
        },
        data: {
          likeIds: {
            push: userId,
          },
        },
      });
      res.status(200).json(nft);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else if (req.method === "DELETE") {
    try {
      const nft = await prisma.nFT.findUnique({
        where: {
          id: nftId,
        },
      });

      if (!nft) {
        throw new Error("Invalid ID");
      }

      const updatedIds = without(nft.likeIds, userId);

      const updatedNft = await prisma.nFT.update({
        where: {
          id: nftId,
        },
        data: {
          likeIds: updatedIds,
        },
      });

      res.status(200).json(updatedNft);
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
