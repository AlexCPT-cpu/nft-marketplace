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
        name,
        logo,
        collectionAddress,
        image,
        background,
        instaUsername,
        twitterUsername,
        facebookUsername,
        volume,
        items,
        owners,
        sold,
        likes,
        floorPrice,
        description,
      } = req.body;

      const user = await prismadb.user.update({
        where: {
          address,
        },
        data: {
          collections: {
            create: [
              {
                name,
                logo,
                collectionAddress,
                image,
                background,
                instaUsername,
                twitterUsername,
                facebookUsername,
                volume,
                items,
                owners,
                sold,
                likes,
                floorPrice,
                description,
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
