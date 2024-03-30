"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getYachts } from "../../data/list";
import YachtsData from "../../types/YachtData";
import Yacht from "./components/Yacht";
import { useAppSelector } from "../../store/hooks";
import { Slider } from "@mui/material";

export default function List() {
    const [yachts, setYachts] = useState<YachtsData[]>([]);
    const search = useAppSelector(state => state.search);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();
        
        Object.entries(search).forEach(([key, value]) => {
            if(value instanceof Array) {
                if(value.length === 0) {
                    return;
                }
            }

            if(value) {
                params.append(key, value);
            }
        }); 
        
        router.push(`/yachts?${params.toString()}`, {scroll: false});

        (async () => {
            try {
                setYachts(await getYachts(params));
            }
            catch {
                setYachts([]);
            }
        })()
    }, [search]);

    return (
        <>
                            <Slider
                        aria-label="Small steps"
                        defaultValue={0.00000005}
                        step={0.00000001}
                        marks
                        min={-0.00000005}
                        max={0.0000001}
                    />
            <div className="d-flex flex-col">
                {yachts.map(yacht => <Yacht key={yacht.id} data={yacht}/>)}
            </div>
        </>
    );
}