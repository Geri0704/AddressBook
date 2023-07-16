import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../contacts.service";
import {Contact} from "../Interfaces/contact.interface";
import {RandomUserResponse} from "../Interfaces/randomUserResponse.interface";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email'];

  constructor(private contactsService: ContactsService) {}
  ngOnInit() {
    this.contactsService.getContacts().subscribe((data: RandomUserResponse) => {
      console.log(data)
      this.contacts = data.results;
    });
  }

  openContact(contact: any): void {
    // Logic to open the Contact Information Card goes here
    console.log(contact);
  }
}
