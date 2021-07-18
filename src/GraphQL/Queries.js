import { gql } from "@apollo/client";

export const LOAD_SENSORS = gql`
  query {
    getSensorsWithIoT {
     name,
     deviceId,
serial,
mac,
region
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
