import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { Collection, User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Collection>
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
        description,
      } = req.body;

      const collection = await prismadb.collection.create({
        data: {
          name,
          logo: '',
          address: collectionAddress,
          background: '',
          instaUsername,
          twitterUsername,
          facebookUsername,
          volume: 0,
          sold: 0,
          likes: 2,
          floorPrice: 0,
          description,
          creator: '',
        },
      });

      res.status(200).json(collection);
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
