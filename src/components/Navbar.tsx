import React from "react";
import { FiPhone } from "react-icons/fi";
// import Menu from "./Menu";
import Link from "next/link";
// import CartIcon from "./CartIcon";
import Image from "next/image";
// import UserLinks from "./UserLinks";
import Logo from "./Logo";
import { checkUser } from "@/lib/checkUser";

import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

const Navbar = async () => {
  const user = await checkUser();
  return (
    <div className="text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contatto</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/"><Logo /></Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* <Menu /> */}
      </div>
      {/* RIGHT LINKS */}
      <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-yellow-100 px-1 rounded-md">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-yellow-100 px-1 rounded-md">
          <FiPhone />
          <span>324 056 0356</span>
        </div>
        {/* <UserLinks/>
        <CartIcon /> */}
      </div>
    </div>
  );
};

export default Navbar;