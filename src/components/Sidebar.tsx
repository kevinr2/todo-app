import Image from "next/image";
import React from "react";
import { CiBookmarkCheck, CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import {
  IoBaseballOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCogOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-action",
  },

  {
    icon: <IoCogOutline />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoBaseballOutline />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

export const Sidebar =  async() => {
  const session = await getServerSession(authOptions)
  const userName = session?.user?.name ?? "no Name"
  const userRoles = session?.user?.roles ?? "Admin"
  const avatarUrl = (session?.user?.image)
    ?session.user.image
    :"https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-3">
          <a href="#" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={150}
              height={150}
              className="w-32"
              alt="tailus logo"
            />
          </a>
        </div>

        <div className="mt-6 text-center">
          <Image
            src={avatarUrl}
            width={100}
            height={100}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">{userRoles}</span>
        </div>

        <ul className=" tracking-wide mt-2">
          {menuItem.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
      </div>
    </aside>
  );
};
