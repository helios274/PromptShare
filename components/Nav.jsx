"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

export const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <nav className="flex-between w-full py-3 mt-2 sm:mt-4">
      <Link href="/" className="flex gap-1 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="ChatterVerse logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <div className="text-lg sm:text-xl font-serif font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          PromptShare
        </div>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="btn-black">
              Create Post
            </Link>
            <button
              className="btn-red-outline"
              type="button"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="ChatterVerse logo"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/sign-in" className="btn-black">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-black">
              Sign Up
            </Link>
            {/* {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="btn-black"
                >
                  Sign In
                </button>
              ))} */}
          </div>
        )}
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="ChatterVerse logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-4 w-full btn-black"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/sign-in" className="btn-black">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn-black-sm">
              Sign Up
            </Link>
            {/* {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="btn-black-sm"
                >
                  Sign In
                </button>
              ))} */}
          </div>
        )}
      </div>
    </nav>
  );
};
