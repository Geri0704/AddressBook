import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RandomUserResponse} from "./Interfaces/randomUserResponse.interface";

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient){}

  getContacts() {
    return this.http.get<RandomUserResponse>('https://randomuser.me/api/?results=20')
  }
}
