import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import Form from "./Form";


function GetUsers() {
  const { loading, error, data } = useQuery(LOAD_USERS);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!loading) {
      console.log(data)
      setItems(data);
    }
    if (error) {
      console.log(error)
    }
  }, [data]);

  
  if (loading) return <p>Loading ...</p>;
  return (
    <div>
      <h1>List of sensors</h1>
      <ul>{items.getSensorsWithIoT?.map(item => <li className="py-4" key={item.name}>{item.name} {item.deviceId}
        <div className="py-4">{<Form deviceId={item.deviceId} />}</div>
      </li>)}
      </ul>
    </div>);
}

export default GetUsers;

