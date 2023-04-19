import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === "POST") {
    try {
      const { address, nftId, category, isAuctioned, isOffered, latestBid, latestOffer, auctionTimer, likes, currentValue, image } = req.body;

      const user = await prismadb.user.update({
        where: {
          address,
        },
        data: {
          userNfts: {
            create: [
              {
                nftId: 1,
                collectionAddress: "",
                category: "",
                isAuctioned: false,
                isOffered: false,
                latestBid: 0,
                latestOffer: 0,
                auctionTimer: 0,
                likes: 0,
                currentValue: 0,
                image: "",
              },
            ],
          },
        },
      });

      res.status(200).json(user);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
