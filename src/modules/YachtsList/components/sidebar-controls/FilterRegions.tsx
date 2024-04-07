"use client"
import { ReactNode, useEffect, useMemo, useState } from "react";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, TreeItem2Label } from "@mui/x-tree-view";
import { Checkbox, CheckboxProps } from "@mui/material";
import { CountryData } from "../../data/filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { parseAsInteger, useQueryState } from "nuqs";
import { options } from "@/modules/YachtsList/constants/urlQuery";

interface FilterRegionsProps {
    countries: CountryData[];
    defaultData: CountryData | null;
}

function ColoredCheckbox({ onChange, ...props }: CheckboxProps): ReactNode {
    return (
        <Checkbox
            {...props}
            onChange={onChange}
            checkedIcon={(
                <div className="flex flex-col justify-center bg-[#00a27d] border border-white text-white w-[22px] h-[22px] text-center rounded">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            )}
            icon={(
                <div className="flex flex-col justify-center bg-white border border-white text-white w-[22px] h-[22px] text-center rounded" />
            )}
            sx={{
                'padding': '0px',
            }}
        />
    );
}

export default function FilterRegions({ countries, defaultData }: FilterRegionsProps): ReactNode {
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(defaultData);
    const [countryId, setCountryId] = useQueryState("countryId", parseAsInteger.withOptions(options));

    useEffect(() => {
        if(!countryId) {
            return;
        }

        const country = countries.find(country => country.id === countryId);
        if(country) {
            setSelectedCountry(country);
        }
    }, [countryId]);

    const treeItems = useMemo(() => {
        return selectedCountry?.regions.map(region => {
            const data = region.locations.map((location) => (
                <TreeItem
                    key={location.id}
                    itemId={"location-" + location.id.toString()}
                    label={(
                        <TreeItem2Label>
                            <ColoredCheckbox
                                checked={true}
                                onClick={(...props) => props[0].stopPropagation()}
                                onChange={(...props) => {}} />
                            <span className="text-sm ml-1">{location.name}</span>
                        </TreeItem2Label>
                    )} />
            ));
            return (
                <TreeItem
                    key={region.id}
                    sx={{
                        '.MuiTreeItem-content': {
                            "padding": 0,
                            "gap": 0,
                        }
                    }}
                    label={(
                        <TreeItem2Label>
                            <ColoredCheckbox
                                checked={true}
                                onClick={(...props) => props[0].stopPropagation()}
                                onChange={(...props) => {}}
                            />
                            <span className="text-sm ml-1">{region.name}</span>
                        </TreeItem2Label>
                    )}
                    itemId={"region-" + region.id.toString()}>
                    {data}
                </TreeItem>
            )
        });
    }, [selectedCountry])

    return (
        <>
            {
                (!selectedCountry)
                    ? <></>
                    : <>
                        <div className="text-white font-bold">REGION</div>
                        <SimpleTreeView
                            className="text-white font-bold"
                            aria-label="file system navigator">
                            {treeItems}
                        </SimpleTreeView>
                    </>
            }

        </>
    );
}