# AddressBook - Nuvalence Take Home

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Project Setup

Follow these steps to set up and run this project.

### Prerequisites

Make sure you have Node.js and Angular CLI installed on your machine:

1. Node.js - You can check if you have Node.js installed by running `node -v` in a terminal. If it's not installed, you can download it from [here](https://nodejs.org/en/download/).
2. Angular CLI - Install Angular CLI by running `npm install -g @angular/cli` in a terminal.

### Cloning the Repository

1. Open a terminal.
2. Change the current working directory to the location where you want the cloned directory.
3. Run the following git command: `git clone git@github.com:Geri0704/AddressBook.git`
4. Navigate into the cloned repository: `cd AddressBook`
5. Install all the required dependencies using npm (Node Package Manager): `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Summary

### Overall Approach

My overall approach for this assignment was creating a ContactService which was responsible for calling the randomuser API.
I stored the results returned into a Contacts array. The service is responsible for sending this information out
to my two components: ContactListComponent and ContactDetailComponent. The service is also used in when
an entry from the contact list is clicked it send the information from the ContactListComponent to the ContactDetailComponent. 
I make use of angular routing to navigate between the contacts and contact detail pages.

I could have stored the data in local storage to have persistent data but decided against this as this isn't the proper use 
browser storage. It is more so used for user settings and cache and has a relatively small storage limit which wouldn't
be suitable for an AddressBook that could potentially be storing thousands of contacts.

### Features Implements:

- Table of Contacts
- Contact details card
- Pagination for the table of contacts
- Page redirection if selected contact does not exist
- Responsive UI

### Features To Implement Given More Time:

- Set up a backend and database to allow for persistent data
- Make UI look better
- Add sorting and filtering to table of contacts

