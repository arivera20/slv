// import { Captcha } from './captcha';

export class Usuario implements Usuario {
  constructor(
    public  usuario?: string,
    public  password?: string,
    public  sistema?: string,
    public  direccionIP?: string,
    public  token?: string,
    public  ticket?: string,
   // public captcha?: Captcha,
    public sistemaCaptcha?: boolean,
    public contraseniaCert?: string,
    public captchaStatus ?: boolean,
    ){};
}
