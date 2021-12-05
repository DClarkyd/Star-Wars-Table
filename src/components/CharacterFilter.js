import React, { useState } from "react";
import { Form, Popup } from "semantic-ui-react";
import debounce from "lodash.debounce";

const regex = new RegExp("^[a-zA-Z0-9 ]+$");

const CharacterFilter = ({
  totalCount,
  loading,
  onSubmitFilter,
  filter,
}) => {
  const [state, setState] = useState({
    filter: filter,
    filterValid: true,
  });

  const f = debounce((value) => {
    if (value !== "" && !regex.test(value)) {
      setState({ filter: value, filterValid: false });
    } else {
      setState({ filter: value, filterValid: true });
      onSubmitFilter(value);
    }
  }, 500);

  const handleOnChange = (
    event,
    { value }
  ) => {
    f(value);
  };

  let popupMessage = "";
  if (!state.filterValid) {
    popupMessage = "Invalid character.";
  } else if (totalCount === 0) {
    popupMessage = "No results found.";
  }

  return (
    <Form>
      <Form.Group>
        <Form.Field>
          <Popup
            trigger={
              <Form.Input
                placeholder={"Enter a filter."}
                name={"filter"}
                error={!state.filterValid}
                label={"Filter"}
                onChange={handleOnChange}
                icon={"search"}
                loading={loading}
              />
            }
            content={popupMessage}
            on={"click"}
            open={!state.filterValid || totalCount === 0}
            position={"right center"}
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
};
export default CharacterFilter