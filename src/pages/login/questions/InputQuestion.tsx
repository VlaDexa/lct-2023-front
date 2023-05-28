import {QuestionElement} from "./QuestionSkeleton";
import React, {useEffect, useState} from "react";

export type InputQuestionProps = {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    inputName: string
};

function isCorrectAddress(address: string) {
    return address !== "";
}

const getAddress = async (_cords: GeolocationCoordinates): Promise<string> => {
    return "Очень Крутой Адрес";
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
        <input
            className={props.className}
            value={props.input}
            onInput={handleInputChange}
            placeholder={props.placeholder}
            name={props.inputName}
            required={true}
        />
    );
};