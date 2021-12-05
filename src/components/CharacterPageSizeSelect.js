import React from "react";
import { Dropdown } from "semantic-ui-react";

const limitOptions = [
  { key: "0", value: "10", text: "10" },
  { key: "1", value: "25", text: "25" },
  { key: "2", value: "50", text: "50" },
  { key: "3", value: "100", text: "100" },
];

export const CharacterPageSizeSelect = ({
  limit,
  onChangeLimit,
}) => {
  const handleChangeLimit = (
    event,
    { value }
  ) => {
    onChangeLimit(value );
  };
  return (
    <React.Fragment>
      Records per page:{" "}
      <Dropdown
        inline={true}
        options={limitOptions}
        defaultValue={String(limit)}
        onChange={handleChangeLimit}
      />
    </React.Fragment>
  );
};

export default CharacterPageSizeSelect