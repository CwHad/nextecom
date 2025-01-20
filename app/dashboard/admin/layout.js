import AdminNav from "@/components/nav/AdminNav";

const AdminDashboard = ({ children }) => {
  return (
    <>
      {<AdminNav />}
      {children}
    </>
  );
};

export default AdminDashboard;
