import {
  GET_SAMPLE_REQUEST,
  updateCompletedNode,
} from "@/lib/api/sample-request";
import { ICompletedNodeBody } from "@/lib/types/sample-request";
import { Button, Input, TextArea, useAlert } from "@ph-mold/ph-ui";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { ISampleRequest } from "@/lib/types/sample-request";

interface CompletedNodeProps {
  request: ISampleRequest;
}

export function CompletedNode({ request }: CompletedNodeProps) {
  const alert = useAlert();

  const [initFormValues, setInitFormValues] = useState<ICompletedNodeBody>({
    completedAt: new Date().toISOString().split("T")[0],
    memo: "",
  });

  useEffect(() => {
    setInitFormValues({
      completedAt:
        request.nodeData?.completed?.completedAt ||
        new Date().toISOString().split("T")[0],
      memo: request.nodeData?.completed?.memo || "",
    });
  }, [request]);

  const onSubmit = async (values: ICompletedNodeBody) => {
    const res = await updateCompletedNode(request.id, values);
    if (res) {
      alert({
        title: "완료",
        description: "완료되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
      mutate([GET_SAMPLE_REQUEST, request.id.toString()]);
    }
  };

  const handleCompleteCompleted = (submitForm: () => void) => {
    alert({
      title: "완료",
      description: "완료하시겠습니까?",
      acceptLabel: "완료",
      cancelLabel: "취소",
      onAccept: () => {
        submitForm();
      },
    });
  };

  return (
    <div className="space-y-4 bg-background rounded-lg shadow-sm border border-border-strong">
      <div className="p-4 sm:!p-6">
        <Formik<ICompletedNodeBody>
          initialValues={initFormValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values, submitForm, handleChange }) => (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">완료</h3>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleCompleteCompleted(submitForm)}
                >
                  완료
                </Button>
              </div>
              <div className="flex flex-col gap-4 mb-4">
                <Input
                  label="수령일자"
                  type="date"
                  name="completedAt"
                  value={values.completedAt || ""}
                  onChange={handleChange}
                />
                <TextArea
                  label="후속 메모"
                  rows={4}
                  placeholder="고객 피드백이나 후속 조치 사항을 기록하세요"
                  name="memo"
                  value={values.memo || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
