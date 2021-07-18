import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getSensorsWithIoT {
     name,
     deviceId
    }
  }
`;

export const LOAD_DEVICES = gql`
  query {
    getDevices {
      name,
      deviceId
    }
  }
`;
