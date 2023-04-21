import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | any>
) {
  if (req.method === "POST") {
    try {
      const {
        address,
        nftId,
        category,
        isAuctioned,
        isOffered,
        isSell,
        latestBid,
        latestOffer,
        auctionTimer,
        likes,
        currentValue,
        image,
        collectionAddress,
        collectionId,
        price,
        currency,
      } = req.body;

      const nft = await prismadb.nFT.create({
        data: {
          nftId: Number(nftId),
          collectionAddress,
          category,
          isAuctioned,
          isOffered,
          latestBid,
          latestOffer,
          auctionTimer,
          likes,
          currentValue,
          image,
          collectionId,
          currency,
          listedPrice: price,
        },
      });

      const updatedUser = await prismadb.user.update({
        where: {
          address,
        },
        data: {
          userNfts: {
            push: nft.id,
          },
        },
      });

      res.status(200).json(updatedUser);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
