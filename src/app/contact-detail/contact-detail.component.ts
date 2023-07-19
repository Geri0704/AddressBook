import {Component, OnInit} from '@angular/core';
import {Contact} from "../Interfaces/contact.interface";
import {ContactsService} from "../Services/contacts.service";
import {Router} from "@angular/router";
import {take, timer} from "rxjs";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
  contact?: Contact;
  redirectToContactsIn: number = 5;
  constructor(private contactsService: ContactsService, private router: Router) {}

  ngOnInit() {
    this.contact = this.contactsService.getSelectedContact();
    console.log(this.contact);


    if (!this.contact){
      const countdown$ = timer(0, 1000).pipe(take(5));

      countdown$.subscribe((count) => {
        this.redirectToContactsIn--;
        if (this.redirectToContactsIn === 0) {
          this.router.navigate(['/contacts']);
        }
      });
      //this.router.navigate(['/contacts']);
    }

  }
}
