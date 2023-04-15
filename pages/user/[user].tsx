import User from "@/components/User/User";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <div className="mt-28">
      {/*@ts-ignore*/}
      <User userAddr={user} />
    </div>
  );
};

export default UserPage;
