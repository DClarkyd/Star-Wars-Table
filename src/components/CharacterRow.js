import React from "react";
import { Button, Table } from "semantic-ui-react";

const VehicleRow = ({
  character,
  addFavorite,
}) => (
  <Table.Row>
    <Table.Cell>{character.name}</Table.Cell>
    <Table.Cell>{character.birthYear}</Table.Cell>
    <Table.Cell>{character.gender}</Table.Cell>
    <Table.Cell>{character.homeworld?.name}</Table.Cell>
    <Table.Cell>{character.species?.name || 'N/A'}</Table.Cell>
    <Table.Cell textAlign="center">
      <Button
        onClick={() => addFavorite(character)}
        color={character.favorite ? "google plus" : "twitter"}
        icon={character.favorite ? "heart" : "heart outline"}
      />
    </Table.Cell>
  </Table.Row>
);

export default VehicleRow