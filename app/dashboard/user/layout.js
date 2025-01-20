import UserNav from "@/components/nav/UserNav";

const UserDashboard = ({ children }) => {
  return (
    <>
      {<UserNav />}
      {children}
    </>
  );
};

export default UserDashboard;
