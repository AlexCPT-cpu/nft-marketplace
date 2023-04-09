// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
    } catch (ex) {
      console.log(ex);
      //res.status(500).end();
    }
  } else {
    res.status(500).end();
  }
}
