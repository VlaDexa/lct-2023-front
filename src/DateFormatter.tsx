enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export function dayToString(day: Day) {
    switch (day) {
        case Day.Monday:
            return "Понедельник";
        case Day.Tuesday:
            return "Вторник";
        case Day.Wednesday:
            return "Среда";
        case Day.Thursday:
            return "Четверг";
        case Day.Friday:
            return "Пятница";
        case Day.Saturday:
            return "Суббота";
        case Day.Sunday:
            return "Воскресенье";
    }
}

function stringToDay(str: string) {
    switch (str) {
        case "Пн":
            return Day.Monday;
        case "Вт":
            return Day.Tuesday;
        case "Ср":
            return Day.Wednesday;
        case "Чт":
            return Day.Thursday;
        case "Пт":
            return Day.Friday;
        case "Сб":
            return Day.Saturday;
        case "Вс":
            return Day.Sunday;
        default:
            throw new Error(`Это (${str}) чё`);
    }
}

export class DateDay {
    public constructor(public day: Day, public start: Date, public end: Date) {
    }

    public toJSX() {
        const day = dayToString(this.day);
        const start = this.start.toISOString().slice("0000-00-00T".length, "0000-00-00T".length + "00:00".length);
        const end = this.end.toISOString().slice("0000-00-00T".length, "0000-00-00T".length + "00:00".length);

        return <>
            <b>{day}</b>
            &nbsp;
            {`${start}-${end}`}
        </>;
    }
}

export default class Days {
    public days: DateDay[] = [];

    public constructor(datasetDate: string) {
        datasetDate = datasetDate.slice("с 00.00.0000 по 00.00.0000, ".length).trimStart();

        while (datasetDate !== "") {
            if (datasetDate.startsWith(", ")) datasetDate = datasetDate.slice(", ".length);

            const days: string[] = [];
            while (!/\d/.test(datasetDate.charAt(0))) {
                days.push(datasetDate.slice(0, 2));
                datasetDate = datasetDate.slice(4).trimStart()
            }

            const firstHour = datasetDate.slice(0, 2);
            const firstMinute = datasetDate.slice(3, 5);
            const start = new Date();
            start.setHours(Number(firstHour), Number(firstMinute))

            const secondHour = datasetDate.slice(6, 8);
            const secondMinute = datasetDate.slice(9, 11);
            const end = new Date();
            end.setHours(Number(secondHour), Number(secondMinute));

            const convertedDays = days.map(day => new DateDay(stringToDay(day), start, end));
            this.days = this.days.concat(convertedDays);
            datasetDate = datasetDate.slice("00:00-00:00, без перерыва".length);
        }
    }
}