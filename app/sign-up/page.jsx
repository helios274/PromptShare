"use client";
import validateSignUp from "@utils/validation";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/");
      toast.info("You are already signed in!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
  }, [session, router]);
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: validateSignUp,
    onSubmit: async (values) => {
      console.log(values);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      const res = await fetch("/api/auth", options);
      const data = await res.json();
      if (data?.success) {
        router.push("/sign-in");
        toast.success(data?.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_CENTER,
          theme: "dark",
        });
      }
    },
  });
  return (
    <div className="mt-8 mb-6">
      <div className="relative sm:w-[30rem] bg-white/50 px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-2xl sm:px-10">
        <div className="flex flex-col justify-center">
          <h1 className="text-center text-3xl font-bold">Sign Up</h1>
          <form
            className="mt-8 flex flex-col justify-items-center"
            onSubmit={formik.handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              className={`form-input ${
                formik.errors.email && formik.values.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-cyan-400 focus:border-green-400"
              }`}
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Username"
                className={`form-input ${
                  formik.errors.username && formik.values.username
                    ? "border-red-400 focus:border-red-400"
                    : "border-cyan-400 focus:border-green-400"
                }`}
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                required
              />
              <Image
                className="cursor-pointer"
                src="assets/icons/info.svg"
                alt="info"
                width={30}
                height={30}
                onClick={() => {
                  toast.info(
                    "Username must be 6-20 characters long and alphanumeric",
                    {
                      position: toast.POSITION.TOP_CENTER,
                    }
                  );
                }}
              />
            </div>

            <div className="flex gap-1">
              <input
                type="password"
                placeholder="Password"
                className={`form-input ${
                  formik.errors.password && formik.values.password
                    ? "border-red-400 focus:border-red-400"
                    : "border-cyan-400 focus:border-green-400"
                }`}
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
              <Image
                className="cursor-pointer"
                src="assets/icons/info.svg"
                alt="info"
                width={30}
                height={30}
                onClick={() => {
                  toast.info("Password must be 8-20 characters long", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }}
              />
            </div>
            <button type="submit" className="mt-4 mb-6 btn-cyan-outline">
              Sign Up
            </button>
            <hr className="mx-4 border-[1.5px] rounded-full border-cyan-200" />
            <button
              type="submit"
              className="mt-6 btn-cyan-outline flex gap-2 justify-center"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
