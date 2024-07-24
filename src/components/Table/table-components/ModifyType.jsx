import React, { useCallback } from "react";
import classNames from "classnames";
import Button from "../../UI/Button";

const ModifyType = React.memo(
  ({ handleEditAction, handleDeleteAction, item, column, isLoading }) => {
    // const memoizedHandleActionClick = useCallback(
    //   (action, items) => handleActionClick && handleActionClick(action, items),
    //   [handleActionClick]
    // );
    const show = column?.show || [
      "edit",
      "delete",
      "view",
      "reset-btn",
      "delete-btn",
    ];
    const status = item?.status === "active";

    return (
      <div className="flex w-fit items-center justify-end gap-4">
        {show.includes("edit") && (
          <button
            type="button"
            className="flex text-[#0D6EFD] text-[14px] font-semibold"
            onClick={() => handleEditAction(item)}
          >
            Edit
          </button>
        )}
        {show.includes("view") && (
          <ViewIcon
            className={classNames("cursor-pointer", {
              "pointer-events-none": isLoading,
            })}
            // onClick={() => memoizedHandleActionClick("view", item)}
          />
        )}
        {show.includes("delete") && (
          <button
            type="button"
            className="flex text-[#98A2B3] text-[14px] font-semibold"
            onClick={() => handleDeleteAction(item)}
          >
            Remove
          </button>
        )}
        {show.includes("reset-btn") && (
          <Button
            className="flex h-9 items-center justify-center gap-2 text-xs md:text-xs text-[#453DA7]"
            btnType={status ? "outline-red" : "outline"}
            animate={false}
            onClick={() => memoizedHandleActionClick("reset-btn", item)}
            style={{ color: "#453DA7" }}
          >
            <Backward5Seconds size="16" className="text-[#453DA7]" />
            Reset Password
          </Button>
        )}
        {show.includes("delete-btn") && (
          <Button
            className="flex h-9 items-center justify-center gap-2 text-xs md:text-xs text-[#B90F17]"
            btnType={status ? "outline-red" : "outline"}
            animate={false}
            onClick={() => memoizedHandleActionClick("reset-btn", item)}
            style={{ color: "#B90F17" }}
          >
            <Trash size="14" className="text-[#B90F17]" />
            Delete
          </Button>
        )}
      </div>
    );
  }
);
export default ModifyType;
