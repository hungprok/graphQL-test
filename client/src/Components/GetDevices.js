import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_DEVICES } from "../GraphQL/Queries";
import Form from "./Form";

function GetDevices(props) {
  const { loading, error, data } = useQuery(LOAD_DEVICES);
  const [items, setItems] = useState([]);
  let isDataUpdated = false;

  const devicesUpdated = () => {
    console.log("updated data")
    isDataUpdated = true
  };


  useEffect(() => {
    if (!loading) {
      console.log(data)
      setItems(data);
    } else if (error) {
      console.log(error)
    }
  }, [data, isDataUpdated]);


  if (loading) return <p>Loading ...</p>;
  return (<div>
    <h1>List of devices</h1>
    <ul>
      {items.getDevices?.map(item => <li className="py-4" key={item.name}>{item.name} {item.deviceId}  <div className="py-4">{<Form deviceId={item.deviceId} devicesUpdated={devicesUpdated} />}</div></li>)}
    </ul>
  </div>)
    ;
}

export default GetDevices;