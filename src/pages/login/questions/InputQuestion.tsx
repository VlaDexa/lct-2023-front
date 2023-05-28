import {QuestionElement} from "./QuestionSkeleton";
import React, {useEffect, useState} from "react";
import {RoutesService} from "../../../openapi";
import AddressSuggestion from "../AddressSuggestion";

export type InputQuestionProps = {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    inputName: string
};

function isCorrectAddress(address: string) {
    return address !== "";
}

const smthng = {
    "geocoding": {
        "version": "0.2",
        "attribution": "https://openrouteservice.org/terms-of-service/#attribution-geocode",
        "query": {
            "size": 10,
            "private": false,
            "point.lat": 55,
            "point.lon": 38,
            "boundary.circle.lat": 55,
            "boundary.circle.lon": 38,
            "boundary.country": [
                "RUS"
            ],
            "lang": {
                "name": "English",
                "iso6391": "en",
                "iso6393": "eng",
                "via": "default",
                "defaulted": true
            },
            "querySize": 20
        },
        "engine": {
            "name": "Pelias",
            "author": "Mapzen",
            "version": "1.0"
        },
        "timestamp": 1685288931617
    },
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    38.003533,
                    55.002753
                ]
            },
            "properties": {
                "id": "way/97383153",
                "gid": "openstreetmap:venue:way/97383153",
                "layer": "venue",
                "source": "openstreetmap",
                "source_id": "way/97383153",
                "name": "СНТ «Солнышко»",
                "confidence": 0.6,
                "distance": 0.381,
                "accuracy": "point",
                "country": "Russia",
                "country_gid": "whosonfirst:country:85632685",
                "country_a": "RUS",
                "region": "Moscow Oblast",
                "region_gid": "whosonfirst:region:85688161",
                "region_a": "MS",
                "county": "Stupinskiy",
                "county_gid": "whosonfirst:county:890487149",
                "county_a": "SU",
                "continent": "Europe",
                "continent_gid": "whosonfirst:continent:102191581",
                "label": "СНТ «Солнышко», MS, Russia"
            },
            "bbox": [
                37.9993486,
                55.0005059,
                38.0080793,
                55.0056347
            ]
        }
    ],
    "bbox": [
        37.9993486,
        55.0005059,
        38.0080793,
        55.0056347
    ]
};

const getAddress = async (cords: GeolocationCoordinates): Promise<string> => {
    const api = await RoutesService.getAddressApiV1RoutesAddressGet(`((${cords.latitude}),(${cords.longitude}))`) as unknown as typeof smthng;

    return api.features[0].properties.label;
};

export const InputQuestionElement: QuestionElement<string, InputQuestionProps> = (props) => {
    useEffect(() => {
        props.setShouldUnblock(isCorrectAddress(props.input));
    }, [props.input]);

    const [address, setAddress] = useState<GeolocationCoordinates>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (location) => {
                setAddress(location.coords);
            },
            () => {
            },
            {
                enableHighAccuracy: true
            }
        )
    }, []);

    useEffect(() => {
        if (address) getAddress(address).then(address_string => props.setInput(address_string))
    }, [address])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = event.currentTarget.value;
        props.setInput(newInput);
    };

    return (
        <>
            <input
                className={props.className}
                value={props.input}
                onInput={handleInputChange}
                placeholder={props.placeholder}
                name={props.inputName}
                required={true}
            />
            <AddressSuggestion currentInput={props.input} setInput={props.setInput}/>
        </>
    );
};