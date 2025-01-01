import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/use-debounce";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const setSearchParams = useSearchParams()[1];
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ q: debouncedValue });
    } else {
      setSearchParams({});
    }
  }, [debouncedValue]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={handleSearch}
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
  );
};

export default SearchInput;
