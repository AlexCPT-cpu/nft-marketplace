import axios from "axios";

const fetch = async (method: string, url: string, payload?: any) => {
  if (method === "GET") {
    const response = await axios.get(url, payload);
    return response;
  } else if (method === "POST") {
    const response = await axios.post(url, payload);
    return response;
  } else {
    const response = await axios.delete(url, {
      data: {
        payload,
      }
    });
    return response;
  }
};

export default fetch;
