import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_ID = 'UserId';
const USER_NAME = 'UserName';
const PERFIL = 'Perfil';
const TICKET = 'Ticket';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {

  constructor() {
  }

  // QUITAR EL TOKEN SI EXISTE
  public logout() {
    console.log('Metodo logout()');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME);
  }

  // GUARDAR EL TOKEN
  public setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  // RECUPERAR EL TOKEN
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  // GUARDAR EL Ticket
  public setTicket(ticket: string): void {
    localStorage.setItem(TICKET, ticket);
  }

  // RECUPERAR EL Ticket
  public getTicket(): string {
    return localStorage.getItem(TICKET);
  }

  // GUARDAR EL USER ID
  public setUserId(userId: number): void {
    localStorage.setItem(USER_ID, String(userId));
  }

  // RECUPERAR EL USER ID
  public getUserId(): string {
    return localStorage.getItem(USER_ID);
  }

  // GUARDAR EL NOMBRE
  public setUserName(userName: string): void {
    localStorage.setItem(USER_NAME, userName);
  }

  // RECUPERAR EL NOMBRE
  public getUserName(): string {
    return localStorage.getItem(USER_NAME);
  }

  // GUARDAR EL PERFIL
  public setPerfil(userName: string): void {
    localStorage.setItem(PERFIL, userName);
  }

  // RECUPERAR EL PERFIL
  public getPerfil(): string {
    return localStorage.getItem(PERFIL);
  }

  public isLogged(): boolean {
    return localStorage.getItem(TOKEN_KEY) ? true : false;
  }

}
