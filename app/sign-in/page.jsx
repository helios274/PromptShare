"use client";
import { useEffect } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl: "http://localhost:3000/api/auth/callback/credentials",
      });
      if (res.ok) {
        router.push("/");
        toast.success(`Welcome, @${values.username}`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 3000,
        });
      } else {
        toast.error(`Login Error`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
          autoClose: 3000,
        });
      }
    },
  });
  return (
    <div className="mt-8 mb-20">
      <div className="relative sm:w-[30rem] bg-white/50 px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-2xl sm:px-10">
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-3xl font-bold">Welcome Back</h1>
          <div className="mt-7 text-sm">
            <p>test username: test123</p>
            <p>test password: test1234</p>
          </div>
          <form
            className="mt-2 flex flex-col justify-items-center"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              placeholder="Username"
              className="form-input border-cyan-200 focus:border-cyan-400"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-input border-cyan-200 focus:border-cyan-400"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            <button type="submit" className="mt-4 mb-6  btn-cyan-outline">
              Sign In
            </button>
          </form>
          <hr className="mx-4 border-[1.5px] rounded-full border-cyan-200" />
          <button
            type="submit"
            className="mt-6 btn-cyan-outline flex gap-2 justify-center"
            onClick={() => {
              signIn("google");
            }}
          >
            Sign in with Google
            <Image
              src="/assets/icons/google.svg"
              alt="google-icon"
              width={20}
              height={20}
              className="mt-[0.5px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
