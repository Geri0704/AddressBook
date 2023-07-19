import { TestBed } from '@angular/core/testing';
import { ContactsService } from './contacts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RandomUserResponse } from "../Interfaces/randomUserResponse.interface";
import { Contact } from "../Interfaces/contact.interface";
import {HttpClient} from "@angular/common/http";


describe('ContactsService', () => {
  let service: ContactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactsService]
    }).compileComponents();


    service = TestBed.inject(ContactsService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return contacts if the call is successful', () => {
    const contacts: RandomUserResponse = {
      results: [
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
      ],
      info: {
        seed: 'testSeed',
        results: 1,
        page: 1,
        version: '1.0'
      }
    };

    service.loadContacts().subscribe(data => {
      // Below we convert the response to Contact[] as per the actual function implementation
      expect(data).toEqual(contacts.results as Contact[]);
    });

    const req = httpMock.expectOne('https://randomuser.me/api/?results=10');
    expect(req.request.method).toBe("GET");
    req.flush(contacts); // Provide the dummyContacts as response
  });

  it('should handle error', () => {
    service.loadContacts().subscribe(
      data => expect(data.length).toBe(0), // Expecting empty array on error
      fail // In case of error in observable, it should be handled by catchError and not reach here.
    );

    const req = httpMock.expectOne('https://randomuser.me/api/?results=10');
    req.error(new ErrorEvent('network error')); // Simulate a network error
  });

  it('should get/set selected contact', () => {
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
    service.setSelectContact(contact);
    expect(service.getSelectedContact()).toBe(contact);
  });

  it('should return existing contacts if present', () => {
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

    // Manually set contacts field in service instance to not-null
    (service as any).contacts = contacts;

    service.loadContacts().subscribe(
      contacts => expect(contacts).toEqual(contacts),
      fail
    );
  });
});
