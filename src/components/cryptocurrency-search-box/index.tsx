import { useState, FC, useEffect } from "react";
import { fetchCoinList } from "../../utils/cryptocurrencyService";
import Autocomplete, { AutocompleteItem } from "../ui/autocomplete";

interface CryptocurrencySearchBoxProps {
  hideHeader?: boolean;
  setCyptocurrency: (token: string) => void;
  cyptocurrency: string;
}

const CryptocurrencySearchBox: FC<CryptocurrencySearchBoxProps> = ({
  hideHeader = false,
  setCyptocurrency,
  cyptocurrency
}) => {
  const [value, setValue] = useState(cyptocurrency);
  const [items, setItems] = useState<AutocompleteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCoinList()
      .then(list => {
        const formattedItems = list.map(item => ({
          id: item.id,
          label: item.symbol.toUpperCase(),
          description: item.name,
          ...item // Include all other coin properties
        }));
        setItems(formattedItems);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching coin list:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSelect = (item: AutocompleteItem) => {
    setCyptocurrency(item.id);
    setValue(item.symbol);
  };

  return (
    <div className="w-full">
      {!hideHeader && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Choose cryptocurrency
        </label>
      )}
      <Autocomplete
        value={value}
        onChange={setValue}
        onSelect={handleSelect}
        items={items}
        placeholder="Search cryptocurrencies..."
        isLoading={isLoading}
        limit={6}
        filter={(_value, item) =>
          item.name.toLowerCase().startsWith(_value.toLowerCase().trim()) ||
          item.symbol.toLowerCase().startsWith(_value.toLowerCase().trim())
        }
        renderItem={item => (
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              {item.name
                ?.split(" ")
                .map(part => part.charAt(0).toUpperCase())
                .join("")}
            </div>
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-blue-600">{item.symbol}</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CryptocurrencySearchBox;
