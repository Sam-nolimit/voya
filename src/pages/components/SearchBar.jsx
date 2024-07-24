import React from "react";
import { debounce } from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ setTerm, placeholder }) => {
  const debouncedResults = React.useMemo(() => {
    const handleSearch = (e) => setTerm(e.target.value);

    return debounce(handleSearch, 500);
  }, [setTerm]);

  React.useEffect(() => () => {
    debouncedResults.cancel();
  });

  return (
    <>
      <div className="relative hidden justify-between items-center w-[250px] bg-inherit border px-[1em] py-[2px] rounded-[20px] border-solid border-gray-500 lg:flex">
        <span className="absolute left-2">
          <MagnifyingGlassIcon className="m-auto h-5 w-5 text-[#667185]" />
        </span>
        <input
          className="flex text-xs text-[#667185] pl-4 py-[0.5em] border-[none] outline-none w-[2700px] bg-inherit"
          type="search"
          onChange={debouncedResults}
          placeholder="Search here..."
        />
      </div>
    </>
  );
};

export default SearchBar;
