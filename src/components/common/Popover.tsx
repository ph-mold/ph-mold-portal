import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

type Placement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: Placement;
  popoverClassName?: string;
  disabled?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function Popover({
  trigger,
  children,
  placement = "bottom-left",
  popoverClassName = "",
  disabled = false,
  onOpenChange,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (disabled) return;
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    // 기본 위치 계산
    switch (placement) {
      case "top-left":
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.left;
        break;
      case "top-right":
        top = triggerRect.top - popoverRect.height - 8;
        left = triggerRect.right - popoverRect.width;
        break;
      case "bottom-left":
        top = triggerRect.bottom + 8;
        left = triggerRect.left;
        break;
      case "bottom-right":
        top = triggerRect.bottom + 8;
        left = triggerRect.right - popoverRect.width;
        break;
    }

    // 뷰포트 경계 체크 및 조정
    if (left < 8) left = 8;
    if (left + popoverRect.width > viewportWidth - 8) {
      left = viewportWidth - popoverRect.width - 8;
    }

    if (top < 8) {
      // 위쪽이 잘리면 아래쪽으로 이동
      top = triggerRect.bottom + 8;
    }
    if (top + popoverRect.height > viewportHeight - 8) {
      // 아래쪽이 잘리면 위쪽으로 이동
      top = triggerRect.top - popoverRect.height - 8;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [isOpen, placement]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onOpenChange]);

  return (
    <>
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            className={`fixed z-10 bg-background border border-border-strong rounded-lg shadow-lg ${popoverClassName}`}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}
