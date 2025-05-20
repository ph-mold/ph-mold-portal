import { Button } from "@ph-mold/ph-ui";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  prevLink?: string;
  components?: ReactNode;
}

export default function Header({ title, prevLink, components }: Props) {
  return (
    <div className="flex gap-2 items-center px-4 py-3 shrink-0 border-b-2 border-background2 min-h-16">
      {prevLink && (
        <Link to={prevLink}>
          <Button className="!p-1" variant="text">
            <ChevronLeft />
          </Button>
        </Link>
      )}
      <h1 className="text-xl">{title}</h1>
      {components && components}
    </div>
  );
}
