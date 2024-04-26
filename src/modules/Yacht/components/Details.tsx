import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content from "./details/Content";
import { Highligts } from "./details/Highlights";
import { Trips } from "./details/Trips";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { DetailsData } from "../interfaces/YachtData";

interface DetailsProps {
    readonly details: DetailsData;
}

export default function Details({details}: DetailsProps) {
    return (
        <>
            <section className="h-[600px] bg-gray-600">XD</section>
            <article className="grid grid-cols-3 gap-x-4">
                <Content data={details.content} />
            </article>
            <article className="flex flex-col">
                <h3 className="font-bold text-gray-500">HIGHLIGHTS</h3>
                <Highligts searches={details.highlights} />
            </article>
            <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: details.mainDescription }} />
            <article className="flex flex-col">
                <h3 className="font-bold text-gray-500">REQUIRED LICENCES</h3>
                <ul>
                    <li>
                        <FontAwesomeIcon className="text-sky-500 text-xl mr-1" icon={faCheck} />
                        <span dangerouslySetInnerHTML={{ __html: details.krnRequiredPermissionsDescription }} />
                    </li>
                </ul>
            </article>
            <article className="flex flex-col">
                <h3 className="font-bold text-gray-500">SUGGESTED ROUTE</h3>
                <Trips trips={details.trips} />
            </article>
        </>
    )
}