import React, { useState } from "react";
import { Divider, Segment } from "semantic-ui-react";
import CharacterTable from "./CharacterTable";
import useCharacters from "../hooks/useCharacters";
import useAddFavorite from "../hooks/useAddFavorite";
import { Header, Card, Dropdown, Button } from "semantic-ui-react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";

const Wrapper = styled.section`
  padding: 30px;
`;

const CharacterList = () => {
  const {
    pagination,
    sort,
    totalPages,
    totalCount,
    characters,
    onSubmitFilter,
    onChangeLimit,
    onChangePage,
    onSort,
  } = useCharacters();
  const addFavorite = useAddFavorite();
  const [selectedCharacter, setCharacter] = useState("");

  const ALL_PEOPLE = gql`
    query GetAllPeople {
      allPeople {
        people {
          name
          gender
          birthYear
          homeworld {
            name
          }
          species {
            name
          }
          id
        }
      }
    }
  `;

  const { loading, error, data, fetchMore } = useQuery(ALL_PEOPLE);
  const charNames = data?.allPeople?.people?.map((person) => {
    let rObj = { ...person };
    rObj["text"] = person.name;
    rObj["value"] = person.name;
    rObj["key"] = person.id;
    return rObj;
  });
  const selectChar = (e, { value }) => {
    setCharacter(charNames.filter((person) => person.name === value));
  };

  // TODO: add cabability to remove searched character name
  return (
    <Wrapper>
      <Segment>
        <Header as="h1">Fans</Header>
        {/* <Card.Group>
          <Card>
            <Card.Content header={"1000"} />
            <Card.Content>
              <Card.Description>Female Fans</Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content header={"1000"} />
            <Card.Content>
              <Card.Description>Male Fans</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group> */}
        <Divider />
        {selectedCharacter && (
          <Button onClick={() => setCharacter("")}>Reset</Button>
        )}
        <Dropdown
          placeholder="Search"
          fluid
          search
          selection
          onChange={selectChar}
          options={charNames}
        />
        <CharacterTable
          searchedCharacters={selectedCharacter || characters}
          totalCount={totalCount}
          totalPages={totalPages}
          currentPage={pagination.page}
          onChangePage={onChangePage}
          addFavorite={addFavorite.mutate}
          column={sort.sortColumn}
          direction={sort.sortOrder}
          handleSort={onSort}
          onChangeLimit={onChangeLimit}
          limit={pagination.limit}
        />
      </Segment>
    </Wrapper>
  );
};

export default CharacterList;
