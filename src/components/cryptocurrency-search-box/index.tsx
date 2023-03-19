import { useState, FC, useEffect } from "react";
import { Group, Avatar, Text, Autocomplete } from "@mantine/core";
import { fetchCoinList } from "../../util/cryptocurrencyService";

type CryptocurrencySearchBoxProps = {
  // eslint-disable-next-line react/require-default-props
  hideHeader?: boolean;
  setCyptocurrency: (token) => void;
};

const CryptocurrencySearchBox: FC<CryptocurrencySearchBoxProps> = ({
  hideHeader = false,
  setCyptocurrency
}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [disabled, setDisabled] = useState(true);

  function AutoCompleteItem({ id, symbol, name, ...others }) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div {...others} key={id}>
        <Group>
          <Avatar color="blue">
            {name
              .split(" ")
              .map(part => part.charAt(0).toUpperCase())
              .join("")}
          </Avatar>

          <div>
            <Text>{name}</Text>
            <Text size="xs" color="blue">
              {symbol}
            </Text>
          </div>
        </Group>
      </div>
    );
  }

  useEffect(() => {
    setDisabled(true);

    fetchCoinList().then(list => {
      setDisabled(false);
      console.log(list);
      setData(
        list.map(item => ({
          value: item.id,
          ...item
        }))
      );

      // TODO: handle case for error
    });
  }, []);

  return (
    <Autocomplete
      label={`${hideHeader ? "" : "Choose cryptocurrency"}`}
      placeholder="Pick one"
      disabled={disabled}
      value={searchTerm}
      onChange={setSearchTerm}
      onItemSubmit={token => {
        setCyptocurrency(token.id);
      }}
      className="w-full"
      itemComponent={AutoCompleteItem}
      nothingFound="CoinGecko cannot find this token."
      limit={6}
      data={data}
      filter={(_value, item) =>
        item.name.toLowerCase().startsWith(_value.toLowerCase().trim()) ||
        item.symbol.toLowerCase().startsWith(_value.toLowerCase().trim())
      }
    />
  );
};

export default CryptocurrencySearchBox;
