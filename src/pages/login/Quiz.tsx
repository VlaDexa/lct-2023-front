import QuestionSkeleton from "./questions/QuestionSkeleton";
import {FieldSetQuestionElement, FieldSetQuestionElementProps} from "./questions/FieldSetQuestion";
import React, {useCallback, useState} from "react";
import styles from "./Quiz.module.css"
import {InputQuestionElement, InputQuestionProps} from "./questions/InputQuestion";
import {TableFieldQuestionElement, TableFieldQuestionElementProps} from "./questions/TableFieldQuestion";
import {LoginInfo} from "../../App";

export default function Quiz(props: {
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | undefined>>
}) {
    const maxSteps = 6;

    const [_gender, setGender] = useState("");
    const [question, setQuestion] = useState(0);
    const [address, setAddress] = useState("");
    const [activities, setActivities] = useState<
        {
            name: string,
            value: number,
        }[]
    >([]);

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
    }, [setAddress, setQuestion]);

    const things = [
        {
            label: "Настольные игры",
            name: "tabletop"
        },
        {
            label: "Изучение чего-то нового",
            name: "new",
        },
        {
            label: "Пение",
            name: "singing"
        },
        {
            label: "Танцы",
            name: "dancing"
        },
        {
            label: "Рисование",
            name: "drawing"
        },
        {
            label: "Прикладное творчество",
            name: "prikladnoe"
        },
        {
            label: "Физическая активность",
            name: "pe"
        },
        {
            label: "Выступления на сцене",
            name: "acting"
        }
    ];

    const submitActivities = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const activities_arr: typeof activities = [];

        for (const {name} of things) {
            activities_arr.push({
                name,
                value: Number(data.get(name)! as unknown as string)
            })
        }
        console.log(activities_arr);
        setActivities(activities_arr);
        props.setUser((old) => {
            old!.needsQuiz = false;
            return old;
        })
    }, [setActivities, setQuestion, things]);


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
        />,
        <QuestionSkeleton<string, TableFieldQuestionElementProps, typeof TableFieldQuestionElement>
            key={3}
            stepNum={3}
            maxSteps={maxSteps}
            nextButtonText={"Далее"}
            backButtonText={"Назад"}
            title={"Укажите нравятся ли Вам данные активности в настоящее время"}
            childProps={{things}}
            children={TableFieldQuestionElement}
            className={styles.question}
            childClass={styles.table_question}
            onBack={goBack}
            onSubmit={submitActivities}
        />
    ] as const;

    return <main className={styles.quiz_page}>
        <button aria-label={"Закрыть"} className={styles.close_button} onClick={() => window.close()}></button>
        {questions[question]}
    </main>
}