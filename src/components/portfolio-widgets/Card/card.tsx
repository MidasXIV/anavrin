import InfoIcon from "@/components/icons/InfoIcon";
import TooltipWrapper from "@/components/tooltip-wrapper";

const Card = ({
  showHeader = false,
  header = null,
  headerTitle = "Header",
  customHeader = false,
  showFooter = false,
  children,
  customFooter = false,
  footer = null,
  className = null
}) => (
  <div className={`flex h-full w-full flex-col rounded-lg bg-gray-100 shadow-lg ${className}`}>
    {showHeader ? (
      <div className="border-success dark:border-success-300 inline-flex items-center justify-between border-b-2 px-3 pb-1 pt-2 text-xs text-neutral-600 dark:text-neutral-50">
        {customHeader ? (
          header
        ) : (
          <>
            <span>{headerTitle}</span>
            <TooltipWrapper label="info" color="orange">
              <button type="button" className="rounded-lg px-2 py-1 hover:bg-gray-200">
                <InfoIcon />
              </button>
            </TooltipWrapper>
          </>
        )}
      </div>
    ) : null}
    <div className="flex-1 overflow-hidden">{children}</div>
    {showFooter ? (
      <div className="border-success dark:border-success-300 border-t-2 text-neutral-600 dark:text-neutral-50">
        {customFooter ? footer : <span className="px-3 py-2 text-xs">Footer</span>}
      </div>
    ) : null}
  </div>
);

export default Card;
