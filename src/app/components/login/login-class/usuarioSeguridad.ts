export class UsuarioSeguridad implements UsuarioSeguridad {
  constructor(
    public  categoria?: string,
    public  nombre?: string,
    public  apellidoPaterno?: string,
    public  apellidoMaterno?: string,
    public  claveUsuario?: string,
    public  email?: string,
    public  institucion?: string,
    public  nombreInstitucion?: string,
    public  idInstitucion?: number,
    public  nombreCompleto?: string,
    public  telefono?: string,
    public  centroTrabajo?: string,
    public  idCentroTrabajo?: string,
    public  password?: string,
    public  idInstitucionOrigen?: string,
	  public  folioInstitucionOrigen?: string,
	  public  numeroSerieCertificado?: string,
    ){};
}
