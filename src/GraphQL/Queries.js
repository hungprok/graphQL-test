import { gql } from "@apollo/client";

export const LOAD_SENSORS = gql`
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
