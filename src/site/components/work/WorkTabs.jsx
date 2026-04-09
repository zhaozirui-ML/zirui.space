import { Heart, LayoutDashboard, LayoutGrid } from "lucide-react";

import Button from "../../../../design-system/components/Button";
import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

const tabIcons = {
  heart: Heart,
  layoutDashboard: LayoutDashboard,
  layoutGrid: LayoutGrid,
};

function WorkTabChip({ isActive, onSelect, tab }) {
  const TabIcon = tabIcons[tab.iconName];

  return (
    <li role="presentation">
      <Button
        aria-controls={`work-panel-${tab.id}`}
        aria-selected={isActive}
        className={joinClassNames(
          styles.tabChip,
          isActive ? styles.tabChipActive : styles.tabChipInactive,
        )}
        id={`work-tab-${tab.id}`}
        leadingIcon={
          TabIcon ? (
            <TabIcon
              aria-hidden="true"
              className={styles.tabIcon}
              size={15}
              strokeWidth={1.85}
            />
          ) : null
        }
        onClick={() => onSelect(tab.id)}
        role="tab"
        size="sm"
        variant="chip"
      >
        {tab.label}
      </Button>
    </li>
  );
}

export default function WorkTabs({ activeTabId, onSelect, tabs }) {
  return (
    <ul
      aria-label="Work categories"
      className={styles.tabsList}
      role="tablist"
    >
      {tabs.map((tab) => (
        <WorkTabChip
          isActive={tab.id === activeTabId}
          key={tab.id}
          onSelect={onSelect}
          tab={tab}
        />
      ))}
    </ul>
  );
}
