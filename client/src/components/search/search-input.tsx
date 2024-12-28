import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";

type Props = {};

const SearchInput = (props: Props) => {
  // is mobile display search button to open search modal

  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
  };
  return (
    <div className="flex items-center w-full gap-3">
      <div className="relative w-full">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-11"
          placeholder="Search..."
        />
        {value.length ? (
          <Button
            onClick={handleClear}
            className="absolute top-0 right-0"
            variant={"ghost"}
            size={"icon"}
          >
            <X />
          </Button>
        ) : null}
      </div>

      <Button variant={"outline"} size={"icon"}>
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
