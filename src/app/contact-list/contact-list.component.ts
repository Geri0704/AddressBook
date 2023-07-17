import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../contacts.service";
import {Contact} from "../Interfaces/contact.interface";
import {RandomUserResponse} from "../Interfaces/randomUserResponse.interface";
import {Router} from "@angular/router";
import {BehaviorSubject, EMPTY, map, Observable, startWith} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email'];

  constructor(private contactsService: ContactsService, private router: Router) {}
  ngOnInit() {
    this.contactsService.loadContacts().subscribe(contacts => {
      this.dataSource.data = contacts;
    });
  }

  openContact(contact: any): void {
    this.contactsService.setSelectContact(contact);
    this.router.navigate(['/detail', contact.login.uuid]);
  }
}
