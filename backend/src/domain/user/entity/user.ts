import { randomUUID } from "crypto";

interface UserProps {
    id?: string;
    email: string;
    password: string;
}

export class User {
    public readonly id: string;
    public email: string;
    public password: string;

    constructor(user: UserProps) {
        this.id = user.id ?? randomUUID().toString();
        this.email = user.email;
        this.password = user.password;

        if (!this.isEmailFormatValid()) {
            throw new Error("email format is invalid");
        }

        if (!this.isValidPassword()) {
            throw new Error("password format is invalid");
        }
    }

    private isEmailFormatValid(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    private isValidPassword(): boolean {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(this.password);
    }
}
