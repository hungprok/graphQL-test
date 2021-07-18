import React, { useEffect, useState } from "react";
import { LOAD_DEVICES } from "../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_DEVICE_MUTATION, DELETE_DEVICE_MUTATION } from "../GraphQL/Mutations";

function GetDevices(props) {


  const { loading, error, data } = useQuery(LOAD_DEVICES);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [updateDevice] = useMutation(UPDATE_DEVICE_MUTATION);
  const [deleteDevices] = useMutation(DELETE_DEVICE_MUTATION);

  const UpdateDevice = (deviceId) => {
    updateDevice({
      variables: {
        name: name,
        deviceId: deviceId
      },
    }).then(response => {
    });

  };

  const DeleteDevice = (deviceId) => {
    deleteDevices({
      variables: {
        deviceIds: [deviceId]
      },
    }).then(response => {
    });
  };
  useEffect(() => {
    if (!loading) {
      console.log(data)
      setItems(data);
    } else if (error) {
      console.log(error)
    }
  }, [data]);


  if (loading) return <p>Loading ...</p>;
  return (<div>
    <h1>List of devices</h1>
    <ul>
      {items.getDevices?.map(item =>
        <li className="py-4" key={item.name}>{item.name} {item.deviceId}<div className="py-4">
          <input
            type="text"
            placeholder="Enter name to update"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="d-flex space-between">
            <button className="btn btn-primary" onClick={() => UpdateDevice(item.deviceId)}> Update</button>
            <button className="btn btn-danger" onClick={() => DeleteDevice(item.deviceId)}> Delete</button></div>
        </div>
        </li>)}
    </ul>
  </div>)
    ;
}

export default GetDevices;