import React from 'react';

import {
    useQuery,
    gql
  } from "@apollo/client";

function ExchangeRates() {
    const STAR_SHIPS = gql`
        query GetAllStarships {
                person(personID: 4) {
                  name
                  gender
                  homeworld {
                    name
                  }
                  starshipConnection {
                    edges {
                      node {
                        id
                        manufacturers
                      }
                    }
                  }
                }
              }
    `;
    const { loading, error, data } = useQuery(STAR_SHIPS);
    console.log(data)
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data?.rates?.map(({ currency, rate }) => (
      <div key={currency}>
        <p>
          {currency}: {rate}
        </p>
      </div>
    ));
  }

export default ExchangeRates