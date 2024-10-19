import { COLLECTIONS } from "../constants/constant_collections";

let server_response = COLLECTIONS;

export function getCollections() {
  return server_response;
}
