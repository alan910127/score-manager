import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserDropDown } from "./UserDropdown";

export const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="fixed flex w-full justify-between border-b-2 border-gray-200 bg-white px-12 py-3 dark:bg-gray-900">
      <Link
        href="/"
        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        Score Manager
      </Link>
      <ul className="flex gap-5">
        <li className="flex items-center">
          <Link href="/baba">About</Link>
        </li>
        {session && (
          <li className="flex items-center justify-center">
            <UserDropDown name={session.user?.name} />
          </li>
        )}
      </ul>
    </nav>
  );
};
