import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActionLinkProps {
    readonly icon: IconProp;
    readonly text: string;
}

export function ActionLink({icon, text}: ActionLinkProps) {
    return (
        <li className="text-primary cursor-pointer m-2">
            <FontAwesomeIcon className="mx-8 w-8 text-center" icon={icon} />
            <button className="hover:underline">{text}</button>
        </li>
    )
}