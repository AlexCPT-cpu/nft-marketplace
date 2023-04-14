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
        facebook,
        userName,
        twitter,
        instagram,
        bio,
        image,
        background,
        invited,
      } = req.body;

      const user = await prismadb.user.create({
        data: {
          address,
          name,
          description: bio,
          instaUsername: instagram ?? "",
          twitterUsername: twitter ?? "",
          facebookUsername: facebook ?? "",
          username: userName,
          image: image ?? "",
          background: background ?? "",
          followerIds: [],
          followIds: [],
          invitedBy: invited ?? "",
          volume: 0,
          items: 0,
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
