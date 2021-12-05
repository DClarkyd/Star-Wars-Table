import React from "react";
import { Table, Pagination } from "semantic-ui-react";

import  CharacterPageSizeSelect  from "./CharacterPageSizeSelect";
import  CharacterTableHeader  from "./CharacterTableHeader";
import  CharacterRow  from "./CharacterRow";

export const CharacterTable = ({
  characters,
  totalCount,
  totalPages,
  column,
  currentPage,
  onChangeLimit,
  addFavorite,
  direction,
  handleSort,
  limit,
  onChangePage,
}) => {
  const characterRows = characters.map((character, index) => (
    <CharacterRow key={index} character={character} addFavorite={addFavorite} />
  ));
  const handleChangePage = (
    event,
    { activePage }
  ) => {
    onChangePage(activePage);
  };

  return (
    <React.Fragment>
      <CharacterPageSizeSelect limit={limit} onChangeLimit={onChangeLimit} />
      Total count: {totalCount}.
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
              <Pagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={handleChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};
export default CharacterTable