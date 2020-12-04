export class InstitucionVO implements InstitucionVO {
  constructor(
    public  id?: number,
    public  nombre?: string,
    public  clave?: string,
    public  folio?: string,
    public  origen?: string,
    public  verificaAccesoIPs?: boolean,
    ){};
}
