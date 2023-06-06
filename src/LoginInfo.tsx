import {ApiError, OpenAPI, UserService} from "./openapi";

export default class LoginInfo {
    // @ts-ignore: Set via setter
    #needsQuiz: boolean;
    // @ts-ignore: Set via setter
    #name: string;
    // @ts-ignore: Set via setter
    #surname: string;
    // @ts-ignore: Set via setter
    #token: string;
    // @ts-ignore: Set via setter
    #date_of_birth: Date;

    public constructor(
        needsQuiz: boolean,
        name: string,
        surname: string,
        token: string,
        date_of_birth: Date
    ) {
        this.needsQuiz = needsQuiz;
        this.name = name;
        this.surname = surname;
        this.token = token;
        this.date_of_birth = date_of_birth;
    }

    public static loadFromLocal(): LoginInfo | undefined {
        const needsQuiz = window.localStorage.getItem("needsQuiz") === "true";
        const name = window.localStorage.getItem("name");
        const surname = window.localStorage.getItem("surname");
        const token = window.localStorage.getItem("token");
        const date_of_birth = window.localStorage.getItem("date_of_birth");

        if (needsQuiz !== undefined && name && surname && token && date_of_birth) {
            OpenAPI.HEADERS = {
                "Authorization": `Bearer ${token}`
            }
            return new LoginInfo(needsQuiz, name, surname, token, new Date(date_of_birth));
        } else {
            return undefined;
        }
    }

    public get needsQuiz() {
        return this.#needsQuiz;
    }

    public get name() {
        return this.#name;
    }

    public get surname() {
        return this.#surname;
    }

    public get token() {
        return this.#token;
    }

    public get date_of_birth() {
        return this.#date_of_birth;
    }

    public set needsQuiz(needsQuiz) {
        this.#needsQuiz = needsQuiz;
        window.localStorage.setItem("needsQuiz", this.#needsQuiz.toString())
    }

    public set name(name) {
        this.#name = name;
        window.localStorage.setItem("name", this.#name)
    }

    public set surname(surname) {
        this.#surname = surname;
        window.localStorage.setItem("surname", this.#surname)
    }

    public set token(token) {
        this.#token = token;

        OpenAPI.HEADERS = {
            "Authorization": `Bearer ${this.#token}`
        };

        window.localStorage.setItem("token", this.#token);
    }

    public set date_of_birth(date) {
        this.#date_of_birth = date;
        window.localStorage.setItem("date_of_birth", this.#date_of_birth.toJSON());
    }

    private toLoginData(): { username: string, password: string } {
        const username = this.surname;
        const password = this.date_of_birth.toISOString().slice(0, "YYYY-MM-DD".length);

        return {
            username,
            password
        }
    }

    public async resetToken() {
        const loginData = this.toLoginData();
        this.token = await UserService.createUserApiV1UserCreateUserPost({
            name: loginData.username,
            birthday_date: loginData.password
        })
            .catch((error) => {
                if (error instanceof ApiError && error.status == 409) return;
                throw error;
            }).then(() => UserService.loginForTokenApiV1UserTokenPost(loginData)).then(token => token.access_token);
    }
}