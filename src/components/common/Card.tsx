import { ElementType } from "react";
import clsx from "clsx";

// 스타일 클래스 매핑
const cardStyles = {
  base: "bg-background sm:shadow sm:rounded-lg sm:border border-border-strong sm:mx-4",
  basic: "bg-background shadow rounded-lg border border-border-strong",
  topBorder: "border-t-4 ",
  padding: "p-4 sm:!p-6",
};

interface CardProps<T extends ElementType = "div"> {
  children: React.ReactNode;
  className?: string;
  topBorder?: boolean;
  basic?: boolean;
  padding?: boolean;
  as?: T;
}

export function Card<T extends ElementType = "div">({
  children,
  className,
  topBorder = false,
  basic = false,
  padding = false,
  as,
  ...props
}: CardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        basic ? cardStyles.basic : cardStyles.base,
        topBorder && !basic && cardStyles.topBorder,
        padding && cardStyles.padding,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
