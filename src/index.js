import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import ExchangeRates from './components/graphqlexample';
import CharacterList from './components/CharacterList';


const client = new ApolloClient({
  uri: 'http://localhost:9011/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <CharacterList/>
    <ExchangeRates/>
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
