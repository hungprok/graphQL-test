import "./App.css";
import { setContext } from '@apollo/client/link/context';
import GetSensors from "./Components/GetSensors";
import GetDevices from "./Components/GetDevices";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
async function getToken() {
  const url = 'https://bms-api.viatick.com/main/api/oauth2/token'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'grant_type': 'client_credentials',
      'scope': '9913127ee418b7e4b0388bd4dae1db1cde71d9d79936b68bfe0864ee1b8418fd'
    },
  });
  const data = await response.json()
  return data.access_token;
}

getToken()
  .then(token => {
    localStorage.setItem('token', token);
  });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
      "X-Api-Key": "da2-zlk3xmy44fg4jpj73vlwlfi7sq"
    }
  }
});

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "https://aitjmbzhsbagnbysj2jrinbrsq.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    credentials: 'same-origin'
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

function App() {

  return (
    <div className="container pa-10">
      <ApolloProvider client={client}>
        <div className="row">
          <div className="col"> {<GetSensors />}</div>
          <div className="col">{<GetDevices />}</div>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
