import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactsService } from '../Services/contacts.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Contact } from '../Interfaces/contact.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ContactDetailComponent', () => {
  let component: ContactDetailComponent;
  let fixture: ComponentFixture<ContactDetailComponent>;
  let mockContactsService: jasmine.SpyObj<ContactsService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockContactsService = jasmine.createSpyObj('ContactsService', ['getSelectedContact']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ContactDetailComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: ContactsService, useValue: mockContactsService},
        {provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockContactsService.getSelectedContact.calls.reset();
    mockRouter.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selected contact details on init', () => {
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
    mockContactsService.getSelectedContact.and.returnValue(contact);

    fixture.detectChanges();  // trigger ngOnInit

    expect(component.contact).toEqual(contact);
  });

  it('should redirect if contact does not exist', fakeAsync(() => {
    // Arrange
    mockContactsService.getSelectedContact.and.returnValue(undefined);

    // Act
    fixture.detectChanges();
    tick(5000); // Simulates a delay of 5 seconds

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/contacts']);
  }));
})
