import Opinion from "@/modules/Yacht/api/dto/Opinion";
import { StarRating } from "@/components/StarRating";

export function OpinionsList({opinions} : {opinions: Opinion[]}) {
    return (
        <ul className="text-primary text-xs">
            {
                opinions.map(opinion => 
                    <li className="my-4" key={opinion.id}>
                        <div className="flex">
                            <span className="flex-1">{opinion.signature}</span>
                            <a href={opinion.yachtUrl} className="flex-1 hover:underline cursor-pointer font-bold">{opinion.yachtModelName} {opinion.yachtName}</a>
                            <span className="flex-1">EXCELENT | GOOD | VERY GOOD</span>
                            <StarRating className="flex-1" rating={opinion.rate} />
                        </div>
                    </li>
                )
            }
        </ul>
    );
}