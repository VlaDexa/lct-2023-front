import QuestionSkeleton from "./questions/QuestionSkeleton";
import {FieldSetQuestionElement, FieldSetQuestionElementProps} from "./questions/FieldSetQuestion";
import React, {useCallback, useState} from "react";
import styles from "./Quiz.module.css"
import {InputQuestionElement, InputQuestionProps} from "./questions/InputQuestion";

export default function Quiz() {
    const maxSteps = 6;

    const [_gender, setGender] = useState("");
    const [question, setQuestion] = useState(0);
    const [address, setAddress] = useState("");

    const submitGender = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget);

        setGender(data.get("gender")! as string);
        setQuestion(1);
    }, [setGender, setQuestion]);

    const submitAddress = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        setAddress(data.get("address")! as string);
        setQuestion(2);
    }, [setAddress, setQuestion])

    const goBack = useCallback(() => {
        setQuestion(old => old - 1);
        console.log(question);
    }, [setQuestion, question])

    const questions = [
        <QuestionSkeleton<string, FieldSetQuestionElementProps, typeof FieldSetQuestionElement>
            key={1}
            stepNum={1}
            maxSteps={maxSteps}
            title={"Укажите Ваш пол"}
            childProps={{options: ["Мужской", "Женский"], answerName: "gender"}}
            nextButtonText={"Далее"}
            children={FieldSetQuestionElement}
            onSubmit={submitGender}
            className={styles.question}
            childClass={styles.select_question}
        />,
        <QuestionSkeleton<string, InputQuestionProps, typeof InputQuestionElement>
            key={2}
            stepNum={2}
            maxSteps={maxSteps}
            nextButtonText={"Далее"}
            backButtonText={"Назад"}
            title={"Укажите Ваш адрес проживания"}
            childProps={{
                input: address,
                setInput: setAddress,
                placeholder: "г. Москва, ул. Октябрьская, д. 1, к. 1",
                inputName: "address"
            }}
            children={InputQuestionElement}
            className={styles.question}
            childClass={styles.input_question}
            onBack={goBack}
            onSubmit={submitAddress}
        />
    ] as const;

    return <main className={styles.quiz_page}>
        <button aria-label={"Закрыть"} className={styles.close_button} onClick={() => window.close()}></button>
        {questions[question]}
    </main>
}