import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import useStockSearch from "hooks/useStockSearch";
import yahooFinance from "yahoo-finance2";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/shadcn";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ICommandProps {
  commands: { value: string; label: string }[];
}

export default function CommandSearch({ commands }: ICommandProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { stockSuggestions, _isLoading, _isError } = useStockSearch(inputValue || null);

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const filteredCommands = Array.isArray(stockSuggestions)
    ? stockSuggestions.filter(command =>
        command?.symbol?.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];
  console.log("filteredCommands", filteredCommands);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {inputValue
            ? filteredCommands?.find(framework => framework.symbol === inputValue)?.symbol
            : "Select stock..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Type a command or search..."
            onValueChange={handleValueChange}
          />
          <CommandEmpty>No stocks found.</CommandEmpty>
          <CommandList>
            {open &&
              filteredCommands.length > 0 &&
              filteredCommands.map(command => (
                <CommandItem
                  key={command.symbol}
                  value={command.symbol}
                  onSelect={currentValue => {
                    setInputValue(currentValue === inputValue ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {`${command.shortname} [${command.symbol}] (${command.exchange})`}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      inputValue === command.symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
