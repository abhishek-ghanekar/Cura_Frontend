import React from "react";
import { useState } from "react";

import { CloseOutlined, SearchOutlined } from "@mui/icons-material";

const SearchBar = ({
  value,
  handleSearch,
  handleSearchvalue,
  removeSearchValue,
  ...searchProps
}) => {
  return (
    <div className="flex bg-[#EBEBEB] h-[36px] focus:!outline-none !focus:border-none">
      <input
        className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3 focus:!outline-none "
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleSearchvalue}
        {...searchProps}
      />
      <button>
        <CloseOutlined onClick={removeSearchValue} />
      </button>
      <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
        <button>
          <SearchOutlined
            className="m-2 fill-white text-white "
            onClick={handleSearch}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
