import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { ContactsService } from '../Services/contacts.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {Contact} from "../Interfaces/contact.interface";
import { MatTableModule } from '@angular/material/table';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let mockContactsService: jasmine.SpyObj<ContactsService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockContactsService = jasmine.createSpyObj('ContactsService', ['loadContacts', 'setSelectContact']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);


    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [
        MatTableModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ContactsService, useValue: mockContactsService},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

    mockContactsService.loadContacts.and.returnValue(of([]));
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    const contacts: Contact[] = [
      {
        name: {title: 'Mr', first: 'John', last: 'Doe'},
        location: {
          street: {number: '123', name: 'Main St'},
          city: 'Anytown',
          state: 'State',
          country: 'Country',
          postcode: '12345'
        },
        email: 'john.doe@example.com',
        login: {uuid: '7a0eed16-9430-4d68-901f-c0d4c1c3bf00'},
        dob: {date: '1990-01-01T00:00:00.000Z', age: '33'},
        phone: '1234567890',
        picture: {
          large: 'large-picture-url',
          medium: 'medium-picture-url',
          thumbnail: 'thumbnail-picture-url'
        }
      }
    ];
    mockContactsService.loadContacts.and.returnValue(of(contacts)); // Mock the service before initializing the component

    fixture = TestBed.createComponent(ContactListComponent); // Create a new instance
    component = fixture.componentInstance;

    fixture.detectChanges();  // trigger ngOnInit

    expect(component.dataSource.data).toEqual(contacts);
  });

  it('should navigate to detail page on openContact', () => {
    const contact: Contact = {
      name: {title: 'Mr', first: 'John', last: 'Doe'},
      location: {
        street: {number: '123', name: 'Main St'},
        city: 'Anytown',
        state: 'State',
        country: 'Country',
        postcode: '12345'
      },
      email: 'john.doe@example.com',
      login: {uuid: '7a0eed16-9430-4d68-901f-c0d4c1c3bf00'},
      dob: {date: '1990-01-01T00:00:00.000Z', age: '33'},
      phone: '1234567890',
      picture: {
        large: 'large-picture-url',
        medium: 'medium-picture-url',
        thumbnail: 'thumbnail-picture-url'
      }
    };
    component.openContact(contact);

    expect(mockContactsService.setSelectContact).toHaveBeenCalledWith(contact);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail', contact.login.uuid]);
  });

});
