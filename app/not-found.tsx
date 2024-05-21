import Link from "next/link";

export default function notFound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10 min-h-[63vh]">
                <h1 className="text-3xl text-primary mb-2">404 - Not found</h1>
                <h2 className="text-xl text-secondary mb-10">Go back to homepage or search for something in the upper right corner</h2>
                <Link href="/">
                    <button className="btn btn-primary" >Back to homepage</button>
                </Link>
            </div>
        </>
    )
}
