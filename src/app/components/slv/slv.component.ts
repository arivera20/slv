import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreliquidadorService } from './services/preliquidador.service';
import swal from 'sweetalert2';
import { NumberFormatStyle } from '@angular/common';
import { SenalizadorPreliquidadorService } from './services/senalizador-preliquidador.service';
import { CompensadorService } from './services/compensador.service';
import { HoraVO } from './slv-class/HoraVO';

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

  msg = '';
  editable: boolean;
  version: string;
  precioTituloMaximoParaCompensacion: number;
  montoTotalActualInstrucciones: number;
  numeroTotalActualInstrucciones: number;
  montoTotalMaxInstrucciones: number;
  numeroTotalMaxInstrucciones: number;
  numeroAdaptableMaxInstrucciones: number;
  gatilloDinamicoActivo: boolean;
  reencoladoAutomatico: boolean;
  numeroInstruccionesRetirosEfectivo: number;
  numeroInstruccionesCompuestas: number;
  numeroInstruccionesCompensables: number;
  liquidacionFinDeDiaActivada: boolean;
  limitarRetiros: boolean;
  numeroMaximoRetiros: number;
  slvCerrado: boolean;
  diaInhabil: boolean;
  estadoSlv: boolean;
  frecuenciaSlv: number;
  frecuenciaPurgadoSlv: number;
  frecuenciaInicioValoresSlv = new HoraVO();
  frecuenciaFinValoresSlv = new HoraVO();
  frecuenciaRecepcionSlv = new HoraVO();
  frecuenciaAperturaSlv = new HoraVO();
  frecuenciaPreCierreSlv = new HoraVO();
  frecuenciaCierreSlv = new HoraVO();
  frecuenciaDiasLiq: string;
  timeoutRespuesta: number;
  compensadorActivo: boolean;


  constructor(private spinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private preliquidadorService: PreliquidadorService,
    private senalizadorService: SenalizadorPreliquidadorService,
    private compensadorService: CompensadorService) {

    this.crearFormulario();
  }

  ngOnInit(): void {
    this.forma.disable();
    this.editable = false;


    this.refresh();

  }

  refresh(): void {
    this.getVersion();
    this.getPrecioTituloMaximoParaCompensacion();
    this.getMontoTotalActualInstrucciones();
    this.getNumeroTotalActualInstrucciones();
    this.getMontoTotalMaxInstrucciones();
    this.getNumeroTotalMaxInstrucciones();
    this.getNumeroAdaptableMaxInstrucciones();
    this.isGatilloDinamicoActivo();
    this.isReencoladoAutomatico();
    this.getNumeroInstruccionesRetirosEfectivo();
    this.getNumeroInstruccionesCompuestas();
    this.getNumeroInstruccionesCompensables();
    this.isLiquidacionFinDeDiaActivada();
    this.isLimitarRetiros();
    this.getNumeroMaximoRetiros();
    this.isSlvCerrado();
    this.isDiaInhabil();
    this.getEstadoSlv();
    this.getFrecuenciaSlv();
    this.getFrecuenciaPurgadoSlv();
    this.getFrecuenciaInicioValoresSlv();
    this.getFrecuenciaFinValoresSlv();
    this.getFrecuenciaRecepcionSlv();
    this.getFrecuenciaAperturaSlv();
    this.getFrecuenciaPreCierreSlv();
    this.getFrecuenciaCierreSlv();
    this.getFrecuenciaDiasLiq();
    this.getTimeoutRespuesta();
    this.isCompensadorActivo();
    
  }



  /****************************************************************************
   ************************  LLAMADO DE SERVICIOS  ****************************
   ***************************************************************************/

  // SERVICIO - getVersion
  private getVersion(): void {
    this.spinnerService.show();
    this.preliquidadorService.getVersion()
      .subscribe(
        data => {
          this.version = data;
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          console.log( this.version);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getVersion', '', error.mesage);
        });
  }

  // SERVICIO - getPrecioTituloMaximoParaCompensacion
  private getPrecioTituloMaximoParaCompensacion(): void {
    this.spinnerService.show();
    this.preliquidadorService.getPrecioTituloMaximoParaCompensacion()
      .subscribe(
        data => {
          this.precioTituloMaximoParaCompensacion = data;
          console.log(this.precioTituloMaximoParaCompensacion);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getPrecioTituloMaximoParaCompensacion', '', error.mesage);
        });
  }

  // SERVICIO - getMontoTotalActualInstrucciones
  private getMontoTotalActualInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getMontoTotalActualInstrucciones()
      .subscribe(
        data => {
          this.montoTotalActualInstrucciones = data;
          console.log(this.montoTotalActualInstrucciones);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getMontoTotalActualInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroTotalActualInstrucciones
  private getNumeroTotalActualInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroTotalActualInstrucciones()
      .subscribe(
        data => {
          this.numeroTotalActualInstrucciones = data;
          console.log(this.numeroTotalActualInstrucciones);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroTotalActualInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - getMontoTotalMaxInstrucciones
  private getMontoTotalMaxInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getMontoTotalMaxInstrucciones()
      .subscribe(
        data => {
          this.montoTotalMaxInstrucciones = data;
          console.log(this.montoTotalMaxInstrucciones);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getMontoTotalMaxInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroTotalMaxInstrucciones
  private getNumeroTotalMaxInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroTotalMaxInstrucciones()
      .subscribe(
        data => {
          this.numeroTotalMaxInstrucciones = data;
          console.log(this.numeroTotalMaxInstrucciones);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroTotalMaxInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroAdaptableMaxInstrucciones
  private getNumeroAdaptableMaxInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroAdaptableMaxInstrucciones()
      .subscribe(
        data => {
          this.numeroAdaptableMaxInstrucciones = data;
          console.log(this.numeroAdaptableMaxInstrucciones);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroAdaptableMaxInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - isGatilloDinamicoActivo
  private isGatilloDinamicoActivo(): void {
    this.spinnerService.show();
    this.preliquidadorService.isGatilloDinamicoActivo()
      .subscribe(
        data => {
          this.gatilloDinamicoActivo = data;
          console.log(this.gatilloDinamicoActivo);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isGatilloDinamicoActivo', '', error.mesage);
        });
  }

  // SERVICIO - isReencoladoAutomatico
  private isReencoladoAutomatico(): void {
    this.spinnerService.show();
    this.preliquidadorService.isReencoladoAutomatico()
      .subscribe(
        data => {
          this.reencoladoAutomatico = data;
          console.log(this.reencoladoAutomatico);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isReencoladoAutomatico', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroInstruccionesRetirosEfectivo
  private getNumeroInstruccionesRetirosEfectivo(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroInstruccionesRetirosEfectivo()
      .subscribe(
        data => {
          this.numeroInstruccionesRetirosEfectivo = data;
          console.log(this.numeroInstruccionesRetirosEfectivo);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroInstruccionesRetirosEfectivo', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroInstruccionesCompuestas
  private getNumeroInstruccionesCompuestas(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroInstruccionesCompuestas()
      .subscribe(
        data => {
          this.numeroInstruccionesCompuestas = data;
          console.log(this.numeroInstruccionesCompuestas);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroInstruccionesCompuestas', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroInstruccionesCompensables
  private getNumeroInstruccionesCompensables(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroInstruccionesCompensables()
      .subscribe(
        data => {
          this.numeroInstruccionesCompensables = data;
          console.log(this.numeroInstruccionesCompensables);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroInstruccionesCompensables', '', error.mesage);
        });
  }

  // SERVICIO - isLiquidacionFinDeDiaActivada
  private isLiquidacionFinDeDiaActivada(): void {
    this.spinnerService.show();
    this.preliquidadorService.isLiquidacionFinDeDiaActivada()
      .subscribe(
        data => {
          this.liquidacionFinDeDiaActivada = data;
          console.log(this.liquidacionFinDeDiaActivada);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isLiquidacionFinDeDiaActivada', '', error.mesage);
        });
  }

  // SERVICIO - isLimitarRetiros
  private isLimitarRetiros(): void {
    this.spinnerService.show();
    this.preliquidadorService.isLimitarRetiros()
      .subscribe(
        data => {
          this.limitarRetiros = data;
          console.log(this.limitarRetiros);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isLimitarRetiros', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroMaximoRetiros
  private getNumeroMaximoRetiros(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroMaximoRetiros()
      .subscribe(
        data => {
          this.numeroMaximoRetiros = data;
          console.log(this.numeroMaximoRetiros);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroMaximoRetiros', '', error.mesage);
        });
  }

  // SERVICIO - isSlvCerrado
  private isSlvCerrado(): void {
    this.spinnerService.show();
    this.preliquidadorService.isSlvCerrado()
      .subscribe(
        data => {
          this.slvCerrado = data;
          console.log(this.slvCerrado);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isSlvCerrado', '', error.mesage);
        });
  }

  // SERVICIO - isDiaInhabil
  private isDiaInhabil(): void {
    this.spinnerService.show();
    this.preliquidadorService.isDiaInhabil()
      .subscribe(
        data => {
          this.diaInhabil = data;
          console.log(this.diaInhabil);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isDiaInhabil', '', error.mesage);
        });
  }

  // SERVICIO - getEstadoSlv
  private getEstadoSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getEstadoSlv()
      .subscribe(
        data => {
          this.estadoSlv = data;
          console.log(this.estadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getEstadoSlv', '', error.mesage);
        });
  }

  // SERVICIO - getEstadoSlv
  private getFrecuenciaSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaSlv()
      .subscribe(
        data => {
          this.frecuenciaSlv = data;
          console.log(this.frecuenciaSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaPurgadoSlv
  private getFrecuenciaPurgadoSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaPurgadoSlv()
      .subscribe(
        data => {
          this.frecuenciaPurgadoSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaPurgadoSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaInicioValoresSlv
  private getFrecuenciaInicioValoresSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaInicioValoresSlv()
      .subscribe(
        data => {
          this.frecuenciaInicioValoresSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaInicioValoresSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaFinValoresSlv
  private getFrecuenciaFinValoresSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaFinValoresSlv()
      .subscribe(
        data => {
          this.frecuenciaInicioValoresSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaFinValoresSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaRecepcionSlv
  private getFrecuenciaRecepcionSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaRecepcionSlv()
      .subscribe(
        data => {
          this.frecuenciaInicioValoresSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaRecepcionSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaAperturaSlv
  private getFrecuenciaAperturaSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaAperturaSlv()
      .subscribe(
        data => {
          this.frecuenciaAperturaSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaAperturaSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaPreCierreSlv
  private getFrecuenciaPreCierreSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaPreCierreSlv()
      .subscribe(
        data => {
          this.frecuenciaPreCierreSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaPreCierreSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaCierreSlv
  private getFrecuenciaCierreSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaCierreSlv()
      .subscribe(
        data => {
          this.frecuenciaCierreSlv = data;
          console.log(this.frecuenciaPurgadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaCierreSlv', '', error.mesage);
        });
  }







  // SERVICIO - getFrecuenciaDiasLiq
  private getFrecuenciaDiasLiq(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaDiasLiq()
      .subscribe(
        data => {
          this.frecuenciaDiasLiq = data;
          console.log(this.frecuenciaDiasLiq);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaDiasLiq', '', error.mesage);
        });
  }

  // SERVICIO - getTimeoutRespuesta
  private getTimeoutRespuesta(): void {
    this.spinnerService.show();
    this.compensadorService.getTimeoutRespuesta()
      .subscribe(
        data => {
          this.timeoutRespuesta = data;
          console.log(this.timeoutRespuesta);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getTimeoutRespuesta', '', error.mesage);
        });
  }

  // SERVICIO - isCompensadorActivo
  private isCompensadorActivo(): void {
    this.spinnerService.show();
    this.compensadorService.isCompensadorActivo()
      .subscribe(
        data => {
          this.compensadorActivo = data;
          console.log(this.compensadorActivo);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isCompensadorActivo', '', error.mesage);
        });
  }




  /* METODO ERROR - para enviar error en caso de la peticion Http */
  private errorHttp(method: string, msgError: string, error: string): void {
    this.spinnerService.hide();
    if (msgError === '') {
      msgError = 'En este momento no podemos obtener información, inténtelo en otro momento.';
    }
    // console.error(error);
    console.error('ERROR ' + method + ' - (SlvComponent)');
    swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: msgError
    });
  }


  /** ACCION - BOTON editar */
  public edit(): void {
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

  /* Metodo para crear el Fomulario */
  private crearFormulario(): void {
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
      f_tc: ['108', [Validators.required]]
    });
  }

}
