import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PreliquidadorService } from './slv-services/preliquidador.service';
import { SenalizadorPreliquidadorService } from './slv-services/senalizador-preliquidador.service';
import { CompensadorService } from './slv-services/compensador.service';
import { HoraVO } from './slv-class/HoraVO';
import { AppStorageService } from '../app-storage-service';


@Component({
  selector: 'app-slv',
  templateUrl: './slv.component.html',
  styleUrls: ['./slv.component.css']
})
export class SlvComponent implements OnInit {
  public forma: FormGroup;
  public isDisabled = true;
  public isDisabledCheckbox: boolean = true;
  public classDisabled = 'div-disabled';
  public classDisabledAccion = 'box';
  public labelEditar = 'Editar Campos';
  private editButton = true;
  public editButtonImg = 'decrypted.png';
  //public finDiaImg = 'liqFinDia_Disabled.png';
  public reanudarImg = 'slvDetenido_disabled.png';
  public desactivarImg = 'compensadorInactivo_disabled.png';
  public aplicarCambiosImg = 'unapply.png';

  montoTotalMaxInstrucciones: number;

  


  msg = '';

  version = '';
  precioTituloMaximoParaCompensacion: number;
  montoTotalActualInstrucciones = 8;
  numeroTotalActualInstrucciones = 0;

  numeroTotalMaxInstrucciones: number;
  numeroAdaptableMaxInstrucciones = 9;
  isGatilloDinamicoActivo: boolean;
  isReencoladoAutomatico: boolean;
  numeroInstruccionesRetirosEfectivo = 7;
  numeroInstruccionesCompuestas = 6;
  numeroInstruccionesCompensables = 0;
  liquidacionFinDeDiaActivada: boolean;
  isLimitarRetiros: boolean;
  numeroMaximoRetiros: number;
  slvCerrado: boolean;
  diaInhabil: boolean;
  estadoSlv: boolean;
  frecuenciaSlv: number;
  frecuenciaPurgadoSlv: number;
  frecuenciaInicioValoresSlv = new HoraVO();
  horaInicioValores: number;
  minutosInicioValores: number;
  frecuenciaFinValoresSlv = new HoraVO();
  horaFinValores: number;
  minutosFinValores: number;
  frecuenciaRecepcionSlv = new HoraVO();
  horaRecepcion: number;
  minutosRecepcion: number;
  frecuenciaAperturaSlv = new HoraVO();
  horaApertura: number;
  minutosApertura: number;
  frecuenciaPreCierreSlv = new HoraVO();
  horaPreCierre: number;
  minutosPreCierre: number;
  frecuenciaCierreSlv = new HoraVO();
  horaCierre: number;
  minutosCierre: number;
  frecuenciaDiasLiq: string;
  diasLiq: String;
  isLunesActivo: boolean;
  isMartesActivo: boolean;
  isMiercolesActivo: boolean;
  isJuevesActivo: boolean;
  isViernesActivo: boolean;
  isSabadoActivo: boolean;
  isDomingoActivo: boolean;
  timeoutRespuestaCompensador: number;
  compensadorActivo: boolean;
  statusActualizar: boolean = false;

  /** VARIABLES TEMPORALES */
  montoTotalMaxInstruccionesTmp: number;          // 1 Gatillo de monto ($)
  numeroTotalMaxInstruccionesTmp: number;         // 2 Gatillo de numero de ops.
  frecuenciaSlvTmp: number;                       // 3 Gatillo de tiempo (minutos)
  frecuenciaPurgadoSlvTmp: number;                // 4 Gatillo de purgado automatico (minutos)
  isGatilloDinamicoActivoTmp: boolean;            // 5 Gatillo dinamico activo
  isReencoladoAutomaticoTmp: boolean;             // 6 Reencolado automatico activo
  isLimitarRetirosTmp: boolean;                   // 7 Limitar Retiros de Efectivo
  numeroMaximoRetirosTmp: number;                 // 8 Limitar Retiros de Efectivo - Input
  horaInicioValoresTmp: number;                   // 9 Apertura Liq. en Bruto MAV - hora
  minutosInicioValoresTmp: number;                // 9 Apertura Liq. en Bruto MAV - minuto
  horaFinValoresTmp: number;                      // 10 Cierre Liq. en Bruto MAV - hora
  minutosFinValoresTmp: number;                   // 10 Cierre Liq. en Bruto MAV - minuto
  horaRecepcionTmp: number;                       // 11 Recepcion - hora
  minutosRecepcionTmp: number;                    // 11 Recepcion - minuto
  horaAperturaTmp: number;                        // 12 Apertura - hora
  minutosAperturaTmp: number;                     // 12 Apertura - minuto
  horaPreCierreTmp: number;                       // 13 Pre-Cierre - hora
  minutosPreCierreTmp: number;                    // 13 Pre-Cierre - minuto
  horaCierreTmp: number;                          // 14 Cierre - hora
  minutosCierreTmp: number;                       // 14 Cierre - minuto
  diasLiqTmp: String;                             // 15 Dias de Liquidacion
  precioTituloMaximoParaCompensacionTmp: number;  // 16 Precio maximo para compensacion ($)
  timeoutRespuestaCompensadorTmp: number;         // 17 Timeout del compensador (segundos)

  /** VARIABLES PARA ACCIONES */
  user: string;
  isSlvCerrado: boolean;
  isLiquidacionFinDeDiaActivada: boolean;
  isSlvRunning: boolean;
  isCompensadorActive: boolean;
  isDiaInhabil: boolean;



  // IMAGENES DE LOS BOTONES ACCIONES
  slvPlay = 'slvRunning.png';
  slvStop = 'slvDetenido.png';
  compensadorActive = 'compensadorActivo.png';
  compensadorInactive = 'compensadorInactivo.png';
  locked = 'encrypted.png';
  unlocked = 'decrypted.png';
  faultIcon = 'no.png';
  slvStopDisabled = 'slvDetenido_disabled.png';
  compensadorInactiveDisabled = 'compensadorInactivo_disabled.png';
  iniciarCiclo = 'cache.png';
  iniciarCicloDisabled = 'cache_disabled.png';
  applyIconEnabled = 'apply.png';
  applyIconDisabled = 'unapply.png';


  reencolarInstruccionesIconDisabled = 'konquest_disabled.png';
  liquidacionFinDeDiaIconActived = 'liqFinDia_Enabled.png';
  liquidacionFinDeDiaIconDisabled = 'liqFinDia_Disabled.png';
  aboutIcon = 'about_big.png';
  aperturaPreLiqFinDiaIconActived = 'aperturaPreLiqFinDia.png';
  aperturaPostLiqFinDiaIconActived = 'aperturaPostLiqFinDia.png';
  aperturaPreLiqFinDiaIconDisabled = 'aperturaPreLiqFinDia_Disabled.png';
  aperturaPostLiqFinDiaIconDisabled = 'aperturaPostLiqFinDia_Disabled.png';

  // imagenes de iconos de Acciones
  public liquidacionFinDeDiaIcon: string;
  public aperturaPreLiqFinDiaIcon: string;
  public iniciarCicloIcon: string;
  public pauseOrStopSlvIcon: string;
  public compensadorIcon: string;
  public reencolarInstruccionesIcon = 'konquest.png';
  public aperturaPostLiqFinDiaIcon: string;
  // label de Acciones
  pauseOrStopSlvButtonLabel = 'Reanudar SLV';
  enableOrDisableCompensadorButtonLabel = 'Desactivar Comp.';

  editable: boolean;
  isNgOnInit = true;

  dateHraPreCierre: Date;
  dateHraCierre: Date;
  dateHraRecepcion: Date;
  dateHraApertura: Date;


  /** >>>>>>>> CONSTRUCTOR */
  constructor(private spinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private preliquidadorService: PreliquidadorService,
    private senalizadorService: SenalizadorPreliquidadorService,
    private compensadorService: CompensadorService,
    private appStorageService: AppStorageService) {
    this.crearFormulario();
  }

  /** >>>>>>>> INICIANDO */
  ngOnInit(): void {
    this.forma.disable();
    this.editable = false;
    this.user = this.appStorageService.getUserName();
    /*
    this.refresh();
    */
    this.liquidacionFinDeDiaIcon = this.liquidacionFinDeDiaIconDisabled;
    this.aperturaPreLiqFinDiaIcon = this.aperturaPreLiqFinDiaIconDisabled;
    this.iniciarCicloIcon = this.iniciarCicloDisabled;
    this.pauseOrStopSlvIcon = this.slvStopDisabled;
    this.compensadorIcon = this.compensadorInactiveDisabled;
    this.reencolarInstruccionesIcon = this.reencolarInstruccionesIconDisabled;
    this.aperturaPostLiqFinDiaIcon = this.aperturaPostLiqFinDiaIconDisabled;

    // applyChangesButton.setStyle("disabledIcon", applyIconDisabled);
  }



  refresh(): void {
    this.getVersion();
    this.getMontoTotalMaxInstrucciones();            // 1 Gatillo de monto ($)
    this.getNumeroTotalMaxInstrucciones();           // 2 Gatillo de numero de ops.
    this.getFrecuenciaSlv();                         // 3 Gatillo de tiempo (minutos)
    this.getFrecuenciaPurgadoSlv();                  // 4 Gatillo de purgado automatico (minutos)
    this.isGatilloDinamicoActivo_M();                // 5 Gatillo dinamico activo
    this.isReencoladoAutomatico_M();                 // 6 Reencolado automatico activo
    this.isLimitarRetiros_M();                       // 7 Limitar Retiros de Efectivo
    this.getNumeroMaximoRetiros();                   // 8 Limitar Retiros de Efectivo - Input
    this.getFrecuenciaInicioValoresSlv();            // 9 Apertura Liq. en Bruto MAV - hora y minuto
    this.getFrecuenciaFinValoresSlv();               // 10 Cierre Liq. en Bruto MAV  - hora y minuto
    this.getFrecuenciaRecepcionSlv();                // 11 Recepcion - hora y  minuto
    this.getFrecuenciaAperturaSlv();                 // 12 Apertura Liq. en Bruto MAV - hora y minuto
    this.getFrecuenciaPreCierreSlv();                // 13 Pre-Cierre - hora y minuto
    this.getFrecuenciaCierreSlv();                   // 14 Cierre - hora y minuto
    this.getFrecuenciaDiasLiq();                     // 15 Dias de Liquidacion
    this.getPrecioTituloMaximoParaCompensacion();    // 16 Precio maximo para compensacion ($)
    this.getTimeoutRespuesta();                      // 17 Timeout del compensador (segundos)
    this.getNumeroTotalActualInstrucciones();        // 18 Numero actual de operaciones
    this.getNumeroInstruccionesCompensables();       // 19 Compensables
    this.getNumeroInstruccionesCompuestas();         // 20 Compuestas
    this.getNumeroInstruccionesRetirosEfectivo();    // 21 Retiros de Efectivo
    this.getMontoTotalActualInstrucciones();         // 22 Monto total actual acumulado de operaciones ($)
    this.getNumeroAdaptableMaxInstrucciones();       // 23 Valor actual de gatillo dinamico:
    this.isLiquidacionFinDeDiaActivada_M(this.isNgOnInit);
    this.isSlvCerrado_M();
    this.isDiaInhabil_M();
    this.getEstadoSlv(this.isNgOnInit);
    this.isCompensadorActivo(this.isNgOnInit);
    this.isNgOnInit = false;
  }


  /** ACCION - CHECKED - Limitar Retiros de Efectivo */
  change(): void {
    // console.log('Cambiando ' + this.isDisabledCheckbox);
    // console.log(this.forma.controls.f_limitarRetirosDeEfectivo.value);
    if (this.forma.controls.f_limitarRetirosDeEfectivo.value) {
      this.forma.controls.f_lre_i.enable();
    } else {
      this.forma.controls.f_lre_i.disable();
    }
  }

  /** ACCION - BOTON editar */
  public edit(): void {
    if (this.editButton === true) {
      // Editar
      this.editButton = false;
      this.forma.enable();
      this.editable = true;
      this.classDisabled = '';
      this.labelEditar = 'Bloquear Campos';
      this.editButtonImg = 'encrypted.png';
      this.classDisabledAccion = 'div-disabled-accion';
      this.isDisabled = false;
      this.aplicarCambiosImg = 'apply.png';

      // this.liquidacionFinDeDiaIcon = 'mozilla.png';
      // this.aperturaPreLiqFinDiaIcon = this.aperturaPreLiqFinDiaIconDisabled;
      this.iniciarCicloIcon = this.iniciarCiclo;
      // this.pauseOrStopSlvIcon = this.slvStop;
      this.compensadorIcon = this.compensadorInactive;
      this.reencolarInstruccionesIcon = 'konquest.png';
      // this.getEstadoSlv(this.isNgOnInit);
      this.refresh();
      this.change();
    } else {
      // no editar
      this.editButton = true;
      this.forma.disable();
      this.editable = false;
      this.classDisabled = 'div-disabled';
      this.labelEditar = 'Editar Campos';
      this.editButtonImg = 'decrypted.png';
      this.liquidacionFinDeDiaIcon = 'liqFinDia_Disabled.png';
      this.reanudarImg = 'slvDetenido_disabled.png';
      this.desactivarImg = 'compensadorInactivo_disabled.png';
      this.reencolarInstruccionesIcon = 'konquest_disabled.png';
      this.classDisabledAccion = 'box';
      this.isDisabled = true;
      this.aplicarCambiosImg = 'unapply.png';

      this.liquidacionFinDeDiaIcon = this.liquidacionFinDeDiaIconDisabled;
      //this.aperturaPreLiqFinDiaIcon = this.aperturaPreLiqFinDiaIconDisabled;
      this.iniciarCicloIcon = this.iniciarCicloDisabled;
      this.pauseOrStopSlvIcon = this.slvStopDisabled;
      this.compensadorIcon = this.compensadorInactiveDisabled;
      this.reencolarInstruccionesIcon = this.reencolarInstruccionesIconDisabled;
      this.aperturaPostLiqFinDiaIcon = this.aperturaPostLiqFinDiaIconDisabled;
    }
  }



  /* Metodo para crear el Fomulario */
  private crearFormulario(): void {
    this.forma = this.fb.group({
      f_gatilloDeMonto: ['', [Validators.required, Validators.minLength(3)]],
      f_gatilloDeNumeroDeOps: ['', [Validators.required]],
      f_gatilloDeTiempo: ['', [Validators.required]],
      f_gatilloDePurgadoAutomatico: ['', [Validators.required]],
      f_gatilloDinamicoActivo: [false, [Validators.required]],
      f_reencoladoAutomaticoActivo: [false, [Validators.required]],
      f_limitarRetirosDeEfectivo: [false, [Validators.required]],
      f_lre_i: ['', [Validators.required]],
      f_alb_h: [0, [Validators.required]],
      f_alb_m: [0, [Validators.required]],
      f_clb_h: [0, [Validators.required]],
      f_clb_m: [0, [Validators.required]],
      f_r_h: [0, [Validators.required]],
      f_r_m: [0, [Validators.required]],
      f_a_h: [0, [Validators.required]],
      f_a_m: [0, [Validators.required]],
      f_pc_h: [0, [Validators.required]],
      f_pc_m: [0, [Validators.required]],
      f_c_h: [0, [Validators.required]],
      f_c_m: [0, [Validators.required]],
      f_lu: [false, [Validators.required]],
      f_ma: [false, [Validators.required]],
      f_mi: [false, [Validators.required]],
      f_ju: [false, [Validators.required]],
      f_vi: [false, [Validators.required]],
      f_sa: [false, [Validators.required]],
      f_do: [false, [Validators.required]],
      f_pmc: ['', [Validators.required]],
      f_tc: ['', [Validators.required]]
    });

    this.forma.controls.f_gatilloDeMonto.valueChanges.subscribe(data => {
      console.log('f_gatilloDeMonto => ' + data);
      if (this.forma.controls.f_gatilloDeMonto.value == '') {
        this.forma.controls.f_gatilloDeMonto.setValue('0');
      } else {
        this.forma.controls.f_gatilloDeMonto.setValue(this.forma.controls.f_gatilloDeMonto.value.substr(1));
      }
    });


  }

  applyChanges(): void {
    console.log('Cambios');
    this.statusActualizar = false;
    if (this.montoTotalMaxInstruccionesTmp != this.forma.controls.f_gatilloDeMonto.value) {
      this.modificarMontoTotalMaxInstrucciones(this.forma.controls.f_gatilloDeMonto.value, this.user);
      this.statusActualizar = true;
    }

    if (this.numeroTotalMaxInstruccionesTmp != this.forma.controls.f_gatilloDeNumeroDeOps.value) {
      this.modificarNumeroTotalMaxInstrucciones(this.forma.controls.f_gatilloDeNumeroDeOps.value, this.user);
      this.statusActualizar = true;
    }

    if (this.frecuenciaSlvTmp != this.forma.controls.f_gatilloDeTiempo.value) {
      this.modificarFrecuenciaSlv(this.forma.controls.f_gatilloDeTiempo.value, this.user);
      this.statusActualizar = true;
    }
    if (this.frecuenciaPurgadoSlvTmp != this.forma.controls.f_gatilloDePurgadoAutomatico.value) {
      this.modificarFrecuenciaPurgadoSlv(this.forma.controls.f_gatilloDePurgadoAutomatico.value, this.user);
      this.statusActualizar = true;
    }

    if (this.isGatilloDinamicoActivoTmp != this.forma.controls.f_gatilloDinamicoActivo.value) {
      this.modificarGatilloDinamicoActivo(this.forma.controls.f_gatilloDinamicoActivo.value, this.user);
      this.statusActualizar = true;
    }

    if (this.isReencoladoAutomaticoTmp != this.forma.controls.f_reencoladoAutomaticoActivo.value) {
      this.modificarReencoladoAutomatico(this.forma.controls.f_reencoladoAutomaticoActivo.value, this.user);
      this.statusActualizar = true;
    }

    if (this.isLimitarRetirosTmp != this.forma.controls.f_limitarRetirosDeEfectivo.value) {
      this.modificarLimitarRetiros(this.forma.controls.f_limitarRetirosDeEfectivo.value, this.user);
      this.statusActualizar = true;
    }

    if (this.numeroMaximoRetirosTmp != this.forma.controls.f_lre_i.value) {
      this.modificarNumeroMaximoRetiros(this.forma.controls.f_lre_i.value, this.user);
      this.statusActualizar = true;
    }

    // tslint:disable-next-line: max-line-length
    if ((this.horaInicioValoresTmp != this.forma.controls.f_alb_h.value) || (this.minutosInicioValoresTmp != this.forma.controls.f_alb_m.value)) {
      this.modificarFrecuenciaInicioValoresSlv(this.forma.controls.f_alb_h.value, this.forma.controls.f_alb_m.value, this.user);
      this.statusActualizar = true;
    }

    // tslint:disable-next-line: max-line-length
    if ((this.horaFinValoresTmp != this.forma.controls.f_clb_h.value) || (this.minutosFinValoresTmp != this.forma.controls.f_clb_m.value)) {
      this.modificarFrecuenciaFinValoresSlv(this.forma.controls.f_clb_h.value, this.forma.controls.f_clb_m.value, this.user);
      this.statusActualizar = true;
    }
    // tslint:disable-next-line: max-line-length
    if ((this.horaRecepcionTmp != this.forma.controls.f_r_h.value) || (this.minutosRecepcionTmp != this.forma.controls.f_r_m.value)) {
      this.modificarFrecuenciaRecepcionSlv(this.forma.controls.f_r_h.value, this.forma.controls.f_r_m.value, this.user);
      this.statusActualizar = true;
    }
    // tslint:disable-next-line: max-line-length
    if ((this.horaAperturaTmp != this.forma.controls.f_a_h.value) || (this.minutosAperturaTmp != this.forma.controls.f_a_m.value)) {
      this.modificarFrecuenciaAperturaSlv(this.forma.controls.f_a_h.value, this.forma.controls.f_a_m.value, this.user);
      this.statusActualizar = true;
    }
    // tslint:disable-next-line: max-line-length
    if ((this.horaPreCierreTmp != this.forma.controls.f_pc_h.value) || (this.minutosPreCierreTmp != this.forma.controls.f_pc_m.value)) {
      this.modificarFrecuenciaPreCierreSlv(this.forma.controls.f_pc_h.value, this.forma.controls.f_pc_m.value, this.user);
      this.statusActualizar = true;
    }
    // tslint:disable-next-line: max-line-length
    if ((this.horaCierreTmp != this.forma.controls.f_c_h.value) || (this.minutosCierreTmp != this.forma.controls.f_c_m.value)) {
      this.modificarFrecuenciaCierreSlv(this.forma.controls.f_c_h.value, this.forma.controls.f_c_m.value, this.user);
      this.statusActualizar = true;
    }

    if (this.precioTituloMaximoParaCompensacionTmp != this.forma.controls.f_pmc.value) {
      this.modificarPrecioTituloMaximoParaCompensacion(this.forma.controls.f_pmc.value, this.user);
      this.statusActualizar = true;
    }

    if (this.timeoutRespuestaCompensadorTmp != this.forma.controls.f_tc.value) {
      this.modificarTimeoutRespuesta(this.forma.controls.f_tc.value * 1000, this.user);
      this.statusActualizar = true;
    }

    this.makeDiasLiqStr(this.user);
  }

  makeDiasLiqStr(user: string): void {

    let addComa = false;
    this.diasLiq = '';
    console.log(this.diasLiq);
    if (this.forma.controls.f_lu.value) {
      this.diasLiq = this.diasLiq + 'MON';
      addComa = true;
    }
    if (this.forma.controls.f_ma.value) {
      if (addComa) {
        this.diasLiq = this.diasLiq + ',TUE';
      }
      else {
        this.diasLiq = this.diasLiq + 'TUE';
        addComa = true;
      }
    }
    if (this.forma.controls.f_mi.value) {
      if (addComa) {
        this.diasLiq = this.diasLiq + ',WED';
      }
      else {
        this.diasLiq = this.diasLiq + 'WED';
        addComa = true;
      }
    }
    if (this.forma.controls.f_ju.value) {
      if (addComa) {
        this.diasLiq = this.diasLiq + ',THU';
      }
      else {
        this.diasLiq = this.diasLiq + 'THU';
        addComa = true;
      }
    }
    if (this.forma.controls.f_vi.value) {
      if (addComa) {
        this.diasLiq = this.diasLiq + ',FRI';
      }
      else {
        this.diasLiq = this.diasLiq + 'FRI';
        addComa = true;
      }
    }
    if (this.forma.controls.f_sa.value) {
      if (addComa) {
        this.diasLiq = this.diasLiq + ',SAT';
      }
      else {
        this.diasLiq = this.diasLiq + 'SAT';
        addComa = true;
      }
    }
    if (this.forma.controls.f_do.value) {
      if (addComa) {
        this.diasLiq = this.diasLiq + ',SUN';
      }
      else {
        this.diasLiq = this.diasLiq + 'SUN';
        addComa = true;
      }
    }
    console.log('tEMP ' + this.diasLiqTmp);
    console.log(this.diasLiq);
    if (this.diasLiqTmp != this.diasLiq) {
      this.statusActualizar = true;
      this.modificarFrecuenciaDiasLiq(this.diasLiq, user);
    }

    if (this.statusActualizar) {
      Swal.fire({
        icon: 'success',
        title: 'Actualización de información con éxito',
        text: ''
      });
    }
  }


  viewVersion(): void {
    Swal.fire({
      icon: 'info',
      title: 'La versión es:',
      text: this.version
    });
  }

  /*************************************************************
   ***  LIQUIDACION FIN DE DIA  ********************************
   *************************************************************/
  confirmLiquidacionFinDeDia(): void {
    Swal.fire({
      title: 'Estas seguro que desea ejecutar la liq. fin de dia?',
      // text: 'Confirm liq. fin de dia',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si',

    }).then((result) => {
      if (result.isConfirmed) {
        this.liquidacionFinDeDia();
      }
    });
  }

  liquidacionFinDeDia(): void {
    console.log('isLiquidacionFinDeDiaActivada = ' + this.isLiquidacionFinDeDiaActivada);
    // liquidacionFinDeDiaButton.setStyle("icon", liquidacionFinDeDiaIconActived);
    if (!this.isLiquidacionFinDeDiaActivada) {
      this.spinnerService.show();
      this.preliquidadorService.liquidacionFinDeDia(this.user)
        .subscribe(
          data => {
            console.log('======= liquidacionFinDeDia');
            this.isLiquidacionFinDeDiaActivada = data;
            if (this.isLiquidacionFinDeDiaActivada) {
              // liquidacionFinDeDiaButton.setStyle("icon", liquidacionFinDeDiaIconActived);
              this.liquidacionFinDeDiaIcon = 'liqFinDia_Enabled.png';
            }
            else {
              this.liquidacionFinDeDiaIcon = 'mozilla.png';
              // liquidacionFinDeDiaButton.setStyle("icon", liquidacionFinDeDiaIcon);
            }
            // liquidacionFinDeDiaButton.setStyle("icon", liquidacionFinDeDiaIconActived);
            this.liquidacionFinDeDiaIcon = 'liqFinDia_Enabled.png';
            this.producerControlSlv();
          },
          error => {
            this.errorHttp('modificarMontoTotalMaxInstrucciones', '', error.mesage);
          });

    }
    else {
      //fault("Imposible ejecutar de nuevo la liquidacion de fin de dia.");
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Imposible ejecutar de nuevo la liquidacion de fin de dia.'
      });
    }

  }

  producerControlSlv(): void {
    this.senalizadorService.getSlvTimeInMillis().subscribe(
      data => {
        console.log('======= getSlvTimeInMillis');
        this.processSlvTimeInMillis(data);
        this.spinnerService.hide();
      },
      error => {
        this.errorHttp('getSlvTimeInMillis', '', error.mesage);
      });
  }

  processSlvTimeInMillis(slvTime: number): void {
    console.log('Terminar liquidacion ok');
    /*
    var message: AsyncMessage = new AsyncMessage();
    this.dateHraPreCierre.setHours(this.horaPreCierre);
    this.dateHraPreCierre.setMinutes(this.minutosPreCierre);
    this.dateHraCierre.setHours(this.horaCierre);
    this.dateHraCierre.setMinutes(this.minutosCierre);
    this.dateHraRecepcion.setHours(this.horaRecepcion);
    this.dateHraRecepcion.setMinutes(this.minutosRecepcion);
    this.dateHraApertura.setHours(this.horaApertura);
    this.dateHraApertura.setMinutes(this.minutosApertura);

    var controlSlv: ControlSlv = new ControlSlv();
    controlSlv.setHraPreCierre(dateHraPreCierre);
    controlSlv.setHraCierre(dateHraCierre);
    controlSlv.setHraRecepcion(dateHraRecepcion);
    controlSlv.setHraApertura(dateHraApertura);
    controlSlv.setSlvTimeInMillis(slvTime);
    if (this.isLiquidacionFinDeDiaActivada) {
      controlSlv.setLiqFinDeDia(true);
    }
    message.body = controlSlv.convertToXML();
    //Alert.show(isSlvCerrado.toString(), 'Box', mx.controls.Alert.OK);
    producerSlvTopic.send(message);
   */
  }

  /*************************************************************
   ***  APERTURA PRE LIQ. DE FIN DE DIA  ***********************
   *************************************************************/
  confirmAperturaPreLiqFinDia(): void {
    if (!this.isSlvRunning) {
      // Alert.show("Estas seguro que desea abrir la pre liq. fin de dia?",
      Swal.fire({
        title: 'Estas seguro que desea abrir la pre liq. fin de dia?',
        text: 'Confirm Apertura pre liq. fin de dia',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si',

      }).then((result) => {
        if (result.isConfirmed) {
          this.aperturaPreLiqFinDia();
        }
      });
    }
    else {
      // fault("El SLV debe estar pausado para poder ejecutar esta accion.");
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'El SLV debe estar pausado para poder ejecutar esta accion.'
      });
    }
  }

  aperturaPreLiqFinDia(): void {
    if (this.isLiquidacionFinDeDiaActivada) {
      this.spinnerService.show();
      this.preliquidadorService.procesarAperturaPreLiqFinDia(this.user)
        .subscribe(
          data => {
            console.log('### procesarAperturaPreLiqFinDia');
            this.spinnerService.hide();
          },
          error => {
            this.errorHttp('procesarAperturaPreLiqFinDia', '', error.mesage);
          });
    }
    else {
      // fault("Imposible ejecutar la apertura preliquidacion de fin de dia.");
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Imposible ejecutar la apertura preliquidacion de fin de dia.'
      });
    }
  }

  /*************************************************************
   ***  FORZAR CICLO DE LIQ.  **********************************
   *************************************************************/

  iniciarCicloLiquidacionAsincrono(): void {
    this.spinnerService.show();
    this.preliquidadorService.iniciarCicloLiquidacionAsincrono(this.user)
      .subscribe(
        data => {
          console.log('### iniciarCicloLiquidacionAsincrono');
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('iniciarCicloLiquidacionAsincrono', '', error.mesage);
        });
  }

  /*************************************************************
   ***  Pausar SLV o Reanudar SLV  *****************************
   *************************************************************/
  pauseOrStopSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getEstadoSlv().subscribe(
      data => {
        console.log('### getEstadoSlv');
        this.configPauseOrResumeSlvButton(data);
        this.isSlvRunning = data;
        if (this.isSlvRunning) {
          this.preliquidadorService.pausarPreliquidador(this.user).subscribe(
            data1 => {
              console.log('### pausarPreliquidador');
              this.senalizadorService.getEstadoSlv().subscribe(
                data3 => {
                  console.log('### getEstadoSlv TRUE');
                  this.configPauseOrResumeSlvButton(data3);
                },
                error => {
                  this.errorHttp('getEstadoSlv', '', error.mesage);
                });
            },
            error => {
              this.errorHttp('pausarPreliquidador', '', error.mesage);
            });
        }
        else {
          this.preliquidadorService.reanudarPreliquidador(this.user).subscribe(
            data2 => {
              console.log('### reanudarPreliquidador');
              this.senalizadorService.getEstadoSlv().subscribe(
                data4 => {
                  console.log('### getEstadoSlv FALSE');
                  this.configPauseOrResumeSlvButton(data4);
                },
                error => {
                  this.errorHttp('getEstadoSlv', '', error.mesage);
                });
            },
            error => {
              this.errorHttp('reanudarPreliquidador', '', error.mesage);
            });
        }
      },
      error => {
        this.errorHttp('getEstadoSlv', '', error.mesage);
      });
  }


  configPauseOrResumeSlvButton(isRunning: boolean): void {
    this.isSlvRunning = isRunning;
    console.log('############');
    console.log(this.isSlvRunning);
    if (this.isSlvRunning) {
      console.log('############ TRUE');
      // this.pauseOrStopSlvIcon = 'slvDetenido.png';
      this.pauseOrStopSlvIcon = '';
      this.pauseOrStopSlvIcon = 'slvDetenido.png';
      console.log(this.pauseOrStopSlvIcon);
      // pauseOrStopSlvButton.setStyle("icon", slvStop);
      this.pauseOrStopSlvButtonLabel = 'Pausar SLV';
    }
    else {
      console.log('############ FALSE');
      // this.pauseOrStopSlvIcon = 'slvRunning.png';
      this.pauseOrStopSlvIcon = '';
      this.pauseOrStopSlvIcon = 'slvRunning.png';
      console.log(this.pauseOrStopSlvIcon);
      // pauseOrStopSlvButton.setStyle("icon", slvPlay);
      this.pauseOrStopSlvButtonLabel = 'Reanudar SLV';
    }
    this.spinnerService.hide();
  }
  /*
    [Embed("img/slvDetenido.png")]
        [Bindable]
        public var slvStop:Class;
  
        [Embed("img/slvRunning.png")]
        [Bindable]
        public var slvPlay:Class;
  */


  /*************************************************************
   ***  Desactivar comp. o  Activar comp. **********************
   *************************************************************/
  enableOrDisableCompensador(): void {
    if (this.isCompensadorActive) {
      this.spinnerService.show();
      this.compensadorService.desactivarCompensador(this.user).subscribe(
        data => {
          console.log('### desactivarCompensador');
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('desactivarCompensador', '', error.mesage);
        });
      this.isCompensadorActive = false;
    }
    else {
      this.spinnerService.show();
      this.compensadorService.activarCompensador(this.user).subscribe(
        data => {
          console.log('### activarCompensador');
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('activarCompensador', '', error.mesage);
        });
      this.isCompensadorActive = true;
    }
    this.configEnableOrDisableCompensadorButton(this.isCompensadorActive);
  }

  configEnableOrDisableCompensadorButton(isActive: boolean): void {
    this.isCompensadorActive = isActive;
    if (this.isCompensadorActive) {
      //  enableOrDisableCompensadorButton.setStyle("icon", compensadorInactive);
      this.compensadorIcon = 'compensadorInactivo.png';
      this.enableOrDisableCompensadorButtonLabel = 'Desactivar comp.';
    }
    else {
      this.compensadorIcon = 'compensadorActivo.png';
      //  enableOrDisableCompensadorButton.setStyle("icon", compensadorActive);
      this.enableOrDisableCompensadorButtonLabel = 'Activar comp.';
    }
  }
  /*
    [Embed("img/compensadorInactivo.png")]
    [Bindable]
    public var compensadorInactive:Class;

    [Embed("img/compensadorActivo.png")]
    [Bindable]
    public var compensadorActive:Class;
  */
  /*************************************************************
   ***  Purgar y reencolar  ************************************
   *************************************************************/
  resetPreliquidador(): void {
    // senalizadorPreliquidador.getEstadoSlv();
    this.spinnerService.show();
    this.senalizadorService.getEstadoSlv().subscribe(
      data => {
        console.log('### getEstadoSlv');
        this.configPauseOrResumeSlvButton2(data);
      },
      error => {
        this.errorHttp('getEstadoSlv', '', error.mesage);
      });
  }

  configPauseOrResumeSlvButton2(isRunning: boolean): void {
    this.isSlvRunning = isRunning;
    if (this.isSlvRunning) {
      this.slvPlay = 'slvDetenido.png';
      // pauseOrStopSlvButton.setStyle("icon", slvStop);
      this.pauseOrStopSlvButtonLabel = 'Pausar SLV';
    }
    else {
      this.slvPlay = 'slvRunning.png';
      // pauseOrStopSlvButton.setStyle("icon", slvPlay);
      this.pauseOrStopSlvButtonLabel = 'Reanudar SLV';
    }
    if (!this.isSlvRunning) {
      // preliquidador.resetPreliquidador()
      this.preliquidadorService.resetPreliquidador(this.user).subscribe(
        data => {
          console.log('### pausarPreliquidador');
          this.reencolarInstruccionesPendientes();
        },
        error => {
          this.errorHttp('pausarPreliquidador', '', error.mesage);
        });
    }
    else {
      this.spinnerService.hide();
      // fault("Imposible reestablecer el SLV. Debe estar pausado para poder ejecutar esta accion.");
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Imposible reestablecer el SLV. Debe estar pausado para poder ejecutar esta acción.'
      });
    }
  }

  reencolarInstruccionesPendientes(): void {
    // senalizadorPreliquidador.reencolarInstruccionesPendientes();
    this.senalizadorService.reencolarInstruccionesPendientes(this.user).subscribe(
      data => {
        console.log('### reencolarInstruccionesPendientes');
        this.spinnerService.hide();
      },
      error => {
        this.errorHttp('reencolarInstruccionesPendientes', '', error.mesage);
      });
  }

  /*************************************************************
 ***  Apertura Post liq. de fin de dia  ************************
 *************************************************************/
  confirmAperturaPostLiqFinDia(): void {
    // Alert.show("Estas seguro que desea abrir la post liq. fin de dia?", "Confirm Apertura post liq. fin de dia", Alert.YES | Alert.NO, null, aperturaPostLiqFinDia, null, Alert.NO);
    Swal.fire({
      title: 'Estas seguro que desea abrir la post liq. fin de día?',
      // text: 'Confirm Apertura post liq. fin de dia',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si',

    }).then((result) => {
      if (result.isConfirmed) {
        this.aperturaPostLiqFinDia();
      }
    });
  }

  aperturaPostLiqFinDia(): void {
    if (this.isSlvCerrado) {
      // preliquidador.procesarAperturaPostLiqFinDia();
      this.spinnerService.show();
      this.preliquidadorService.procesarAperturaPostLiqFinDia(this.user).subscribe(
        data => {
          console.log('### procesarAperturaPostLiqFinDia');
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('procesarAperturaPostLiqFinDia', '', error.mesage);
        });

    }
    else {
      Swal.fire({
        icon: 'info',
        title: '',
        text: 'Imposible ejecutar la apertura postliquidación de fin de día.'
      });
    }
  }

  /****************************************************************************
   ******************  LLAMADO DE SERVICIOS UPDATE ****************************
   ***************************************************************************/

  private modificarMontoTotalMaxInstrucciones(monto: string, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarMontoTotalMaxInstrucciones(monto, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - Gatillo de monto');
          this.montoTotalMaxInstruccionesTmp = this.forma.controls.f_gatilloDeMonto.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarMontoTotalMaxInstrucciones', '', error.mesage);
        });
  }

  private modificarNumeroTotalMaxInstrucciones(monto: string, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarNumeroTotalMaxInstrucciones(monto, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - Gatillo de número de ops');
          this.numeroTotalMaxInstruccionesTmp = this.forma.controls.f_gatilloDeNumeroDeOps.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarNumeroTotalMaxInstrucciones', '', error.mesage);
        });
  }

  private modificarFrecuenciaSlv(frecuenciaMinutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaSlv(frecuenciaMinutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaSlv');
          this.frecuenciaSlvTmp = this.forma.controls.f_gatilloDeTiempo.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaPurgadoSlv(frecuenciaMinutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaPurgadoSlv(frecuenciaMinutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaPurgadoSlv');
          this.frecuenciaPurgadoSlvTmp = this.forma.controls.f_gatilloDePurgadoAutomatico.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaPurgadoSlv', '', error.mesage);
        });
  }

  private modificarGatilloDinamicoActivo(gatilloDinamicoActivo: boolean, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarGatilloDinamicoActivo(gatilloDinamicoActivo, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarGatilloDinamicoActivo');
          this.isGatilloDinamicoActivoTmp = this.forma.controls.f_gatilloDinamicoActivo.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarGatilloDinamicoActivo', '', error.mesage);
        });
  }

  private modificarReencoladoAutomatico(reencoladoAutomatico: boolean, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarReencoladoAutomatico(reencoladoAutomatico, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - ReencoladoAutomatico');
          this.isReencoladoAutomaticoTmp = this.forma.controls.f_reencoladoAutomaticoActivo.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarReencoladoAutomatico', '', error.mesage);
        });
  }

  private modificarLimitarRetiros(limitarRetiros: boolean, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarLimitarRetiros(limitarRetiros, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarLimitarRetiros');
          this.isLimitarRetirosTmp = this.forma.controls.f_limitarRetirosDeEfectivo.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarLimitarRetiros', '', error.mesage);
        });
  }

  private modificarNumeroMaximoRetiros(numeroMaximoRetiros: number, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarNumeroMaximoRetiros(numeroMaximoRetiros, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarNumeroMaximoRetiros');
          this.numeroMaximoRetirosTmp = this.forma.controls.f_lre_i.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarNumeroMaximoRetiros', '', error.mesage);
        });
  }

  private modificarFrecuenciaInicioValoresSlv(hora: number, minutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaInicioValoresSlv(hora, minutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaInicioValoresSlv');
          this.horaInicioValoresTmp = this.forma.controls.f_alb_h.value;
          this.minutosInicioValoresTmp = this.forma.controls.f_alb_m.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaInicioValoresSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaFinValoresSlv(hora: number, minutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaFinValoresSlv(hora, minutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaFinValoresSlv');
          this.horaFinValoresTmp = this.forma.controls.f_clb_h.value;
          this.minutosFinValoresTmp = this.forma.controls.f_clb_m.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaFinValoresSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaRecepcionSlv(hora: number, minutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaRecepcionSlv(hora, minutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaRecepcionSlv');
          this.horaRecepcionTmp = this.forma.controls.f_r_h.value;
          this.minutosRecepcionTmp = this.forma.controls.f_r_m.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaRecepcionSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaAperturaSlv(hora: number, minutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaAperturaSlv(hora, minutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaAperturaSlv');
          this.horaAperturaTmp = this.forma.controls.f_a_h.value;
          this.minutosAperturaTmp = this.forma.controls.f_a_m.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaAperturaSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaPreCierreSlv(hora: number, minutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaPreCierreSlv(hora, minutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaPreCierreSlv');
          this.horaPreCierreTmp = this.forma.controls.f_pc_h.value;
          this.minutosPreCierreTmp = this.forma.controls.f_pc_m.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaPreCierreSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaCierreSlv(hora: number, minutos: number, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaCierreSlv(hora, minutos, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaCierreSlv');
          this.horaCierreTmp = this.forma.controls.f_c_h.value;
          this.minutosCierreTmp = this.forma.controls.f_c_m.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaCierreSlv', '', error.mesage);
        });
  }

  private modificarFrecuenciaDiasLiq(diasLiquidacion: String, usuario: string): any {
    this.spinnerService.show();
    this.senalizadorService.updateFrecuenciaDiasLiq(diasLiquidacion, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarFrecuenciaDiasLiq');


          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarFrecuenciaDiasLiq', '', error.mesage);
        });
  }

  private modificarPrecioTituloMaximoParaCompensacion(umbral: string, usuario: string): any {
    this.spinnerService.show();
    this.preliquidadorService.modificarPrecioTituloMaximoParaCompensacion(umbral, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarPrecioTituloMaximoParaCompensacion');
          this.precioTituloMaximoParaCompensacionTmp = this.forma.controls.f_pmc.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarPrecioTituloMaximoParaCompensacionM', '', error.mesage);
        });
  }

  private modificarTimeoutRespuesta(timeoutRespuesta: number, usuario: string): any {
    this.spinnerService.show();
    this.compensadorService.modificarTimeoutRespuesta(timeoutRespuesta, usuario)
      .subscribe(
        data => {
          console.log('======= Se modifico con exito - modificarTimeoutRespuesta');
          this.timeoutRespuestaCompensadorTmp = this.forma.controls.f_tc.value;
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('modificarTimeoutRespuesta', '', error.mesage);
        });
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
          console.log(this.version);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getVersion', '', error.mesage);
        });
  }

  // SERVICIO - Gatillo de monto ($): - getMontoTotalMaxInstrucciones == f_gatilloDeMonto   1
  private getMontoTotalMaxInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getMontoTotalMaxInstrucciones()
      .subscribe(
        data => {
          this.montoTotalMaxInstruccionesTmp = data;
          this.forma.controls.f_gatilloDeMonto.setValue(data);
          console.log(data);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getMontoTotalMaxInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroTotalMaxInstrucciones == f_gatilloDeNumeroDeOps    2
  private getNumeroTotalMaxInstrucciones(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroTotalMaxInstrucciones()
      .subscribe(
        data => {
          this.numeroTotalMaxInstruccionesTmp = data;
          this.forma.controls.f_gatilloDeNumeroDeOps.setValue(data);
          console.log(data);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroTotalMaxInstrucciones', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaSlv == f_gatilloDeTiempo    3
  private getFrecuenciaSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaSlv()
      .subscribe(
        data => {
          this.frecuenciaSlvTmp = data;
          this.forma.controls.f_gatilloDeTiempo.setValue(data);
          console.log(data);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaPurgadoSlv == f_gatilloDePurgadoAutomático    4
  private getFrecuenciaPurgadoSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaPurgadoSlv()
      .subscribe(
        data => {
          this.frecuenciaPurgadoSlvTmp = data;
          this.forma.controls.f_gatilloDePurgadoAutomatico.setValue(data);
          console.log(data);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaPurgadoSlv', '', error.mesage);
        });
  }

  // SERVICIO - isGatilloDinamicoActivo == f_gatilloDinamicoActivo      5
  private isGatilloDinamicoActivo_M(): void {
    this.spinnerService.show();
    this.preliquidadorService.isGatilloDinamicoActivo()
      .subscribe(
        data => {
          this.isGatilloDinamicoActivoTmp = data;
          this.forma.controls.f_gatilloDinamicoActivo.setValue(data);
          console.log(data);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isGatilloDinamicoActivo', '', error.mesage);
        });
  }

  // SERVICIO - isReencoladoAutomatico == f_reencoladoAutomaticoActivo    6
  private isReencoladoAutomatico_M(): void {
    this.spinnerService.show();
    this.preliquidadorService.isReencoladoAutomatico()
      .subscribe(
        data => {
          this.isReencoladoAutomaticoTmp = data;
          this.forma.controls.f_reencoladoAutomaticoActivo.setValue(data);
          console.log(data);
          this.spinnerService.hide();
        },
        error => {
          console.log('Aqui fallo');
          this.errorHttp('isReencoladoAutomatico_M', '', error.mesage);
        });
  }

  // SERVICIO - isLimitarRetiros == f_limitarRetirosDeEfectivo     7
  private isLimitarRetiros_M(): void {
    this.spinnerService.show();
    this.preliquidadorService.isLimitarRetiros()
      .subscribe(
        data => {
          this.isLimitarRetirosTmp = data;
          this.forma.controls.f_limitarRetirosDeEfectivo.setValue(data);
          console.log('#####################');
          console.log(data);
          console.log('isDisabledCheckbox');
          this.isDisabledCheckbox = data;
          if (this.isDisabledCheckbox) {
            console.log('habilitado');
            this.forma.controls.f_lre_i.enable();
          } else {
            console.log('deshabilitado');
            this.forma.controls.f_lre_i.disable();
          }
          console.log(this.isDisabledCheckbox);
          //console.log(this.isLimitarRetiros);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isLimitarRetiros', '', error.mesage);
        });
  }

  // SERVICIO - getNumeroMaximoRetiros == f_lre_i     8
  private getNumeroMaximoRetiros(): void {
    this.spinnerService.show();
    this.preliquidadorService.getNumeroMaximoRetiros()
      .subscribe(
        data => {
          this.numeroMaximoRetiros = data;
          this.numeroMaximoRetirosTmp = data;
          this.forma.controls.f_lre_i.setValue(data);
          console.log(this.numeroMaximoRetiros);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getNumeroMaximoRetiros', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaInicioValoresSlv ==     9
  private getFrecuenciaInicioValoresSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaInicioValoresSlv()
      .subscribe(
        data => {
          console.log(data);
          this.horaInicioValoresTmp = data.hora;
          this.minutosInicioValoresTmp = data.minuto;

          this.horaInicioValores = data.hora;
          this.minutosInicioValores = data.minuto;

          this.forma.controls.f_alb_h.setValue(this.horaInicioValores);
          this.forma.controls.f_alb_m.setValue(this.minutosInicioValores);

          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaInicioValoresSlv', '', error.mesage);
        });
  }

  // SERVICIO - getFrecuenciaFinValoresSlv ==    10
  private getFrecuenciaFinValoresSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaFinValoresSlv()
      .subscribe(
        data => {
          this.horaFinValoresTmp = data.hora;
          this.minutosFinValoresTmp = data.minuto;

          this.horaFinValores = data.hora;
          this.minutosFinValores = data.minuto;

          this.forma.controls.f_clb_h.setValue(this.horaFinValores);
          this.forma.controls.f_clb_m.setValue(this.minutosFinValores);

          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getFrecuenciaFinValoresSlv', '', error.mesage);
        });
  }

  // SERVICIO - getPrecioTituloMaximoParaCompensacion
  private getPrecioTituloMaximoParaCompensacion(): void {
    this.spinnerService.show();
    this.preliquidadorService.getPrecioTituloMaximoParaCompensacion()
      .subscribe(
        data => {
          this.precioTituloMaximoParaCompensacion = data;
          this.precioTituloMaximoParaCompensacionTmp = data;
          console.log(this.precioTituloMaximoParaCompensacion);
          this.forma.controls.f_pmc.setValue(this.precioTituloMaximoParaCompensacion);
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
  private isLiquidacionFinDeDiaActivada_M(isNgOnInit: boolean): void {
    this.spinnerService.show();
    this.preliquidadorService.isLiquidacionFinDeDiaActivada()
      .subscribe(
        data => {
          if (!isNgOnInit) {
            this.configEnableOrDisableLiquidacionFinDeDiaButton(data);
          }
          this.liquidacionFinDeDiaActivada = data;
          this.isLiquidacionFinDeDiaActivada = data;
          console.log(this.liquidacionFinDeDiaActivada);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isLiquidacionFinDeDiaActivada', '', error.mesage);
        });
  }

  configEnableOrDisableLiquidacionFinDeDiaButton(isActive: boolean): void {
    this.isLiquidacionFinDeDiaActivada = isActive;

    if (this.isLiquidacionFinDeDiaActivada) {
      // liquidacionFinDeDiaButton.setStyle("icon", liquidacionFinDeDiaIconActived);
      this.liquidacionFinDeDiaIcon = 'liqFinDia_Enabled.png';
    }
    else {
      // liquidacionFinDeDiaButton.setStyle("icon", liquidacionFinDeDiaIcon);
      this.liquidacionFinDeDiaIcon = 'mozilla.png';
    }

  }

  /*
  [Embed("img/mozilla.png")]
      [Bindable]
      public var liquidacionFinDeDiaIcon:Class;

      [Embed("img/liqFinDia_Enabled.png")]
      [Bindable]
      public var liquidacionFinDeDiaIconActived:Class;
*/


  // SERVICIO - isSlvCerrado
  private isSlvCerrado_M(): void {
    this.spinnerService.show();
    this.preliquidadorService.isSlvCerrado()
      .subscribe(
        data => {
          this.slvCerrado = data;
          this.isSlvCerrado = data;
          console.log('############### isSlvCerrado = ' + this.isSlvCerrado);
          console.log('isSlvCerrado = ' + this.slvCerrado);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isSlvCerrado_M', '', error.mesage);
        });
  }

  // SERVICIO - isDiaInhabil
  private isDiaInhabil_M(): void {
    this.spinnerService.show();
    this.preliquidadorService.isDiaInhabil()
      .subscribe(
        data => {
          this.isDiaInhabil = data;
          this.diaInhabil = data;
          console.log(this.diaInhabil);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('isDiaInhabil', '', error.mesage);
        });
  }

  // SERVICIO - getEstadoSlv
  private getEstadoSlv(isNgOnInit: boolean): void {
    this.spinnerService.show();
    this.senalizadorService.getEstadoSlv()
      .subscribe(
        data => {
          this.isSlvRunning = data;
          this.estadoSlv = data;
          if (!isNgOnInit) {
            this.configPauseOrResumeSlvButton(data);
          }
          console.log(this.estadoSlv);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getEstadoSlv', '', error.mesage);
        });
  }






  // SERVICIO - getFrecuenciaRecepcionSlv
  private getFrecuenciaRecepcionSlv(): void {
    this.spinnerService.show();
    this.senalizadorService.getFrecuenciaRecepcionSlv()
      .subscribe(
        data => {
          this.horaRecepcionTmp = data.hora;
          this.minutosRecepcionTmp = data.minuto;

          this.horaRecepcion = data.hora;;
          this.minutosRecepcion = data.minuto;

          this.forma.controls.f_r_h.setValue(this.horaRecepcion);
          this.forma.controls.f_r_m.setValue(this.minutosRecepcion);

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

          this.horaAperturaTmp = data.hora;
          this.minutosAperturaTmp = data.minuto;

          this.horaApertura = data.hora;
          this.minutosApertura = data.minuto;

          this.forma.controls.f_a_h.setValue(this.horaApertura);
          this.forma.controls.f_a_m.setValue(this.minutosApertura);

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

          this.horaPreCierreTmp = data.hora;
          this.minutosPreCierreTmp = data.minuto;

          this.horaPreCierre = data.hora;
          this.minutosPreCierre = data.minuto;

          this.forma.controls.f_pc_h.setValue(this.horaPreCierre);
          this.forma.controls.f_pc_m.setValue(this.minutosPreCierre);

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

          this.horaCierreTmp = data.hora;
          this.minutosCierreTmp = data.minuto;

          this.horaCierre = data.hora;
          this.minutosCierre = data.minuto;

          this.forma.controls.f_c_h.setValue(this.horaCierre);
          this.forma.controls.f_c_m.setValue(this.minutosCierre);

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
          this.diasLiqTmp = data;
          this.frecuenciaDiasLiq = data;
          this.loadDiasLiq(this.frecuenciaDiasLiq);

        },
        error => {
          this.errorHttp('getFrecuenciaDiasLiq', '', error.mesage);
        });
  }

  private loadDiasLiq(diasLiqSrt: string): void {
    this.diasLiq = diasLiqSrt;
    if (diasLiqSrt.search('MON') >= 0) {
      this.isLunesActivo = true;
    }
    else {
      this.isLunesActivo = false;
    }
    if (diasLiqSrt.search('TUE') >= 0) {
      this.isMartesActivo = true;
    }
    else {
      this.isMartesActivo = false;
    }
    if (diasLiqSrt.search('WED') >= 0) {
      this.isMiercolesActivo = true;
    }
    else {
      this.isMiercolesActivo = false;
    }
    if (diasLiqSrt.search('THU') >= 0) {
      this.isJuevesActivo = true;
    }
    else {
      this.isJuevesActivo = false;
    }
    if (diasLiqSrt.search('FRI') >= 0) {
      this.isViernesActivo = true;
    }
    else {
      this.isViernesActivo = false;
    }
    if (diasLiqSrt.search('SAT') >= 0) {
      this.isSabadoActivo = true;
    }
    else {
      this.isSabadoActivo = false;
    }
    if (diasLiqSrt.search('SUN') >= 0) {
      this.isDomingoActivo = true;
    }
    else {
      this.isDomingoActivo = false;
    }

    this.forma.controls.f_lu.setValue(this.isLunesActivo);
    this.forma.controls.f_ma.setValue(this.isMartesActivo);
    this.forma.controls.f_mi.setValue(this.isMiercolesActivo);
    this.forma.controls.f_ju.setValue(this.isJuevesActivo);
    this.forma.controls.f_vi.setValue(this.isViernesActivo);
    this.forma.controls.f_sa.setValue(this.isSabadoActivo);
    this.forma.controls.f_do.setValue(this.isDomingoActivo);

    console.log(this.frecuenciaDiasLiq);
    this.spinnerService.hide();
  }

  // SERVICIO - getTimeoutRespuesta
  private getTimeoutRespuesta(): void {
    this.spinnerService.show();
    this.compensadorService.getTimeoutRespuesta()
      .subscribe(
        data => {
          this.timeoutRespuestaCompensador = data / 1000;
          this.timeoutRespuestaCompensadorTmp = data / 1000;
          this.forma.controls.f_tc.setValue(data / 1000);
          console.log(this.timeoutRespuestaCompensador);
          this.spinnerService.hide();
        },
        error => {
          this.errorHttp('getTimeoutRespuesta', '', error.mesage);
        });
  }

  // SERVICIO - isCompensadorActivo
  private isCompensadorActivo(isNgOnInit: boolean): void {
    this.spinnerService.show();
    this.compensadorService.isCompensadorActivo()
      .subscribe(
        data => {
          this.compensadorActivo = data;
          if (!isNgOnInit) {
            this.configEnableOrDisableCompensadorButton(data);
          }
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
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: msgError
    });
  }






}
