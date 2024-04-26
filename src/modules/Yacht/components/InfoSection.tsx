import { ReactNode } from "react";

interface InfoSectionProps {
    readonly id: string;
    readonly children: ReactNode;
    readonly title?: string;
}

export function InfoSection({id, children, title}: InfoSectionProps) {
    return (
        <section className="w-full relative">
            <div id={id} className="h-navbar top-[-64px] absolute w-full pointer-events-none select-none"/>
            {
                title
                ? <h2 className="bg-[#64828e] p-4 text-center text-white text-2xl font-bold">{title}</h2>
                : <></>
            }
            <article className="bg-white p-4 flex flex-col gap-2">{children}</article>
        </section>
    )
}