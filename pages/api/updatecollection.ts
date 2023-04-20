import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === "POST") {
    try {
      const {
        address,
        creator,
        name,
        logo,
        collectionAddress,
        background,
        instaUsername,
        twitterUsername,
        facebookUsername,
        items,
        owners,
        description,
      } = req.body;

      const collection = await prismadb.collection.create({
        data: {
          name,
          logo,
          address: collectionAddress,
          background,
          instaUsername,
          twitterUsername,
          facebookUsername,
          volume: 0,
          items,
          owners,
          sold: 0,
          likes: 0,
          floorPrice: 0,
          description,
          creator,
        },
      });

      const updatedUser = await prismadb.user.update({
        where: {
          address,
        },
        data: {
          collections: {
            push: collection.id,
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
