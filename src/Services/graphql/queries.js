import { gql } from '@apollo/client';

export const DEVICE_DETAILS_FRAGMENT = gql`
  fragment DeviceDetails on Device {
    model
    owner
    os
    notes
    id
  }
`;

export const GET_DEVICES = gql`
  ${DEVICE_DETAILS_FRAGMENT}
  query {
    allDevices {
      ...DeviceDetails
    }
  }
`;

export const FIND_DEVICE = gql`
  ${DEVICE_DETAILS_FRAGMENT}
  query findDevice($id: ID!) {
    findDevice(id: $id) {
      ...DeviceDetails
    }
  }
`;

export const ADD_DEVICE = gql`
  ${DEVICE_DETAILS_FRAGMENT}
  mutation createDevice(
    $model: String
    $owner: String
    $os: String
    $notes: String
  ) {
    addDevice(owner: $owner, model: $model, os: $os, notes: $notes) {
      ...DeviceDetails
    }
  }
`;

export const EDIT_DEVICE = gql`
  ${DEVICE_DETAILS_FRAGMENT}
  mutation editDevice(
    $id: ID!
    $owner: String
    $model: String
    $os: String
    $notes: String
  ) {
    editDevice(id: $id, owner: $owner, model: $model, os: $os, notes: $notes) {
      ...DeviceDetails
    }
  }
`;

export const DELETE_DEVICE = gql`
  ${DEVICE_DETAILS_FRAGMENT}
  mutation deleteDevice($id: ID!) {
    deleteDevice(id: $id) {
      ...DeviceDetails
    }
  }
`;
