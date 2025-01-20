// export { default } from "next-auth/middleware"

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

// function middleware(req)
export default withAuth(async (req) => {
  const url = req.nextUrl.pathname;
  const userRole = req?.nextauth?.token?.user?.role;

  if(url?.includes("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

}, {
    callbacks: {
        // 会先调用authorized进行验证
        authorized: ( {token} ) => {
            if(!token) {
                return false;
            }
        }
    }
});
