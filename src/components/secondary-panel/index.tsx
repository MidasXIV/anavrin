import { Drawer } from "vaul";
import { ComponentType, Dispatch, FC, SetStateAction } from "react";
import { PanelKeys } from "../../lib/user-settings-component-map";

interface SecondayPanelProps {
  PanelComponentMapping: Map<PanelKeys, ComponentType<unknown>>;
  panel: PanelKeys;
  showDrawer: boolean; // To set panel as showDrawer or not used in mobile UI
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
}

const SecondaryPanel: FC<SecondayPanelProps> = ({
  PanelComponentMapping,
  panel,
  showDrawer,
  setShowDrawer
}) => {
  if (!panel) {
    return null;
  }
  const PanelComponent = PanelComponentMapping.get(panel);
  return (
    <div className="dashboard-secondary-panel overflow-y-auto rounded-lg">
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
                <PanelComponent />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <PanelComponent />
      )}
    </div>
  );
};

export default SecondaryPanel;
