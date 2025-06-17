interface PDFViewerProps {
  pdfUrl: string | null;
}

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="flex-1 rounded-lg overflow-hidden h-full">
      {pdfUrl ? (
        <iframe src={pdfUrl} className="w-full h-full" title="PDF Preview" />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          PDF를 생성하면 여기에 표시됩니다
        </div>
      )}
    </div>
  );
}
