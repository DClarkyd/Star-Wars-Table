import React from 'react';

import {
    useQuery,
    gql
  } from "@apollo/client";

function GetCharacters() {
    const CHARACTERS = gql`
        query GetAllPeople {
          allPeople(first: 10) {
            edges {
              node {
                name
                gender
                birthYear
                homeworld {
                  name
                }
                species {
                  name
                }
              }
            }
          }
        }
    `;
    const { loading, error, data } = useQuery(CHARACTERS);
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

export default GetCharacters