import {IUser} from "../types/auth.types";
import {makeAutoObservable} from "mobx";

export default class Store {
    user = {} as IUser
    isAuth = false
    roles = []

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(auth: boolean) {
        this.isAuth = auth
    }

    setUser(user: IUser) {
        this.user = user
    }
}