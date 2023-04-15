import axios from "axios";

const fetcher = async (url: string, address: string) =>
  await axios
    .post(url, {
      address: address,
    })
    .then((res) => res.data);

export default fetcher;
