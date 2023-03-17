import UserCard from "../Cards/UserCard";
import UserNav from "./UserNav";

const User = () => {
  return (
    <div className="flex space-y-14 flex-col mt-36 mx-auto justify-center items-center w-full px-8 lg:px-16">
        <UserCard />
        <UserNav />
  </div>
  )
}

export default User