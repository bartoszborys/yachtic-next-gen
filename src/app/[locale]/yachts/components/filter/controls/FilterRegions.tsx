"use client"
import { ReactNode, useEffect, useMemo, useState } from "react";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, TreeItem2Label } from "@mui/x-tree-view";
import { Checkbox, CheckboxProps } from "@mui/material";
import { CountryData, CountryLocation, CountryRegion } from "../../../data/filter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { addLocations, addRegions, removeLocations, removeRegions } from "../../../store/FilterSlice";

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

let rerenderCount = 0;

export default function FilterRegions({ countries, defaultData }: FilterRegionsProps): ReactNode {
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(defaultData);
    const countryId = useAppSelector(selector => selector.search["countries[0][id]"]);
    const locationsIds = useAppSelector(selector => selector.search.locations);
    const regionsIds = useAppSelector(selector => selector.search.regions);
    const dispath = useAppDispatch();

    const addCurrentCountryAllRegionsAndLocations = (selectedCountry: CountryData, regionIdMask: number|null = null) => {
        if(!selectedCountry) {
            return;
        }
        const restRegions = selectedCountry.regions.filter(item => regionIdMask !== item.id);
        const regionsIds = [];
        const locationsIds = [];
        for(const region of restRegions) {
            regionsIds.push(region.id);
            locationsIds.push(...region.locations.map(location => location.id));
        }
        dispath(addRegions(regionsIds));
        dispath(addLocations(locationsIds));
    }

    const regionOnChange = (region: CountryRegion, checked: boolean) => {
        const locationsIds = region.locations.map(location => location.id);
        if (checked) {
            dispath(addRegions([region.id]))
            dispath(addLocations(locationsIds));
        }
        else {
            if(selectedCountry?.regions.length === 1) {
                return;
            }
            
            dispath(removeRegions([region.id]))
            dispath(removeLocations(locationsIds));
            if(selectedCountry) {
                addCurrentCountryAllRegionsAndLocations(selectedCountry, region.id);
            }
        }
    }
    
    const locationOnChange = (location: CountryLocation, region: CountryRegion, checked: boolean) => {

        if (checked) {
            dispath(addLocations([location.id]))
        }
        else {
            dispath(removeLocations([location.id]));
            const hasAtleastOne = locationsIds.filter(item => item !== location.id).some(item => region.locations.map(item => item.id).includes(item));
            if(!hasAtleastOne && locationsIds.length === 1) {
                dispath(addLocations(region.locations.filter(item => location.id !== item.id).map(item => item.id)));
                dispath(addRegions([region.id]));
            }
        }
    }

    useEffect(() => {
        const item = countries.find(item => item.id.toString() === countryId);

        if (!item) {
            return;
        }

        setSelectedCountry(item);
        dispath(removeLocations(locationsIds));
        dispath(removeRegions(regionsIds));
        addCurrentCountryAllRegionsAndLocations(item);
        //@TODO issue with store after change country -> mayby asynchronous store call // must read about
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
                                checked={locationsIds.includes(location.id)}
                                onClick={(...props) => props[0].stopPropagation()}
                                onChange={(...props) => locationOnChange(location, region, props[1])} />
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
                                checked={regionsIds.includes(region.id)}
                                onClick={(...props) => props[0].stopPropagation()}
                                onChange={(...props) => regionOnChange(region, props[1])}
                            />
                            <span className="text-sm ml-1">{region.name}</span>
                        </TreeItem2Label>
                    )}
                    itemId={"region-" + region.id.toString()}>
                    {data}
                </TreeItem>
            )
        });
    }, [selectedCountry, regionsIds, locationsIds])

    return (
        <>
            {
                (!selectedCountry)
                    ? <></>
                    : <>
                        <div className="text-white font-bold">REGION</div>
                        <SimpleTreeView
                            className="text-white font-bold"
                            aria-label="file system navigator"
                        >
                            {treeItems}
                        </SimpleTreeView>
                    </>
            }

        </>
    );
}