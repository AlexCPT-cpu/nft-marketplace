import useUser from "@/hooks/useUser";
import UserCard from "../Cards/UserCard";
import UserNav from "./UserNav";

const User = ({ userAddr }: { userAddr: string }) => {

  const { user } = useUser(userAddr);

  if (!user) return;
  return (
    <div className="flex space-y-14 flex-col mt-36 mx-auto justify-center items-center w-full px-8 lg:px-16">
      <UserCard
        followers={user.followerIds}
        follows={user.followIds}
        name={user.name}
        desc={user.description}
        image={user.image}
        username={user.username}
        referrer={user.invitedBy}
        facebook={user.facebookUsername ?? ''}
        twitter={user.twitterUsername ?? ''}
        instagram={user.instaUsername ?? ''}
      />
      <UserNav />
    </div>
  );
};

export default User;
