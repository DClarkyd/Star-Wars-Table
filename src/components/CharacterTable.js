import React, { useState} from "react";
import { Table, Button } from "semantic-ui-react";
import  CharacterTableHeader  from "./CharacterTableHeader";
import  CharacterRow  from "./CharacterRow";
import leftArrow from './../assets/glyphs/glyph_chevron_left_square'
import rightArrow from './../assets/glyphs/glyph_chevron_right_16_square'
import {
    useQuery,
    gql
  } from "@apollo/client";
import styled from 'styled-components'

export const CharacterTable = ({
  column,
  addFavorite,
  direction,
  handleSort,
  onChangePage,
}) => {
  
  const [firstCursor, setFirstCursor] = useState("")
  const [endCursor, setEndCursor] = useState("")
  const [hasNextPage, setHasNextPage] = useState()
  const [hasPreviousPage, setHasPreviousPage] = useState()
  const [totalPages, setTotalPages] = useState(0)
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const CHARACTERS = gql`
  query GetAllPeople($endCursor: String!) {
    allPeople(first: 10, after: $endCursor) {
      totalCount
      pageInfo{
        hasNextPage
        startCursor
        hasPreviousPage
        endCursor
      }
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

const { loading, error, data, fetchMore } = useQuery(CHARACTERS,  {
  variables: {endCursor}
});

// setCharacters(data?.allPeople?.edges)
// setFirstCursor(data?.allPeople?.pageInfo?.startCursor)
// setEndCursor(data?.allPeople?.pageInfo?.endCursor)
// setHasNextPage(data?.allPeople?.pageInfo?.hasNextPage)
// setHasPreviousPage(data?.allPeople?.pageInfo?.hasPreviousPage)
// setTotalPages(data?.allPeople?.totalCount)

  const characterRows = data?.allPeople?.edges?.map((character, index) =>(
    <CharacterRow key={index} character={character.node} addFavorite={addFavorite} />
  ));

  const handleLeftArrow = (
    event,
    { activePage }
  ) => {
    onChangePage(activePage);
  };

  const handleRightArrow = (
    event,
    { activePage }
  ) => {
    onChangePage(activePage);
  };

  const StyledButton = styled(Button)`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: 0;
  background: transparent !important;
`;


  return (
    <React.Fragment>
      <Table celled selectable sortable>
        <CharacterTableHeader
          column={column}
          direction={direction}
          handleSort={handleSort}
        />

        <Table.Body>{characterRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              
        <StyledButton
          onClick={() => handleLeftArrow()}
          icon={ leftArrow}
        /> {currentPage} of {data?.allPeople?.totalCount}  <StyledButton
        onClick={() => handleRightArrow()}
        icon={ rightArrow}
      /> 
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};
export default CharacterTable