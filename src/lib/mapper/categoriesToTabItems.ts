import { TabItem } from "@ph-mold/ph-ui/types";
import { ReactNode } from "react";
import { IGetCategory } from "../../types/category";

export function mapCategoriesToTabItems(categories: IGetCategory[]): TabItem[] {
  return [
    { label: "전체", value: "all" },
    ...categories.map((c) => ({
      label: c.name,
      value: c.key,
    })),
  ];
}

export function mapCategoriesToSubTabItems(
  categories: IGetCategory[],
  iconCallBackFn: {
    default: (category?: IGetCategory) => ReactNode;
    all: () => ReactNode;
  }
): TabItem[] {
  return [
    { label: "전체", value: "all", icon: iconCallBackFn.all() },
    ...categories.map((c) => ({
      label: c.name,
      value: c.key,
      icon: iconCallBackFn.default(c),
    })),
  ];
}
