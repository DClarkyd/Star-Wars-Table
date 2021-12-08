import React, { useState } from "react";
import { Divider, Segment } from "semantic-ui-react";
import CharacterTable from "./CharacterTable";
import useCharacters from "../hooks/useCharacters";
import useAddFavorite from "../hooks/useAddFavorite";
import { Header, Card, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { useQuery, gql, useMutation } from "@apollo/client";

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
  const countryOptions = [
    { key: "af", value: "af", flag: "af", text: "Afghanistan" },
    { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
    { key: "al", value: "al", flag: "al", text: "Albania" },
    { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
    { key: "as", value: "as", flag: "as", text: "American Samoa" },
    { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
    { key: "ao", value: "ao", flag: "ao", text: "Angola" },
    { key: "ai", value: "ai", flag: "ai", text: "Anguilla" },
    { key: "ag", value: "ag", flag: "ag", text: "Antigua" },
    { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
    { key: "am", value: "am", flag: "am", text: "Armenia" },
    { key: "aw", value: "aw", flag: "aw", text: "Aruba" },
    { key: "au", value: "au", flag: "au", text: "Australia" },
    { key: "at", value: "at", flag: "at", text: "Austria" },
    { key: "az", value: "az", flag: "az", text: "Azerbaijan" },
    { key: "bs", value: "bs", flag: "bs", text: "Bahamas" },
    { key: "bh", value: "bh", flag: "bh", text: "Bahrain" },
    { key: "bd", value: "bd", flag: "bd", text: "Bangladesh" },
    { key: "bb", value: "bb", flag: "bb", text: "Barbados" },
    { key: "by", value: "by", flag: "by", text: "Belarus" },
    { key: "be", value: "be", flag: "be", text: "Belgium" },
    { key: "bz", value: "bz", flag: "bz", text: "Belize" },
    { key: "bj", value: "bj", flag: "bj", text: "Benin" },
  ];

  const ALL_PEOPLE = gql`
    query GetAllPeople {
      allPeople {
        people {
          name
          gender
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

  console.log(selectedCharacter);
  return (
    <Wrapper>
      <Segment>
        <Header as="h1">Fans</Header>
        <Card.Group>
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
        </Card.Group>
        <Divider />
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
