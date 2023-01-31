import { env } from "@/env/client.mjs";
import { Menu, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { AiOutlineLock } from "react-icons/ai";
import { type Role } from "./mockUsers";

export const RoleSwitch = () => {
  if (!env.NEXT_PUBLIC_MOCK_NEXTAUTH) return null;

  const switchRole = async (role: Role) => {
    await signIn("mock-nycu", { role }).catch(console.error);
  };

  return (
    <Menu as="div" className="fixed bottom-4 right-4 text-white">
      {({ open }) => (
        <>
          <Menu.Button className="flex rounded-full bg-black p-4">
            <AiOutlineLock size={32} />
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
              className="absolute flex -translate-x-full -translate-y-full flex-col gap-4 rounded-lg bg-black/50 px-8 py-4"
            >
              <Menu.Item
                as="button"
                className="whitespace-nowrap"
                onClick={() => void switchRole("admin")}
              >
                As Admin
              </Menu.Item>
              <Menu.Item
                as="button"
                className="whitespace-nowrap"
                onClick={() => void switchRole("ta")}
              >
                As TA
              </Menu.Item>
              <Menu.Item
                as="button"
                className="whitespace-nowrap"
                onClick={() => void switchRole("student")}
              >
                As Student
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
