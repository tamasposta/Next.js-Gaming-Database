"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent } from "react";
import { useAuth } from "./auth-provider";
import { NavigationItem } from "../types/navigation-item.types";
import useNavigation from "../hooks/use-navigation";
import { navigation } from "../utils/navigation";
import { classNames } from "../utils/classnames-menu";

export default function Header() {
  const { handleSubmit, setSearchText } = useNavigation();
  const { isLoading, logout, user } = useAuth();
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-start justify-between py-2 lg:h-16 lg:items-center lg:pt-0">
              <div className="flex flex-1 items-start w-1/4 xl:w-2/5 justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="h-10 w-auto"
                      src="/gaming-database-logo.svg"
                      alt="Gaming Database logo"
                      width="200"
                      height="200"
                    />
                  </Link>
                </div>
                <div className="ml-6 hidden xl:block">
                  <div className="flex space-x-4">
                    {navigation &&
                      navigation.map(
                        (
                          { name, href }: NavigationItem,
                          index: number
                        ) => {
                          const isCurrent = pathname === href;
                          return (
                            <Link
                              key={index}
                              href={href}
                              className={classNames(
                                isCurrent
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={isCurrent ? "page" : undefined}
                            >
                              {name}
                            </Link>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
              
              <div className="w-1/2 px-2 lg:static items-center justify-center xl:w-1/5 lg:px-0 lg:pt-0">
                <form
                  onSubmit={handleSubmit}
                  className="relative mx-auto w-full lg:w-max"
                >
                  <div className="relative bg-neutral">
                    <input
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setSearchText(event.target.value)
                      }
                      type="search"
                      id="default-search"
                      className="peer relative z-10 h-10 w-full cursor-pointer rounded-lg border-2 border-primary bg-transparent pl-12 outline-none focus:z-0 focus:cursor-text focus:border-secondary lg:w-auto"
                      placeholder="Search games..."
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 z-20 left-0 my-auto h-8 w-12 border-r-2 border-l border-transparent stroke-primary px-3.5 peer-focus:stroke-secondary cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="primary"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex w-1/4 items-center justify-end xl:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden w-2/5 justify-end gap-2 xl:flex">
                <div className="flex items-center gap-2">
                  {isLoading ? null : user ? (
                    <>
                      <Link href="/favorites" className="btn btn-sm btn-ghost text-warning">
                        ★ My Favorites
                      </Link>
                      <Link href="/wishlist" className="btn btn-sm btn-ghost text-accent">
                        ❤︎ My Wishlist
                      </Link>
                      <Link href="/profile" className="btn btn-sm btn-ghost">
                        🙎‍♂️ Profile
                      </Link>
                      <button type="button" onClick={() => void logout()} className="btn btn-sm btn-outline">
                        ➥ Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/login" className="btn btn-sm btn-primary">
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="xl:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation &&
                navigation.map(
                  ({ name, href }: NavigationItem, index: number) => {
                    const isCurrent = pathname === href;
                    return (
                      <Disclosure.Button
                        key={index}
                        as="a"
                        href={href}
                        className={classNames(
                          isCurrent
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        {name}
                      </Disclosure.Button>
                    );
                  }
                )}
              <div className="border-t border-gray-700 pt-2">
                {user ? (
                  <>
                    <Link href="/favorites" className="block rounded-md px-3 py-2 text-base font-medium text-warning">
                      ★ My Favorites
                    </Link>
                    <Link href="/wishlist" className="block rounded-md px-3 py-2 text-base font-medium text-accent">
                      ❤︎ My Wishlist
                    </Link>
                    <Link href="/profile" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                      🙎‍♂️ Profile
                    </Link>
                    <button type="button" onClick={() => void logout()} className="block w-full bg-gray-700 rounded-md px-3 py-2 text-left text-base font-medium text-gray-300">
                      ➥ Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
