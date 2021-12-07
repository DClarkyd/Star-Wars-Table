import React, { Fragment, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import CharacterTableHeader from "./CharacterTableHeader";
import CharacterRow from "./CharacterRow";
import leftArrow from "./../assets/glyphs/glyph_chevron_left_square";
import rightArrow from "./../assets/glyphs/glyph_chevron_right_16_square";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "styled-components";

export const CharacterTable = ({
  column,
  addFavorite,
  direction,
  handleSort,
}) => {
  const [newCharacters, setNewCharacters] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const CHARACTERS = gql`
    query GetAllPeople($after: String) {
      allPeople(first: 10, after: $after) {
        totalCount
        pageInfo {
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

  const { loading, error, data, fetchMore } = useQuery(CHARACTERS, {
    variables: { after: "" },
    notifyOnNetworkStatusChange: true,
  });

  const characters = newCharacters || data?.allPeople?.edges;
  const characterRows = characters?.map((character, index) => (
    <CharacterRow
      key={index}
      character={character.node}
      addFavorite={addFavorite}
    />
  ));

  const StyledButton = styled(Button)`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: 0;
    background: transparent !important;
  `;

  return (
    <Fragment>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
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
                onClick={async () => {
                  await fetchMore({
                    variables: {
                      after:
                        pageInfo?.startCursor ||
                        data?.allPeople?.pageInfo?.startCursor,
                    },
                  }).then((newResults) => {
                    setNewCharacters(newResults?.data?.allPeople?.edges);
                    setPageInfo(newResults?.data?.allPeople?.pageInfo);
                    currentPage > 1 && setCurrentPage(currentPage - 1);
                  });
                }}
                icon={leftArrow}
              />{" "}
              {currentPage} of {data?.allPeople?.totalCount}{" "}
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      after:
                        pageInfo?.startCursor ||
                        data?.allPeople?.pageInfo?.endCursor,
                    },
                  }).then((newResults) => {
                    setNewCharacters(newResults?.data?.allPeople?.edges);
                    setPageInfo(newResults?.data?.allPeople?.pageInfo);
                    setCurrentPage(currentPage + 1);
                  });
                }}
                icon={rightArrow}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Fragment>
  );
};
export default CharacterTable;
