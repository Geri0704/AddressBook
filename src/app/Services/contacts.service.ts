import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RandomUserResponse} from "../Interfaces/randomUserResponse.interface";
import {Contact} from "../Interfaces/contact.interface";
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts: Contact[] | undefined;
  private selectedContact?: Contact;
  constructor(private http: HttpClient){}

  loadContacts(): Observable<Contact[]> {
    if (this.contacts) {
      return of(this.contacts);
    } else {
      return this.http.get<RandomUserResponse>('https://randomuser.me/api/?results=100').pipe(
        map((response: RandomUserResponse) => response.results as Contact[]),
        catchError(error => {
          console.log('Error loading contacts: ', error);
          return of([]);
        })
      );
    }
  }

  setSelectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  getSelectedContact(): Contact | undefined {
    return this.selectedContact;
  }
}
