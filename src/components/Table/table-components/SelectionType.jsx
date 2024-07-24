import React from "react";
import { isEqual } from "lodash";
import { Checkbox } from "../../Checkbox";

const SelectionType = React.memo(
  ({ selectedRows, handleRowSelection, index, item }) => (
    <Checkbox
      checked={selectedRows.some((row) => isEqual(row, item))}
      onChange={() => handleRowSelection(item)}
      key={index}
    />
  )
);

export default SelectionType;
