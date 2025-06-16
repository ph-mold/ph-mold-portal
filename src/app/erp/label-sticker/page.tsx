import { useState } from "react";
import { Button, Modal } from "@ph-mold/ph-ui";
import { Pagination } from "@/components/common/Pagination";
import { useHeader } from "@/hooks/useHeader";

interface LabelHistory {
  id: string;
  fileName: string;
  createdAt: string;
  creator: string;
}

const mockData: LabelHistory[] = [
  {
    id: "1",
    fileName: "금형_A123_라벨",
    createdAt: "2024-03-20 14:30",
    creator: "김철수",
  },
  {
    id: "2",
    fileName: "금형_B456_라벨",
    createdAt: "2024-03-20 15:45",
    creator: "이영희",
  },
  {
    id: "3",
    fileName: "금형_C789_라벨",
    createdAt: "2024-03-21 09:15",
    creator: "박지성",
  },
  {
    id: "4",
    fileName: "사출_X123_라벨",
    createdAt: "2024-03-21 10:30",
    creator: "김영희",
  },
  {
    id: "5",
    fileName: "금형_D234_라벨",
    createdAt: "2024-03-21 11:20",
    creator: "이철수",
  },
  {
    id: "6",
    fileName: "사출_Y456_라벨",
    createdAt: "2024-03-21 13:45",
    creator: "박철수",
  },
  {
    id: "7",
    fileName: "금형_E567_라벨",
    createdAt: "2024-03-21 14:30",
    creator: "김지성",
  },
  {
    id: "8",
    fileName: "사출_Z789_라벨",
    createdAt: "2024-03-21 15:15",
    creator: "이지수",
  },
  {
    id: "9",
    fileName: "금형_F890_라벨",
    createdAt: "2024-03-21 16:00",
    creator: "박영희",
  },
  {
    id: "10",
    fileName: "사출_W012_라벨",
    createdAt: "2024-03-21 16:45",
    creator: "김민수",
  },
  {
    id: "11",
    fileName: "금형_G123_라벨",
    createdAt: "2024-03-22 09:30",
    creator: "이철호",
  },
  {
    id: "12",
    fileName: "사출_V345_라벨",
    createdAt: "2024-03-22 10:15",
    creator: "박민지",
  },
  {
    id: "13",
    fileName: "금형_H456_라벨",
    createdAt: "2024-03-22 11:00",
    creator: "김서연",
  },
  {
    id: "14",
    fileName: "사출_U678_라벨",
    createdAt: "2024-03-22 11:45",
    creator: "이민호",
  },
  {
    id: "15",
    fileName: "금형_I789_라벨",
    createdAt: "2024-03-22 13:30",
    creator: "박서준",
  },
];

const ITEMS_PER_PAGE = 5;

export default function LabelStickerPage() {
  useHeader({
    title: "라벨 스티커",
    prevLink: "/erp",
  });

  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<LabelHistory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePdfView = (label: LabelHistory) => {
    setSelectedLabel(label);
    setIsPdfModalOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">라벨 스티커 이력</h1>

      <div className="space-y-2">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="border-2 border-[#E2E8F0] rounded-lg px-4 py-3  hover:shadow-sm transition-shadow bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-base">{item.fileName}</h3>
                <div className="flex gap-3 text-sm text-gray-600 mt-1">
                  <span>{item.createdAt}</span>
                  <span>•</span>
                  <span>{item.creator}</span>
                </div>
              </div>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handlePdfView(item)}
              >
                PDF 보기
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        open={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        title={`${selectedLabel?.fileName}`}
        className="max-w-[90vw]"
      >
        <div
          className="w-full bg-white rounded shadow-sm mx-auto"
          style={{
            aspectRatio: "1/1.4142", // A4 비율
            maxHeight: "calc(90vh - 120px)", // 모달 헤더와 여백 고려
            width: "min(calc(90vh - 120px) / 1.4142, 100%)", // A4 비율 유지하면서 최대 크기 제한
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">
              PDF 뷰어가 여기에 표시됩니다. <br />
              선택된 라벨: {selectedLabel?.fileName}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
