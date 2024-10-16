import { Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { RiFilterLine } from "react-icons/ri";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column, //Passed as props
  title,
  options,
}: DataTableFacetedFilter<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button    className="h-8 text-sm border-dashed border-primary">
          <RiFilterLine className="w-4 h-4 mr-2" />
          {title}
        </Button>
      </PopoverTrigger>
      {selectedValues?.size > 0 && (
        <div className="space-x-1 lg:flex pt-2">
          {options
            .filter((option) => selectedValues.has(option.value))
            .map((option) => (
              <Badge
                variant="secondary"
                key={option.value}
                className="px-1 font-normal rounded-sm"
              >
                {option.label}
              </Badge>
            ))}
        </div>
      )}
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => {
                return (
                  <CommandItem key={option.value}>
                    <div className="mr-6 text-lg">
                      {option && option.isSelected ? (
                        <MdCheckBox />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </div>

                    <span
                      onClick={() => {
                        option.isSelected = !option.isSelected; 
                        
                      }}
                    >
                      {option.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
