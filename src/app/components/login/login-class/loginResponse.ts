export class LoginResponse {
    token?: string;
    status?: boolean;
    msg?: string;
    code?: number;
    login?: Login;
}

export class Login {
    id?: number;
    nombre?: string;
    perfil?: string;
    token?: string;
}