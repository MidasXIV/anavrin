import { valueFormatter } from "@/utils/timeAndDateHelpers";
import { ScrollArea } from "../ui/scroll-area";

const DividendDistributionBlock = ({ month, distribution }) => (
  <div className="space-y-2 rounded-md bg-gray-200 p-2 text-xs">
    <span>{month}</span>
    {/* <List>
      {distribution.map(item => (
        <ListItem className="text-xs" key={item.symbol}>
          <span>{item.symbol}</span>
          <span>{valueFormatter(item.dividendAmount)}</span>
        </ListItem>
      ))}
    </List> */}
    <div className="flex flex-col text-xs">
      <ScrollArea className="h-[75px]">
        {distribution.map((item, index) => (
          <div
            key={`distribution-data-item-${index + 1}`}
            className="border-1 flex w-full justify-between border-b border-gray-300 py-1"
          >
            <div className="inline-flex">
              <span className="font-medium text-gray-800">{item.symbol}</span>
            </div>

            <span className="text-gray-500">{valueFormatter(item.dividendAmount)}</span>
          </div>
        ))}
        {distribution.length < 1 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No dividends</p>
          </div>
        ) : null}
      </ScrollArea>
    </div>
  </div>
);

export default DividendDistributionBlock;
