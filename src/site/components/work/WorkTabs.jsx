import { Heart, LayoutDashboard, LayoutGrid } from "lucide-react";

import Button from "../../../../design-system/components/Button";
import { workIndexDictionary } from "../../i18n/dictionary";
import { getLocalizedValue } from "../../i18n/get-localized-value";
import { joinClassNames } from "./join-class-names";
import styles from "./work-components.module.css";

const tabIcons = {
  heart: Heart,
  layoutDashboard: LayoutDashboard,
  layoutGrid: LayoutGrid,
};

function WorkTabChip({ isActive, language, onSelect, tab }) {
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
        {getLocalizedValue(tab.label, language)}
      </Button>
    </li>
  );
}

export default function WorkTabs({ activeTabId, language, onSelect, tabs }) {
  return (
    <ul
      aria-label={getLocalizedValue(workIndexDictionary.tabAriaLabel, language)}
      className={styles.tabsList}
      role="tablist"
    >
      {tabs.map((tab) => (
        <WorkTabChip
          isActive={tab.id === activeTabId}
          key={tab.id}
          language={language}
          onSelect={onSelect}
          tab={tab}
        />
      ))}
    </ul>
  );
}
