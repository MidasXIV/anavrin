import { Drawer } from "@mantine/core";
import { ComponentType, Dispatch, FC, SetStateAction } from "react";
import { PanelKeys } from "../../lib/user-settings-component-map";

interface SecondayPanelProps {
  PanelComponentMapping: Map<PanelKeys, ComponentType<unknown>>;
  panel: PanelKeys;
  opened: boolean; // To set panel as opened or not used in mobile UI
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const SecondaryPanel: FC<SecondayPanelProps> = ({
  PanelComponentMapping,
  panel,
  opened,
  setOpened
}) => {
  if (!panel) {
    return null;
  }
  const PanelComponent = PanelComponentMapping.get(panel);
  // return <ExchangeForm />;
  return (
    <div className="dashboard-secondary-panel overflow-y-auto">
      <PanelComponent />
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        <PanelComponent />
      </Drawer>
    </div>
  );
};

export default SecondaryPanel;
