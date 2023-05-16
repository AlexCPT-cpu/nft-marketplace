import fetch from "@/helpers/fetch";
import { useEffect, useState } from "react";
import UserCard from "../Cards/UserCard";
import UserNav from "./UserNav";

const User = ({ userAddr }: { userAddr: string }) => {
  const [user, setUser] = useState<any>();
  const [userNfts, setUserNfts] = useState<any[]>();

  useEffect(() => {
    const data = async () => {
      const res = await fetch("POST", "/api/user", {
        address: userAddr,
      });
      setUser(res.data);
    };
    data();
  }, [userAddr]);

  useEffect(() => {
    const getNFTs = async () => {
      const response = await fetch("POST", "/api/nfts", {
        address: userAddr,
      });
      return response.data;
    };
    if (userAddr) {
      getNFTs().then((data) => setUserNfts([data?.ownedNfts]));
    }
  }, [userAddr]);

  if (!user) return;
  return (
    <div className="flex space-y-14 flex-col mt-36 mx-auto justify-center items-center w-full px-8 lg:px-16">
      <UserCard
        followers={user.followerIds}
        follows={user.followIds.length}
        name={user.name!}
        desc={user.description!}
        image={user.image!}
        username={user.username!}
        referrer={user.invitedBy!}
        facebook={user.facebookUsername ?? ''}
        twitter={user.twitterUsername ?? ''}
        instagram={user.instaUsername ?? ''}
      />
      <UserNav Nfts={userNfts!} address={userAddr!} />
    </div>
  );
};

export default User;
