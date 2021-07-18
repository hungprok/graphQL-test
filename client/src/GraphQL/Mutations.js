import { gql } from "@apollo/client";

export const UPDATE_DEVICE_MUTATION = gql`
  mutation updateDevice ($name: String!, $deviceId: Int!) {
    updateDevice(input: {name: $name, deviceId: $deviceId}){
      name
    }
  }
`;

export const DELETE_DEVICE_MUTATION = gql`
  mutation DeleteDevice ($deviceIds: [Int]) {
    deleteDevices(deviceIds: $deviceIds){
      rows_deleted
    }
  }
`;
