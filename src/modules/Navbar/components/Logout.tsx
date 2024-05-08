'use client'

import { ReactElement, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

interface LogoutProps {
    executeLogout: () => Promise<void>;
}

export default function Logout({executeLogout}: LogoutProps): ReactElement {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleLogout = useCallback(() => {
        startTransition(async () => {
            await executeLogout();
            router.refresh();
        });
    }, []);

    return isPending
        ? <CircularProgress color="inherit" className="mx-5 text-gray-500" variant="indeterminate" size={20} thickness={4} />
        : <div className="text-sky-500 font-bold flex hover:underline cursor-pointer select-none" onClick={handleLogout}>LOGOUT</div>
}