import { Captcha } from './captcha';
import { InstitucionVO } from './InstitucionVO';
import { TicketInfoVO } from './TicketInfoVO';
import { UsuarioSeguridad } from './usuarioSeguridad';

export class UserResponse implements UserResponse {
  constructor(
    public  ticket?: string,
    public  ticketInfoVO?: TicketInfoVO,
    public  usuarioSeguridad?: UsuarioSeguridad,
    public  institucionVo?: InstitucionVO,
    public  listInstitucionVo?: InstitucionVO[],
    public  rolesPorPerfil?: string[],
    public  lstFacultades?: string[],
    public  tipoAutenticacion ?: number,
    public captcha ?: Captcha,
    ){};
}
