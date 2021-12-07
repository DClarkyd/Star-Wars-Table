import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CharacterList from "./components/CharacterList";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const apolloClient = new ApolloClient({
  uri: "http://localhost:9011/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider>
          <CharacterList />
        </QueryParamProvider>
      </QueryClientProvider>
    </ApolloProvider>
    // </BrowserRouter>
  );
}
export default App;
