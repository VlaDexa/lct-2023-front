import styles from "./Login.module.css"
import {LoginInfo} from "../../App";
import Lines from "../../assets/login_lines.svg";
import Flower from "../../assets/mini_flower.svg";
import {
    ChangeEventHandler,
    FormEventHandler,
    HTMLInputTypeAttribute,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

function InputAndLabel({setText, text, id, label, placeholder, required, type, max, min, list, onInput}: {
    label: string,
    text: string | undefined,
    setText: (newState: string) => unknown,
    id: string,
    placeholder: string,
    required: boolean,
    type: HTMLInputTypeAttribute,
    max?: string | number,
    min?: string | number,
    list?: string,
    onInput?: FormEventHandler<HTMLInputElement>
}) {
    const setTextCallback: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        setText(event.target.value);
    }, [setText]);

    return <div className={styles.input}>
        <label htmlFor={id}>{label}</label>
        <input name={id} id={id} placeholder={placeholder} required={required} value={text} onChange={setTextCallback}
               type={type} max={max} min={min} list={list} onInput={onInput}/>
    </div>
}

export default function Login({setUser}: { setUser: (info: LoginInfo) => unknown }) {
    const [surname, setSurname] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [fathersName, setFathersName] = useState<string>("");

    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");

    const [error, setError] = useState<string>("");
    const [dateError, setDateError] = useState<string>("");


    useEffect(() => setError(""), [name, surname]);
    useEffect(() => setDateError(""), [day, month, year]);

    // const months = [
    //     {name: "январь", dateAmount: 31},
    //     {name: "февраль", dateAmount: 28},
    //     {name: "март", dateAmount: 31},
    //     {name: "апрель", dateAmount: 30},
    //     {name: "май", dateAmount: 31},
    //     {name: "июнь", dateAmount: 30},
    //     {name: "июль", dateAmount: 31},
    //     {name: "август", dateAmount: 31},
    //     {name: "сентябрь", dateAmount: 30},
    //     {name: "октябрь", dateAmount: 31},
    //     {name: "ноябрь", dateAmount: 30},
    //     {name: "декабрь", dateAmount: 31},
    // ];
    const months = new Map(
        [
            ["январь", 31],
            ["февраль", 28],
            ["март", 31],
            ["апрель", 30],
            ["май", 31],
            ["июнь", 30],
            ["июль", 31],
            ["август", 31],
            ["сентябрь", 30],
            ["октябрь", 31],
            ["ноябрь", 30],
            ["декабрь", 31],
        ]
    );

    const monthNames = Array.from(months.keys());
    const thisYear = new Date().getFullYear();

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((event) => {
        event.preventDefault();

        if (surname === "") {
            setError("Вы пропустили пункт фамилия");
            return;
        } else if (name === "") {
            setError("Вы пропустили пункт имя")
            return;
        } else if (month === "") {
            setDateError("Вы пропустили пункт месяц");
            return;
        } else if (!monthNames.includes(month)) {
            setDateError("Пожалуйста, выберите месяц из списка");
            return;
        } else if (day === "") {
            setDateError("Вы пропустили пункт день");
            return;
        } else if (months.get(month)! < Number(day)) {
            const maxDay = months.get(month)!;
            setDateError(`В месяце ${month} всего ${maxDay} дней`);
            return;
        } else if (year === "") {
            setDateError("Вы пропустили пункт год")
            return;
        } else if (Number(year) > thisYear) {
            setDateError(`Вы не могли родиться после ${thisYear} года`)
            return;
        }

        setUser({});
    }, [surname, name, fathersName, day, month, year]);

    const MonthsList = useMemo(() => {
        return <datalist id="months">
            {monthNames.map(el => <option key={el}>{el}</option>)}
        </datalist>
    }, [monthNames])

    return <div className={styles.login}>
        {MonthsList}

        <img src={Lines} aria-hidden={"true"} alt={""} className={styles.lines}/>
        <form className={styles.login_bubble} onSubmit={onSubmit} noValidate={true}>
            <img src={Flower} alt={""} className={styles.flower}/>
            <p className={styles.title}>Введите ваши данные</p>

            <div className={styles.input_row}>
                <InputAndLabel label={"Фамилия"} required={true} id={"surname"} placeholder={"Иванов"} text={surname}
                               setText={setSurname} type={"text"}/>
                <InputAndLabel label={"Имя"} text={name} setText={setName} id={"name"} placeholder={"Иван"}
                               required={true} type={"text"}/>
                <InputAndLabel label={"Отчество (если есть)"} text={fathersName} setText={setFathersName}
                               id={"fathersName"} placeholder={"Иванович"} required={false} type={"text"}/>
            </div>

            <p className={styles.error}>{error}</p>

            <p className={styles.secondary_title}>Дата рождения</p>

            <div className={styles.input_row}>
                <InputAndLabel label={"День"} text={day} setText={setDay} id={"day"} placeholder={"01"} required={true}
                               type={"number"} min={1} max={31}/>
                <InputAndLabel label={"Месяц"} text={month} setText={setMonth} id={"month"} placeholder={"январь"}
                               required={true} type={"text"} list={"months"}/>
                <InputAndLabel label={"Год"} text={year} setText={setYear} id={"year"} placeholder={"1950"}
                               required={true} type={"number"} max={2023}/>
            </div>

            <p className={styles.error}>{dateError}</p>

            <button type={"submit"} className={styles.submit}>Готово</button>
        </form>
    </div>
}