import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-slv',
  templateUrl: './slv.component.html',
  styleUrls: ['./slv.component.css']
})
export class SlvComponent implements OnInit {
  public forma: FormGroup;
  public isDisabled = true;
  public classDisabled = 'div-disabled';
  public classDisabledAccion = 'box';
  public labelEditar = 'Editar Campos';
  private editButton = true;
  public editButtonImg = 'decrypted.png';
  public finDiaImg = 'liqFinDia_Disabled.png';
  public reanudarImg = 'slvDetenido_disabled.png';
  public desactivarImg = 'compensadorInactivo_disabled.png';
  public purgarImg = 'konquest_disabled.png';
  public aplicarCambiosImg = 'unapply.png';

  editable: boolean; 

  constructor(private spinnerService: NgxSpinnerService,
              private fb: FormBuilder) {

    this.crearFormulario();
  }

  ngOnInit(): void {
    this.forma.disable();
    this.editable=false;


    this.refresh();

  }

  refresh(): void {

  }

  edit(): void {
    if (this.editButton === true) {
      this.editButton = false;
      this.forma.enable();
      this.classDisabled = '';
      this.labelEditar = 'Bloquear Campos';
      this.editButtonImg = 'encrypted.png';
      this.finDiaImg = 'mozilla.png';
      this.reanudarImg = 'slvRunning.png';
      this.desactivarImg = 'compensadorInactivo.png';
      this.purgarImg = 'konquest.png';
      this.classDisabledAccion = 'div-disabled-accion';
      this.isDisabled = false;
      this.aplicarCambiosImg = 'apply.png';
    } else {
      this.editButton = true;
      this.forma.disable();
      this.classDisabled = 'div-disabled';
      this.labelEditar = 'Editar Campos';
      this.editButtonImg = 'decrypted.png';
      this.finDiaImg = 'liqFinDia_Disabled.png';
      this.reanudarImg = 'slvDetenido_disabled.png';
      this.desactivarImg = 'compensadorInactivo_disabled.png';
      this.purgarImg = 'konquest_disabled.png';
      this.classDisabledAccion = 'box';
      this.isDisabled = true;
      this.aplicarCambiosImg = 'unapply.png';
    }
  }

  crearFormulario(): void {
    this.forma = this.fb.group({
      f_gm: ['9999999999999', [Validators.required, Validators.minLength(3)]],
      f_gno: ['5000', [Validators.required]],
      f_gtm: ['2', [Validators.required]],
      f_gpa: ['90', [Validators.required]],
      f_gda: ['', [Validators.required]],
      f_raa: ['true', [Validators.required]],
      f_lre: ['true', [Validators.required]],
      f_lre_i: ['100', [Validators.required]],
      f_alb_h: ['0', [Validators.required]],
      f_alb_m: ['12', [Validators.required]],
      f_clb_h: ['0', [Validators.required]],
      f_clb_m: ['47', [Validators.required]],
      f_r_h: ['0', [Validators.required]],
      f_r_m: ['19', [Validators.required]],
      f_a_h: ['7', [Validators.required]],
      f_a_m: ['15', [Validators.required]],
      f_pc_h: ['23', [Validators.required]],
      f_pc_m: ['10', [Validators.required]],
      f_c_h: ['23', [Validators.required]],
      f_c_m: ['30', [Validators.required]],
      f_lu: ['true', [Validators.required]],
      f_ma: ['true', [Validators.required]],
      f_mi: ['true', [Validators.required]],
      f_ju: ['true', [Validators.required]],
      f_vi: ['true', [Validators.required]],
      f_sa: ['', [Validators.required]],
      f_do: ['', [Validators.required]],
      f_pmc: ['25000', [Validators.required]],
      f_tc: ['108', [Validators.required]],
      correo: ['yo@mail.com', [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+$')]]
    });
  }

}
