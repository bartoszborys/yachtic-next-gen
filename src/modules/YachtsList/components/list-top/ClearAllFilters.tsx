'use client'

import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export function ClearAllFilters(): ReactNode {
    const router = useRouter();
    const pathname = usePathname();

    const clear = (): void => {
        router.push(pathname);
    }

    return (
        <div className="text-xs cursor-pointer">
            <span className="mr-2">FILTERS</span>
            (<span className="text-[#00a0e3]" onClick={clear}>REMOVE ALL FILTERS</span>)
        </div>
    );
}