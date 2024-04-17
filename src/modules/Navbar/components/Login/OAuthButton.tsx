import Image from "next/image";
import { ReactElement } from "react";

interface OAuthButtonProps {
    text: string;
    src?: string;
}

export function OAuthButton({ text, src }: OAuthButtonProps): ReactElement {
    return (
        <button className="border border-[#00a0e3] hover:bg-[#0ba4e4] text-[#0ba4e4] hover:text-white text-xs py-2 px-6 flex">
            <Image width={25} height={25} alt="OAuth icon" src={src || ""} />
            <b className="flex-1 my-auto">{text}</b>
        </button>
    )
}