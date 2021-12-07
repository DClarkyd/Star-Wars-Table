import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import CharacterTable from "./CharacterTable";
import CharacterFilter from "./CharacterFilter";
import useCharacters from "../hooks/useCharacters";
import useAddFavorite from "../hooks/useAddFavorite";
import { Header, Card } from "semantic-ui-react";

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
      <CharacterFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
        loading={isLoading}
      />
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

export default CharacterList;
