import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { UserInfoIcon } from "../icons/UserInfo";
import { MenuItem } from "./MenuItem";

type UserDropDownProps = {
  name: string | null | undefined;
};

export const UserDropDown = ({ name }: UserDropDownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button className="flex">
            <UserInfoIcon />
          </Menu.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md  bg-white shadow-lg outline-none ring-1 ring-gray-200 "
            >
              <div className="p-3">
                <p>Signed in as</p>
                <p className="whitespace-normal break-words font-mono font-medium">
                  {name}
                </p>
              </div>
              <MenuItem onClick={() => void signOut()}>Sign out</MenuItem>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
