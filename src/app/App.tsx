import { Tab } from "@ph-mold/ph-ui";
import { getRootCategory } from "../lib/api/categories";
import { mapCategoriesToTabItems } from "../lib/mapper/categoriesToTabItems";
import { useEffect, useState } from "react";
import { TabItem } from "@ph-mold/ph-ui/types";

export default function App() {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  useEffect(() => {
    getRootCategory().then((categories) => {
      setTabs(mapCategoriesToTabItems(categories));
    });
  }, []);
  return (
    <div>
      <Tab className="w-full" tabs={tabs} />
    </div>
  );
}
