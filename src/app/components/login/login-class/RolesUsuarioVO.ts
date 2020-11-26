export class RolesUsuarioVO implements RolesUsuarioVO {
  constructor(
    public  consultas ?: boolean,
    public  auditor ?: boolean,
    public  administrador ?: boolean,
    public  ejecutivoCentroBursatil ?: boolean,
    ){};
}
