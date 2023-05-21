// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { followId, userId } = req.body;
  if (req.method === "POST") {
    try {
      const followed = await prisma.user.update({
        where: {
          id: followId,
        },
        data: {
          followerIds: {
            push: userId,
          },
        },
      });

      const follower = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followIds: {
            push: followId,
          },
        },
      });
      res.status(200).json({ followed, follower });
    } catch (ex) {
      console.log(ex);
      res.status(500).end();
    }
  } else if (req.method === "DELETE") {
    try {
      const followed = await prisma.user.findUnique({
        where: {
          id: followId,
        },
      });

      const follower = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      const updatedFollow = without(followed?.followerIds, userId);
      const updatedUser = without(follower?.followIds, followId);

      const updated1 = await prisma.user.update({
        where: {
          id: followId,
        },
        data: {
          followerIds: updatedFollow,
        },
      });
      const updated2 = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followIds: updatedUser,
        },
      });

      res.status(200).json({ updated1, updated2 });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
