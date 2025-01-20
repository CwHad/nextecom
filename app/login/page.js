"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success("Logged in successfully");
        // router.push("/")
        router.push(callBackUrl);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
          <div className="col-lg-5 shadow bg-light p-5">
            <h2 className="mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-4"
                placeholder="Enter Your Email"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-4"
                placeholder="Enter Your password"
              />

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary btn-raised"
                  disabled={loading || !email || !password}
                >
                  {loading ? "Please wait.." : "Submit"}
                </button>

                <Link className="btn" href="/forgot-password">
                  <small>Forgot Password</small>
                </Link>
              </div>
            </form>

            <button
              className="btn btn-danger btn-raised mb-4"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
