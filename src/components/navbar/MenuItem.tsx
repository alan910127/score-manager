import { Menu } from "@headlessui/react";
import { type MouseEventHandler } from "react";

type MenuItemProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: string | JSX.Element | JSX.Element[];
};

export const MenuItem = ({ onClick, children }: MenuItemProps) => {
  return (
    <>
      <Menu.Item as="div" className="p-1">
        {({ active }) => (
          <button
            className={`${
              active ? "bg-gray-300" : "bg-white"
            }  flex w-full items-center rounded-md px-2 py-2 text-sm`}
            onClick={onClick}
          >
            {children}
          </button>
        )}
      </Menu.Item>
    </>
  );
};
