import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppStorageService } from './components/app-storage-service';
import { LoginService } from './components/login/login.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'slv-control-angular-webapp';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  constructor(private idle: Idle, private keepalive: Keepalive, private loginService: LoginService,
    private router: Router, private appService: AppStorageService) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    //idle.setIdle(10);
    // sets a timeout period of 5 sconds. after 10 seconds of inactivity, the user will be considered timed out.
    //idle.setTimeout(15);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'no mas tiempo idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.logout();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'Inicia el cierre de sesion!';
      console.log(this.idleState);
      //this.childModal.show();
      $('#idle').modal({
        backdrop: 'static',
        keyboard: false
      })
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'tiempo de vida ' + countdown + ' segundos!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    //keepalive.interval(60);
    //keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
      this.idleState = 'El usuario inicio session';
      const aux: number = +this.appService.getTimerToken() * 60;
      console.log(this.idleState);
      if (userLoggedIn) {
        console.log('La session tiene una duracion de: ' + aux + 'segundos');
        idle.setIdle(aux);
        idle.setTimeout(60);
        idle.watch();
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })
  }

  reset(): void {
    this.idle.watch();
    this.timedOut = false;
  }

  stay(): void {
    this.loginService.actualizaToken().subscribe(
      resp => {
        console.log('Se actualizara el Token');
        $('#idle').modal('hide');
        this.reset();
        this.appService.setToken(resp.respuesta.token);
      }, error => {
        console.error('Ocurrio un error al renovar el ticket ' + error);
        this.logout();
      }

    )
  }

  logout(): void {
    $('#idle').modal('hide');
    this.loginService.cerrarSession().subscribe(data => {
      this.idleState = 'Desconctado!';
      this.timedOut = true;
      console.log(this.idleState);
      this.appService.setUserLoggedIn(false);
      this.appService.setToken('');
      this.appService.setTicket('');
      // this.router.navigate(['']);
      this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['']));
    }, error => {
      console.error('Ocurrio un error al cerrar la sesión' + error);
      this.appService.setToken('');
      this.appService.setTicket('');
      // this.router.navigate(['']);
      this.router.navigateByUrl('/DummyComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['']));
    });
  }

}
