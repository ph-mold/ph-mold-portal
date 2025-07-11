import { ReactNode } from "react";

interface ContentLayoutProps {
  title: string;
  subtitle?: string;
  actionSection?: ReactNode;
  contentSections?: Array<{
    title: string;
    component: ReactNode;
  }>;
}

export default function ContentLayout({
  title,
  subtitle,
  actionSection,
  contentSections = [],
}: ContentLayoutProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* 타이틀 */}
      <div className="py-8 px-4 sm:px-6 border-b border-border-light space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-foreground2">{subtitle}</p>}
        </div>
        {/* 액션 섹션 */}
        {actionSection && (
          <div className="flex justify-center gap-6">{actionSection}</div>
        )}
      </div>
      {/* 콘텐츠 섹션들 */}
      <div className="flex-1">
        <div className="py-8 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
          {contentSections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              {section.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
