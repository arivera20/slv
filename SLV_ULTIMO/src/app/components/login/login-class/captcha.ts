export class Captcha implements Captcha {
  constructor(
    public userEnteredCaptchaCode?: string,
    public captchaId?: string,
    public statusCaptcha?: string,
	  public success?: boolean,
    ){};
}
