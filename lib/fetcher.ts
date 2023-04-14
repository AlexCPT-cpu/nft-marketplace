import axios from "axios";

const fetcher = (url: string, address: string) =>
  axios
    .post(url, {
      address: address,
    })
    .then((res) => res.data);

export default fetcher;
