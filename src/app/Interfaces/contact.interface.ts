export interface Contact {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: string;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string ;
  };
  email: string;
  dob: {
    date: string;
    age: string;
  },
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
