import styles from "./Question.module.css";
import React, {JSX, useState} from "react";

export type QuestionProps<Answer> = {
    stepNum: number,
    maxSteps: number,
    onSubmit?: React.FormEventHandler<HTMLFormElement>,
    onBack?: () => void,
    setError?: (error: string) => unknown
    className?: string,
    nextButtonText: string,
    backButtonText?: string,
    title: string,
}

export type RequiredProps<Answer> = {
    className?: string,
    setShouldUnblock: React.Dispatch<React.SetStateAction<boolean>>
};

export type QuestionElement<Answer, Props> = (props: Props & RequiredProps<Answer>) => JSX.Element;

export default function QuestionSkeleton<Answer, ChildProps, ChildComponent extends (props: ChildProps & RequiredProps<Answer>) => JSX.Element>(
    props: QuestionProps<Answer> & {
        childClass?: string,
        childProps: ChildProps,
        children: QuestionElement<Answer, ChildProps & RequiredProps<Answer>>
    }
) {
    const [shouldUnblock, setShouldUnblock] = useState(false);
    const requiredProps: RequiredProps<Answer> = {
        className: props.childClass,
        setShouldUnblock
    };

    const childProps: ChildProps & RequiredProps<Answer> = {
        ...requiredProps,
        ...props.childProps
    };

    return <div className={[styles.border_around_card, props.className].join(" ")}>
        <div className={styles.card} aria-label={"Вопрос"}>
            <p className={styles.step}>{`Шаг ${props.stepNum} из ${props.maxSteps}`}</p>
            <label aria-label={props.title} style={{display: "flex", flexDirection: "column"}}>
                <h2 aria-hidden={true} className={styles.title}>{props.title}</h2>
                <form noValidate={true} onSubmit={props.onSubmit} style={{display: "inherit", flexDirection: "column"}}>
                    {props.children(childProps)}
                    {
                        props.backButtonText
                            ?
                            <div className={styles.button_row}>
                                <button className={styles.back}
                                        type={"button"}
                                        onClick={props.onBack}
                                >{props.backButtonText}</button>
                                <button className={styles.next}
                                        disabled={!shouldUnblock}>{props.nextButtonText}</button>
                            </div>
                            :
                            <div className={styles.single_button}>
                                <button className={styles.next}
                                        disabled={!shouldUnblock}>{props.nextButtonText}</button>
                            </div>
                    }
                </form>
            </label>
        </div>
    </div>
}