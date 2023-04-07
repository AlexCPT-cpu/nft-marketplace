// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage } from "nft.storage";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { file } = req.body;
      const NFT_STORAGE_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM5OTQxNjAzMWIxMTJkQTZjZWUxMjFDOWU5MDZlMDQwQjhCN2ZjMjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NjczMDM4MDg3NCwibmFtZSI6IkhhYzMzMyJ9.P7FAjJxHj5ng_5Y2MKxvXlAJ8WenG2jt7JQTbHow1_4";
      const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
      const imageFile = new File([file], "nft.png", { type: "image/png" });
      const metadata = await client.store({
        name: "My sweet NFT",
        description: "Just try to funge it. You can't do it.",
        image: imageFile,
      });
      res.json(metadata);
    } catch (ex) {
      console.log(ex);
      //res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
