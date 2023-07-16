import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email'];

  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.loadContacts()
  }

  loadContacts(): void {
    this.http.get('https://randomuser.me/api/?results=10')
      .subscribe((data: any) => {
        this.contacts = data.results;
        console.log(this.contacts)
      });
  }
  openContact(contact: any): void {
    // Logic to open the Contact Information Card goes here
    console.log(contact);
  }
}
