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
    <header className="border-background2 fixed top-0 z-10 min-h-16 w-full border-b-2 bg-white/80 backdrop-blur-md">
      <div className="flex gap-2 items-center px-4 py-3">
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
    </header>
  );
}
