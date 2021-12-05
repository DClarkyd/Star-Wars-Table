import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import  CharacterTable  from "./CharacterTable";
import  CharacterFilter  from "./CharacterFilter";
import  useCharacters  from "../hooks/useCharacters";
import  useAddFavorite  from "../hooks/useAddFavorite";

const CharacterList = () => {
  const {
    isLoading,
    filter,
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

  return (
    <Segment>
      <CharacterFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
        loading={isLoading}
      />
      <Divider />
      <CharacterTable
        vehicles={characters}
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
  );
};


export default CharacterList