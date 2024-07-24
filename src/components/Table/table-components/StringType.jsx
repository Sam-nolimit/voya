import React from "react";
import cs from "classnames";

const StringType = React.memo(
  ({ value, fontBold, withSubString, withColor }) => {
    if (!value) return <div />;

    return (
      <span className={cs("text-xs", { "font-bold": fontBold })}>
        <div>
          {withColor ? (
            <span style={{ color: `${value?.color || "#000"}` }}>
              {value.sign && value.sign} {value.sign}
            </span>
          ) : (
            value
          )}
        </div>
        {withSubString && <p className="text-xs">{withSubString}</p>}
      </span>
    );
  }
);

export default StringType;
