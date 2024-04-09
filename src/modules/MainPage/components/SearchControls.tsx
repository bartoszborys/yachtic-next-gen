import { ReactNode } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchControls(): ReactNode {
    const t = useTranslations();

    return (
        <div className="flex gap-5 my-6 flex-col sm:flex-row min-h-16">
            <input className="flex-[5] rounded"/>
            <input className="flex-[3] rounded" type="date" />
            <select className="flex-[2] rounded" />
            <button className="bg-[#00a27d] flex-[2] text-center border-white border-2 rounded font-bold text-lg">
                <FontAwesomeIcon className="m-auto" icon={faSearch} />
                <span className="m-auto">SEARCH</span>
            </button>
        </div>
    );
}