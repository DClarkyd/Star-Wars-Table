import { Table, Button } from "semantic-ui-react";
import React from "react";
import filledHeart from './../assets/glyphs/glyph_heart_fill_16'
import styled from 'styled-components'

const StyledHeart = styled(Button)`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: 0;
  background: transparent !important;
`;

export const CharacterTableHeader = ({
  column,
  direction,
  handleSort
}) => (
  <Table.Header>
    <Table.Row>
    <Table.HeaderCell
        width={1}
        sorted={column === "favorite" ? direction : undefined}
        onClick={() => handleSort("favorite")}
      >
          <StyledHeart
          icon={filledHeart}
        />
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "name" ? direction : undefined}
        onClick={() => handleSort("name")}
      >
        Name
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        sorted={column === "birthYear" ? direction : undefined}
        onClick={() => handleSort("birthYear")}
      >
        Birth Year
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        sorted={column === "gender" ? direction : undefined}
        onClick={() => handleSort("gender")}
      >
        Gender
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "homeWorld" ? direction : undefined}
        onClick={() => handleSort("homeWorld")}
      >
        Home World
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "homeWorld" ? direction : undefined}
        onClick={() => handleSort("homeWorld")}
      >
        Species
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

export default CharacterTableHeader