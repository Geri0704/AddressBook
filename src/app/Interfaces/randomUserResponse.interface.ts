import {Contact} from "./contact.interface";

export interface RandomUserResponse {
  results: Contact[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
