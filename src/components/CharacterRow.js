import React from "react";
import { Button, Table } from "semantic-ui-react";
import filledHeart from './../assets/glyphs/glyph_heart_fill_16'
import unfilledHeart from './../assets/glyphs/glyph_heart_16'
import styled from 'styled-components'

const Wrapper = styled.section`
`;
const StyledButton = styled(Button)`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: 0;
  background: transparent;
  background
`;

const VehicleRow = ({
  character,
  addFavorite,
}) => (
  <Wrapper>
    <Table.Row>
      <Table.Cell textAlign="center">
        <StyledButton
          onClick={() => addFavorite(character)}
          icon={character.favorite ? filledHeart : unfilledHeart}
          color="red"
          favorite = {character.favorite}
        />
      </Table.Cell>
      <Table.Cell>{character.name}</Table.Cell>
      <Table.Cell>{character.birthYear}</Table.Cell>
      <Table.Cell>{character.gender}</Table.Cell>
      <Table.Cell>{character.homeworld?.name}</Table.Cell>
      <Table.Cell>{character.species?.name || 'N/A'}</Table.Cell>
    </Table.Row>
  </Wrapper>
);

export default VehicleRow