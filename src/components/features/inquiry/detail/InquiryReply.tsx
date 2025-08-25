import { useState } from "react";
import { Button, TextArea, useAlert } from "@ph-mold/ph-ui";
import { Clock, MessageSquare, Send, FileText, User } from "lucide-react";
import { IReply } from "@/lib/types/inquiry";
import { formatKoreanDateTime } from "@/utils/format";

interface InquiryReplyProps {
  remarks: string;
  replies?: IReply[];
  onReplySubmit: (content: string) => Promise<void>;
}

export function InquiryReply({
  remarks,
  replies,
  onReplySubmit,
}: InquiryReplyProps) {
  const [isAddingReply, setIsAddingReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      alert({
        title: "답변 등록",
        description: "답변을 등록하시겠습니까?",
        acceptLabel: "확인",
        cancelLabel: "취소",
        onAccept: async () => {
          setIsLoading(true);
          try {
            await onReplySubmit(replyText);
            setReplyText("");
            setIsAddingReply(false);
          } catch (error) {
            console.error("답변 등록 실패:", error);
          } finally {
            setIsLoading(false);
          }
        },
      });
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

      {/* 기존 답변들 표시 */}
      {replies && replies.length > 0 ? (
        <div className="mb-4 space-y-3">
          <h4 className="text-sm font-medium text-foreground">답변 목록</h4>
          {replies.map((reply, index) => (
            <div
              key={reply.id || index}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-green-600" />
                  <span className="text-xs text-green-700 font-medium">
                    {reply.replyType === "COMPANY" ? "회사 담당자" : "고객"}
                  </span>
                </div>
                <span className="text-xs text-green-600">
                  {formatKoreanDateTime(reply.createdAt)}
                </span>
              </div>
              <p className="text-green-700 text-sm whitespace-pre-wrap">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            <span className="text-sm">아직 답변이 등록되지 않았습니다.</span>
          </div>
        </div>
      )}

      {/* 답변 작성 */}
      {!isAddingReply ? (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsAddingReply(true)}
          startIcon={<MessageSquare size={16} />}
          className="w-full sm:!w-auto"
        >
          답변 추가
        </Button>
      ) : (
        <div className="space-y-3">
          <TextArea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답변을 입력해주세요..."
            rows={4}
            className="w-full"
            disabled={isLoading}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={handleReplySubmit}
              startIcon={<Send size={16} />}
              loading={isLoading}
              disabled={isLoading}
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
              disabled={isLoading}
            >
              취소
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
