import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_SENSORS } from "../GraphQL/Queries";
import { UPDATE_DEVICE_MUTATION, DELETE_DEVICE_MUTATION } from "../GraphQL/Mutations";


function GetSensors() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const { loading, error, data } = useQuery(LOAD_SENSORS);
  const [updateDevice] = useMutation(UPDATE_DEVICE_MUTATION);
  const [deleteDevices] = useMutation(DELETE_DEVICE_MUTATION);

  useEffect(() => {
    if (!loading) {
      console.log(data)
      setItems(data);
    }
    if (error) {
      console.log(error)
    }
  }, [data]);

  const UpdateSensor = (deviceId) => {
    updateDevice({
      variables: {
        name: name,
        deviceId: deviceId
      },
    }).then(response => {
    });

  };

  const DeleteSensor = (deviceId) => {
    deleteDevices({
      variables: {
        deviceIds: [deviceId]
      },
    }).then(response => {
    });
  };

  if (loading) return <p>Loading ...</p>;
  return (
    <div>
      <h1>List of sensors</h1>
      <ul>{items.getSensorsWithIoT?.map((item, index) =>
        <li className="py-4" key={item.name + index}>{item.name} ({item.deviceId})
          <div className="py-4">
            <input
              type="text"
              placeholder="Enter name to update"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="d-flex space-between">
              <button className="btn btn-primary" onClick={() => UpdateSensor(item.deviceId)}> Update</button>
              <button className="btn btn-danger" onClick={() => DeleteSensor(item.deviceId)}> Delete</button></div>
          </div>
        </li>)}
      </ul>
    </div>);
}

export default GetSensors;

