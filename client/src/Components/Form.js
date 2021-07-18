import { UPDATE_DEVICE_MUTATION, DELETE_DEVICE_MUTATION } from "../GraphQL/Mutations";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

function Form(props) {
  const [name, setName] = useState("");

  const [updateDevice] = useMutation(UPDATE_DEVICE_MUTATION);
  const [deleteDevices] = useMutation(DELETE_DEVICE_MUTATION);

  const UpdateDevice = () => {
    updateDevice({
      variables: {
        name: name,
        deviceId: props.deviceId
      },
    });

    props.devicesUpdated()
  };

  const DeleteDevice = () => {
    deleteDevices({
      variables: {
        deviceIds: [props.deviceId]
      },
    });
    props.devicesUpdated()
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name to update"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="d-flex space-between">
        <button className="btn btn-primary" onClick={() => UpdateDevice()}> Update</button>
        <button className="btn btn-danger" onClick={() => DeleteDevice()}> Delete</button></div>
    </div>
  );
}

export default Form;
