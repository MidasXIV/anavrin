import { Drawer } from "vaul";
import { Dispatch, FC, SetStateAction } from "react";
import { cn } from "@/utils/shadcn";

interface SecondayPanelProps {
  showDrawer: boolean; // To set panel as showDrawer or not used in mobile UI
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  className: string;
}

const SecondaryPanel: FC<SecondayPanelProps> = ({
  showDrawer,
  setShowDrawer,
  children,
  className = null
}) => {
  return (
    <div className={cn("dashboard-secondary-panel overflow-y-auto rounded-lg", className)}>
      {showDrawer ? (
        <Drawer.Root
          open={showDrawer}
          onOpenChange={isOpened => {
            setShowDrawer(isOpened);
          }}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 flex max-h-[70%] flex-col rounded-t-[10px] bg-[#eaeaea]">
              <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4">
                {children}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default SecondaryPanel;
