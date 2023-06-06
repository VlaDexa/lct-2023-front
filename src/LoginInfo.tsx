import {OpenAPI} from "./openapi";

export default class LoginInfo {
    #needsQuiz: boolean;
    #name: string;
    #surname: string;
    #token: string;

    public constructor(
        needsQuiz: boolean,
        name: string,
        surname: string,
        token: string
    ) {
        this.#needsQuiz = needsQuiz;
        this.#name = name;
        this.#surname = surname;
        this.#token = token;

        window.localStorage.setItem("needsQuiz", this.#needsQuiz.toString());
        window.localStorage.setItem("name", this.#name);
        window.localStorage.setItem("surname", this.#surname);
        window.localStorage.setItem("token", this.#token);
    }

    public static loadFromLocal(): LoginInfo | undefined {
        const needsQuiz = window.localStorage.getItem("needsQuiz") === "true";
        const name = window.localStorage.getItem("name");
        const surname = window.localStorage.getItem("surname");
        const token = window.localStorage.getItem("token");

        if (needsQuiz !== undefined && name && surname && token) {
            OpenAPI.HEADERS = {
                "Authorization": `Bearer ${token}`
            }
            return new LoginInfo(needsQuiz, name, surname, token);
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
        window.localStorage.setItem("token", this.#token)
    }
}