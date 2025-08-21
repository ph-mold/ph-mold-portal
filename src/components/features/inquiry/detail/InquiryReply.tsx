import { useState } from "react";
import { Button, TextArea } from "@ph-mold/ph-ui";
import { Clock, MessageSquare, Send, FileText } from "lucide-react";
import { IReply } from "@/lib/types/inquiry";

interface InquiryReplyProps {
  remarks: string;
  reply?: IReply;
  onReplySubmit: (content: string) => void;
}

export function InquiryReply({
  remarks,
  reply,
  onReplySubmit,
}: InquiryReplyProps) {
  const [isAddingReply, setIsAddingReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReplySubmit(replyText);
      setReplyText("");
      setIsAddingReply(false);
    }
  };

  return (
    <div className="p-4 sm:!p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <MessageSquare size={20} className="text-green-500" />
        답변 관리
      </h3>

      {/* 문의 내용 표시 */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2 mb-2">
          <FileText size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm font-medium text-blue-800">문의 내용</span>
        </div>
        <p className="text-blue-700 text-sm whitespace-pre-wrap pl-6">
          {remarks || "문의 내용이 없습니다."}
        </p>
      </div>

      {/* 기존 답변 표시 */}
      {reply ? (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm font-medium text-green-800">답변</span>
            <span className="text-xs text-green-600">
              {new Date(reply.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
          <p className="text-green-700 text-sm whitespace-pre-wrap">
            {reply.content}
          </p>
        </div>
      ) : (
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            <span className="text-sm">아직 답변이 등록되지 않았습니다.</span>
          </div>
        </div>
      )}

      {/* 답변 작성/수정 */}
      {!isAddingReply ? (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsAddingReply(true)}
          startIcon={<MessageSquare size={16} />}
          className="w-full sm:!w-auto"
        >
          {reply ? "답변 수정" : "답변 등록"}
        </Button>
      ) : (
        <div className="space-y-3">
          <TextArea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답변을 입력해주세요..."
            rows={4}
            className="w-full"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={handleReplySubmit}
              startIcon={<Send size={16} />}
            >
              답변 등록
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setIsAddingReply(false);
                setReplyText("");
              }}
            >
              취소
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
