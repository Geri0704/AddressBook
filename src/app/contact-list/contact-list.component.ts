import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ContactsService} from "../Services/contacts.service";
import {Contact} from "../Interfaces/contact.interface";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'email'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  constructor(private contactsService: ContactsService, private router: Router) {}
  ngOnInit() {
    this.contactsService.loadContacts().subscribe(contacts => {
      this.dataSource.data = contacts;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openContact(contact: Contact): void {
    this.contactsService.setSelectContact(contact);
    this.router.navigate(['/detail', contact.login.uuid]);
  }
}
