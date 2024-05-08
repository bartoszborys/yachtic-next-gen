import getYacht from "@/modules/Yacht/api/queries/getYacht";
import { PermalinkPageProps } from "../Permalink/props/permalinkPageProps";
import Header from "./components/Header";
import Details from "./components/Details";
import Booking from "./components/Booking";
import { fromYachtDto } from "./factories/yachtData";
import getYachtSpecification from "@/modules/Yacht/api/queries/getYachtSpecification";
import { InfoSection } from "./components/InfoSection";
import ServiceRow from "./components/ServiceRow";
import { SpecificationAndEquipment } from "./components/SpecificationAndEquipment";
import { StarRating } from "@/components/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import getOpinions from "@/modules/Yacht/api/queries/getOpinions";
import { OpinionsList } from "./components/OpinionsList";
import getPrices from "@/modules/Yacht/api/queries/getPrices";

export async function Yacht({ locale, permalink, searchParams }: PermalinkPageProps) {
    const [
        yachtDto,
        yachtSpecification,
        opinions,
    ] = await Promise.all([
        getYacht({ id: permalink.modelId }),
        getYachtSpecification({ id: permalink.modelId }),
        getOpinions(permalink.modelId),
        // getPrices(permalink.modelId, 2306),
    ]);

    const yachtData = fromYachtDto(yachtDto);

    const servicesRows = yachtData
            .booking
            .services
            .filter(service => service.isOptional)
            .map(service => <ServiceRow service={service} key={service.name} />);

    return (
        <>
            <div className="content-container flex-1 w-full flex flex-col mx-auto my-12 gap-8">
                <section className="p-4 w-full flex flex-col bg-white gap-2">
                    <section className="flex-1 flex justify-between">
                        <Header data={yachtData.header} />
                    </section>
                    <div className="flex gap-2">
                        <section className="flex-[12] flex flex-col gap-4">
                            <Details details={yachtData.details} />
                            <span className="flex my-4 ml-2 gap-24">
                                <b>More details:</b>
                                <nav className="flex">
                                    <a className="text-primary hover:underline font-bold" href="#specification-and-equipment">Specification and equipment</a>
                                    <a className="text-primary hover:underline font-bold border-x px-4 mx-4 border-primary" href="#optional-extras">Extras</a>
                                    <a className="text-primary hover:underline font-bold" href="#customer-reviews">Customers reviews</a>
                                </nav>
                            </span>
                        </section>
                        <section className="flex-[5] flex flex-col">
                            <Booking data={yachtData.booking} />
                        </section>
                    </div>
                </section>

                <InfoSection id="specification-and-equipment" title="SPECIFICATION AND EQUIPMENT">
                    <SpecificationAndEquipment yachtSpecification={yachtSpecification}/>
                </InfoSection>

                <InfoSection id="optional-extras" title="EXTRAS (optional)">{servicesRows}</InfoSection>

                <InfoSection id="customer-reviews">
                    <div className="flex justify-between text-secondary text-xl">
                        <h2>
                            <b>Boats rate {yachtData.header.modelName} <i>{yachtData.header.yachtName}</i></b>
                        </h2>
                        <StarRating rating={yachtData.header.rating} />
                    </div>
                    {
                        (opinions.length > 0)
                            ? <OpinionsList opinions={opinions.filter(opinion => (opinion.yachtId === permalink.modelId))}/>
                            : <b className="text-secondary text-lg">No reviews.</b>
                    }
                    <button className="bg-success text-white font-bold p-3 text-sm">
                        <FontAwesomeIcon className="mx-2" icon={faEdit} />
                        <>ADD REVIEW</>
                    </button>
                    <div className="flex justify-between text-secondary text-xl">
                        <h2>
                            <b>Reviews of other yachts by operator {yachtData.companyName} at this marina:</b>
                        </h2>
                    </div>
                    {
                        (opinions.length > 0)
                            ? <OpinionsList opinions={opinions.filter(opinion => (opinion.yachtId !== permalink.modelId))}/>
                            : <b className="text-secondary text-lg">Brak opinii klientów.</b>
                    }
                </InfoSection>
                <InfoSection id="other-yachts" title="OTHER YACHTS AT THIS DATE">
                    <div>XD</div>
                </InfoSection>
            </div>
        </>
    );
}