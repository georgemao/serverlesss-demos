/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const stream = /* GraphQL */ `
  mutation Stream($sensorId: String!, $temp: String!) {
    stream(sensorId: $sensorId, temp: $temp) {
      sensorId
      temp
    }
  }
`;
export const saveContact = /* GraphQL */ `
  mutation SaveContact($email: String!, $fname: String!, $lname: String!) {
    saveContact(email: $email, fname: $fname, lname: $lname) {
      ContactId
      email
      fname
      lname
      location
    }
  }
`;
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact($ContactId: ID!) {
    deleteContact(ContactId: $ContactId) {
      ContactId
      email
      fname
      lname
      location
    }
  }
`;
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $ContactId: String!
    $email: String
    $fname: String
    $lname: String
  ) {
    updateContact(
      ContactId: $ContactId
      email: $email
      fname: $fname
      lname: $lname
    ) {
      ContactId
      email
      fname
      lname
      location
    }
  }
`;
