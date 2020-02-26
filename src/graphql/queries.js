/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allContacts = /* GraphQL */ `
  query AllContacts($limit: Int, $nextToken: String) {
    allContacts(limit: $limit, nextToken: $nextToken) {
      ContactId
      email
      fname
      lname
      location
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($ContactId: ID!) {
    getContact(ContactId: $ContactId) {
      ContactId
      email
      fname
      lname
      location
    }
  }
`;
