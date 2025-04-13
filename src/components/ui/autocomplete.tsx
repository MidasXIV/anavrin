import { FC, useRef, useState, useMemo } from "react";
import { clsx } from "clsx";

export interface AutocompleteItem {
  id: string;
  symbol: string;
  name?: string;
  [key: string]: unknown;
}

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (item: AutocompleteItem) => void;
  items: AutocompleteItem[];
  placeholder?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  className?: string;
  inputClassName?: string;
  itemClassName?: string;
  renderItem?: (item: AutocompleteItem) => React.ReactNode;
  limit?: number;
  filter?: (value: string, item: AutocompleteItem) => boolean;
}

const ENTER_KEY_CODE = 13;
const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;

const SearchIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </span>
);

const SuccessIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>
);

const ErrorIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>
);

const LoadingIconComponent = () => (
  <span className="absolute right-0 inline-flex items-center justify-end px-4 py-2 text-gray-500">
    <svg
      className="h-5 w-5 animate-spin text-gray-700"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </span>
);

/**
 * Props for the Autocomplete component
 * @interface AutocompleteProps
 * @property {string} value - Current input value
 * @property {(value: string) => void} onChange - Callback when input value changes
 * @property {(item: AutocompleteItem) => void} onSelect - Callback when an item is selected
 * @property {AutocompleteItem[]} items - Array of items to display in the dropdown
 * @property {string} [placeholder] - Placeholder text for the input
 * @property {boolean} [isLoading] - Whether to show loading state
 * @property {boolean} [isError] - Whether to show error state
 * @property {boolean} [isSuccess] - Whether to show success state
 * @property {string} [className] - Additional CSS classes for the container
 * @property {string} [inputClassName] - Additional CSS classes for the input
 * @property {string} [itemClassName] - Additional CSS classes for list items
 * @property {(item: AutocompleteItem) => React.ReactNode} [renderItem] - Custom render function for items
 * @property {number} [limit] - Maximum number of items to display
 * @property {(value: string, item: AutocompleteItem) => boolean} [filter] - Custom filter function
 */
const Autocomplete: FC<AutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  items,
  placeholder = "Search...",
  isLoading = false,
  isError = false,
  isSuccess = false,
  className,
  inputClassName,
  itemClassName,
  renderItem,
  limit,
  filter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter and limit items based on props
  const filteredItems = useMemo(() => {
    let result = items;

    if (filter && value.trim()) {
      result = items.filter(item => filter(value, item));
    }

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }, [items, value, filter, limit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case ENTER_KEY_CODE:
        if (filteredItems.length > 0 && selectedIndex >= 0) {
          onSelect(filteredItems[selectedIndex]);
        }
        setIsOpen(false);
        setSelectedIndex(-1);
        break;

      case DOWN_ARROW_KEY_CODE:
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        break;

      case UP_ARROW_KEY_CODE:
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        break;

      case ESCAPE_KEY_CODE:
        setIsOpen(false);
        setSelectedIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleBlur = (ev: React.FocusEvent) => {
    setTimeout(() => {
      const target = ev.relatedTarget as HTMLElement;
      if (target?.tagName !== "LI") {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }, 1);
  };

  const defaultRenderItem = (item: AutocompleteItem) => (
    <>
      <span className="font-semibold">{item.symbol}</span>
      {item.name && <p className="text-gray-600">{item.name}</p>}
    </>
  );

  const renderItemContent = renderItem || defaultRenderItem;

  return (
    <div className={clsx("relative z-50 w-full", className)}>
      <input
        type="text"
        className={clsx(
          "inline-flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          inputClassName
        )}
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {!isLoading && !isError && !isSuccess && <SearchIconComponent />}
      {isLoading && <LoadingIconComponent />}
      {isSuccess && <SuccessIconComponent />}
      {isError && <ErrorIconComponent />}
      <ul
        ref={listRef}
        className={clsx(
          "absolute mt-1 w-full max-w-md rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          {
            hidden: !isOpen || filteredItems.length === 0
          },
          itemClassName
        )}
      >
        {filteredItems.map((item, index) => (
          <li
            key={item.id}
            className={clsx(
              "text group flex cursor-pointer flex-row justify-between rounded-lg px-4 py-2 text-xs text-gray-800 hover:bg-gray-300 focus:flex-col focus:bg-gray-300 focus:outline-none",
              {
                "flex-col bg-accent text-accent-foreground": index === selectedIndex
              }
            )}
            role="option"
            aria-selected={index === selectedIndex}
            tabIndex={0}
            onClick={() => {
              onSelect(item);
              setIsOpen(false);
              setSelectedIndex(-1);
            }}
            onMouseEnter={() => setSelectedIndex(index)}
            onKeyDown={e => {
              switch (e.keyCode) {
                case ENTER_KEY_CODE:
                  onSelect(item);
                  setIsOpen(false);
                  setSelectedIndex(-1);
                  break;

                case DOWN_ARROW_KEY_CODE: {
                  e.preventDefault();
                  setSelectedIndex(prev => (prev + 1) % filteredItems.length);
                  break;
                }

                case UP_ARROW_KEY_CODE: {
                  e.preventDefault();
                  setSelectedIndex(
                    prev => (prev - 1 + filteredItems.length) % filteredItems.length
                  );
                  break;
                }

                case ESCAPE_KEY_CODE:
                  setIsOpen(false);
                  setSelectedIndex(-1);
                  break;

                default:
                  break;
              }
            }}
          >
            {renderItemContent(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
