import React from "react";
import Link from "next/link";

function UserLanding() {
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      <Link href="/invoice" legacyBehavior>
        <>
          <a className="group cursor-pointer rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-black">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Invoice
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Create new invoice
            </p>
          </a>
        </>
      </Link>
      <Link href="/users" legacyBehavior>
        <>
          <a className="group cursor-pointer rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 hover:text-black">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Users
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Create, Edit Users
            </p>
          </a>
        </>
      </Link>
    </div>
  );
}

export default UserLanding;
