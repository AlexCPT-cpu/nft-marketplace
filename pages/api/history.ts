import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import type { Activity, User, NFT } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | NFT | Activity | any>
) {
  const { address, nftId } = req.body;

  if (req.method === "POST") {
    const activities = await prismadb.activity.findFirst({
      where: {
        nftId,
        collectionAddress: address,
      },
    });
    res.status(200).json(activities);
  } else {
    res.status(500).end();
  }
}
