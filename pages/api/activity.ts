import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { User, NFT, Activity } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | NFT | Activity | any>
) {
  if (req.method === "POST") {
    try {
      const {
        nftId,
        collectionAddress,
        activityType,
        price,
        from,
        fromAddress,
        to,
        toAddress,
        time,
      } = req.body;

      const findNft = await prismadb.nFT.findFirst({
        where: {
          collectionAddress,
          nftId: Number(nftId),
        },
      });

      if (activityType === "Sell" && !findNft) {
        const collection = await prismadb.collection.findFirst({
          where: {
            address: collectionAddress,
          },
        });
        const createdNft = await prismadb.nFT.create({
          data: {
            collectionId: collection?.id,
            nftId: Number(nftId),
            collectionAddress,
            isAuctioned: false,
            isSell: true,
            isOffered: false,
            currentValue: 0,
            listedPrice: price,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            item: [],
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: createdNft?.id,
          },
        });

        const updated = await prismadb.nFT.update({
          where: {
            id: createdNft?.id,
          },
          data: {
            Activity: {
              push: activity.id,
            },
            currentValue: price,
          },
        });
        res.status(200).json(activity);
      } else if (activityType === "Buy") {
        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            item: [],
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
          },
        });

        const updated = await prismadb.nFT.update({
          where: {
            id: nft?.id,
          },
          data: {
            Activity: {
              push: activity.id,
            },
            currentValue: price,
          },
        });

        res.status(200).json(activity);
      } else {
        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            item: [],
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
          },
        });

        const updated = await prismadb.nFT.update({
          where: {
            id: nft?.id,
          },
          data: {
            Activity: {
              push: activity.id,
            },
          },
        });

        res.status(200).json(activity);
      }
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else if (req.method === "GET") {
    const activities = await prismadb.activity.findMany();
    res.status(200).json(activities);
  } else {
    res.status(500).end();
  }
}
