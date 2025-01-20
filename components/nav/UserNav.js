import Link from "next/link";

const UserNav = () => {
  return (
    <nav className="nav justify-content-center mb-3">
      <Link href="/dashboard/user" className="nav-link">
        Dashboard
      </Link>
      <Link href="/dashboard/user/orders" className="nav-link">
        Orders
      </Link>

    </nav>
  );
};

export default UserNav;
