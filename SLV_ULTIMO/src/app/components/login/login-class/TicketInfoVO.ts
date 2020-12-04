import { RolesUsuarioVO } from './RolesUsuarioVO';

export class TicketInfoVO implements TicketInfoVO {
  constructor(
    public  claveUsuario?: string,
    public  nombreSistema?: string,
    public  tipoUsuario?: string,
    public  idSistema?: number,
    public  idInstitucion?: number,
    public  nombreInstitucion?: string,
    public  ticket?: string,
    public  idPerfil?: number,
    public  direccionIp?: string,
    public  rolesUsuario?: RolesUsuarioVO,
    public  diasVigenciaPassword?: number,
    public  diasAvisoPassword?: number,
    public  fechaVerificacionPassword?: string,
    public  version?: string,
    ){};
}
