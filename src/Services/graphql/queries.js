import { gql } from '@apollo/client';

export const GET_DEVICES = gql`
  query {
    allDevices {
      model
      owner
      os
      notes
      id
    }
  }
`;

export const FIND_DEVICE = gql`
  query findDevice($id: ID!) {
    findDevice(id: $id) {
      model
      owner
      os
      notes
      id
    }
  }
`;

export const ADD_DEVICE = gql`
  mutation createDevice(
    $model: String
    $owner: String
    $os: String
    $notes: String
  ) {
    addDevice(owner: $owner, model: $model, os: $os, notes: $notes) {
      model
      owner
      os
      notes
      id
    }
  }
`;

export const EDIT_DEVICE = gql`
  mutation editDevice(
    $id: ID!
    $owner: String
    $model: String
    $os: String
    $notes: String
  ) {
    editDevice(id: $id, owner: $owner, model: $model, os: $os, notes: $notes) {
      model
      owner
      os
      notes
      id
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation deleteDevice($id: ID!) {
    deleteDevice(id: $id) {
      model
      owner
      os
      notes
      id
    }
  }
`;
