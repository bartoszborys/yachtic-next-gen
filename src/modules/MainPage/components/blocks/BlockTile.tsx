import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export function BlockTitle({ name, icon }: { name: string, icon: IconProp }): ReactNode {
    return (
        <div className="flex gap-2 mb-4">
            <FontAwesomeIcon className="text-sky-500 text-lg my-auto" icon={icon} />
            <h2 className="font-bold text-xl my-auto">{name}</h2>
        </div>
    )
}
