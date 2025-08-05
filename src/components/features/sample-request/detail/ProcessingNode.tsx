import { Button, TextArea, useAlert } from "@ph-mold/ph-ui";
import {
  IProcessingNodeBody,
  ISampleRequest,
} from "@/lib/types/sample-request";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ImageUploader } from "@/components/common/ImageUploader";
import { IMAGE_BASE_URL } from "@/lib/constants/api";
import { X } from "lucide-react";
import {
  GET_SAMPLE_REQUEST,
  updateProcessingNode,
} from "@/lib/api/sample-request";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

interface ProcessingNodeProps {
  request: ISampleRequest;
}

export function ProcessingNode({ request }: ProcessingNodeProps) {
  const alert = useAlert();
  const navigate = useNavigate();

  const [initFormValues, setInitFormValues] = useState<IProcessingNodeBody>({});

  useEffect(() => {
    setInitFormValues({
      memo: request.nodeData?.processing?.memo,
      imageUrl: request.nodeData?.processing?.imageUrl,
    });
  }, [request]);

  const onSubmit = async (values: IProcessingNodeBody) => {
    const res = await updateProcessingNode(request.id, values);
    if (res) {
      alert({
        title: "준비 완료",
        description: "준비 완료되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
        onAccept: () => {
          navigate(`/erp/sample-requests/${request.id}?n=shipped`);
        },
      });
      mutate([GET_SAMPLE_REQUEST, request.id.toString()]);
    }
  };

  const handleCompleteProcessing = (submitForm: () => void) => {
    alert({
      title: "준비 완료",
      description: "준비 완료하시겠습니까?",
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
        <Formik<IProcessingNodeBody>
          initialValues={initFormValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue, submitForm, handleChange }) => (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  준비 중
                </h3>
                <Button
                  type="button"
                  size="small"
                  variant="outlined"
                  onClick={() => handleCompleteProcessing(submitForm)}
                >
                  준비 완료
                </Button>
              </div>
              <form className="flex flex-col gap-4 mb-4">
                <TextArea
                  label="내부 메모"
                  name="memo"
                  placeholder="작업 진행 상황을 기록하세요"
                  value={values.memo}
                  rows={4}
                  onChange={handleChange}
                />
                <div>
                  <label className="block text-sm font-medium text-foreground2 mb-1">
                    첨부 이미지
                  </label>
                  <div className="max-w-32">
                    {values.imageUrl ? (
                      <div className="bg-background2 rounded-md overflow-hidden aspect-square relative border border-border-strong">
                        <img
                          src={`${IMAGE_BASE_URL}${values.imageUrl}`}
                          alt="첨부 이미지"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFieldValue("imageUrl", "")}
                          className="absolute top-1 right-1 w-6 h-6 bg-error text-reverseForeground rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <ImageUploader
                        multiple={false}
                        onUpload={(paths: string[]) => {
                          setFieldValue("imageUrl", paths[0]);
                        }}
                      />
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
