import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useUser = (address: string) => {
  const { data, error, isLoading } = useSWR("/api/user", url => fetcher("/api/user", address));
  
  return { user: data, isLoading, isError: error };
};

export default useUser;
