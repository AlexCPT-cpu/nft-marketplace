import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { User } from "@prisma/client";

type Data = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Data | any>
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

      const existingUser = await prismadb.user.findUnique({
        where: {
          address,
        },
      });

      if (existingUser) {
        return res.status(422).json({ error: "Address taken" });
      }

      const user = await prismadb.user.create({
        data: {
          address,
          name,
          description: bio,
          instaUsername: instagram ?? "",
          twitterUsername: twitter ?? "",
          facebookUsername: "",
          username: userName,
          image: image ?? "",
          background: background ?? "",
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
