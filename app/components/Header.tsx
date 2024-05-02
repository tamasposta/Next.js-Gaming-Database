'use client'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const navigation = [
    { name: 'Homepage', href: '/', current: true },
    { name: 'My Games', href: '/games', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const Header = () => {

    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (searchText) {
            router.push(`/games/search?query=${searchText}`);
        }
    }
    console.log("Search Text:", searchText)

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex flex-wrap h-16 items-center justify-between">
                            <div className="relative inset-y-0 left-0 flex max-sm:w-1/3 items-center sm:hidden">
                                {/* Mobile menu button*/}
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
                            <div className="flex flex-1 max-sm:w-1/3 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <a href="/"><img
                                        className="h-10 w-auto"
                                        src="/gaming-database-logo.svg"
                                        alt="Gaming Database logo"
                                    /></a>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Search form */}
                            <div className="flex max-sm:w-1/3 mx-auto max-w-md justify-end">
                                <form
                                    onSubmit={handleSubmit}
                                    className="relative max-sm:absolute max-sm:top-3 mx-auto w-max"
                                >
                                    <div className="relative bg-neutral">
                                        <input
                                            onChange={e => setSearchText(e.target.value)}
                                            type="search"
                                            id="default-search"
                                            className="peer cursor-pointer relative z-10 focus:z-0 h-10 w-12 rounded-lg bg-transparent border-2 border-primary pl-12 outline-none focus:w-full focus:cursor-text focus:border-secondary focus:pl-16 focus:pr-4"
                                            placeholder="Search games..."
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="absolute bg-neutral inset-y-0 left-0 my-auto h-8 w-12 border-l border-transparent stroke-primary px-3.5 peer-focus:border-secondary peer-focus:stroke-secondary cursor-pointer"
                                            onClick={handleSubmit}
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
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Header