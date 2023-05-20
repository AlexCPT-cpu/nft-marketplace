import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { User, NFT, Activity } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | NFT | Activity | any>
) {
  if (req.method === "POST") {
    const {
      tokenId,
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
        nftId: Number(tokenId),
      },
    });

    const collection = await prismadb.collection.findFirst({
      where: {
        address: collectionAddress,
      },
    });
    try {
      if (activityType === "Sell") {
        if (!findNft) {
          const createdNft = await prismadb.nFT.create({
            data: {
              collectionId: collection?.id,
              nftId: Number(tokenId),
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
              price,
              from,
              fromAddress,
              to,
              toAddress,
              time,
              nftId: createdNft?.id,
              tokenId: String(createdNft?.nftId),
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
        } else {
          const nft = await prismadb.nFT.findFirst({
            where: {
              collectionAddress,
              nftId: tokenId,
            },
          });

          const activity = await prismadb.activity.create({
            data: {
              activityType,
              collectionAddress,
              price,
              from,
              fromAddress,
              to,
              toAddress,
              time,
              nftId: nft?.id,
              tokenId,
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
              listedPrice: 0,
              isSell: false,
            },
          });

          res.status(200).json(activity);
        }
      } else if (activityType === "Buy") {
        const coll = await prismadb.collection.update({
          where: {
            id: collection?.id,
          },
          data: {
            volume: {
              increment: price,
            },
            sold: {
              increment: 1,
            },
          },
        });

        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId: tokenId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
            tokenId,
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
            listedPrice: 0,
            isSell: false,
          },
        });

        res.status(200).json(activity);
      } else if (activityType === "PlaceBid") {
        const coll = await prismadb.collection.update({
          where: {
            id: collection?.id,
          },
          data: {
            volume: {
              increment: price,
            },
          },
        });

        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId: tokenId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
            tokenId,
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
            listedPrice: 0,
            isSell: false,
          },
        });

        res.status(200).json(activity);
      } else if (activityType === "CancelBid") {
        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId: tokenId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
            tokenId,
          },
        });

        res.status(200).json(activity);
      } else if (activityType === "AcceptBid") {
        const coll = await prismadb.collection.update({
          where: {
            id: collection?.id,
          },
          data: {
            volume: {
              increment: price,
            },
            sold: {
              increment: 1,
            },
          },
        });

        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId: tokenId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
            tokenId,
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
            listedPrice: 0,
            isSell: false,
          },
        });

        res.status(200).json(activity);
      } else {
        const nft = await prismadb.nFT.findFirst({
          where: {
            collectionAddress,
            nftId: tokenId,
          },
        });

        const activity = await prismadb.activity.create({
          data: {
            activityType,
            collectionAddress,
            price,
            from,
            fromAddress,
            to,
            toAddress,
            time,
            nftId: nft?.id,
            tokenId,
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
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "GET") {
    const activities = await prismadb.activity.findMany();
    res.status(200).json(activities);
  } else {
    res.status(500).end();
  }
}
