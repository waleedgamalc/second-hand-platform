import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  public username: string = '';
  public userId: string = '';
  public wishlist: Array<string> = []; // Specify the type of items in the array
  constructor() { }
}