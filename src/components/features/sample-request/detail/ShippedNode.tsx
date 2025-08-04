import {
  GET_SAMPLE_REQUEST,
  updateShippedNode,
} from "@/lib/api/sample-request";
import { ISampleRequest, IShippedNodeBody } from "@/lib/types/sample-request";
import { Button, Input, TextArea, useAlert } from "@ph-mold/ph-ui";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import * as Yup from "yup";

interface ShippedNodeProps {
  request: ISampleRequest;
}

// Yup 검증 스키마
const validationSchema = Yup.object().shape({
  trackingNumber: Yup.string()
    .required("송장번호를 입력해주세요.")
    .trim()
    .min(1, "송장번호를 입력해주세요."),
});

export function ShippedNode({ request }: ShippedNodeProps) {
  const alert = useAlert();
  const navigate = useNavigate();

  const [initFormValues, setInitFormValues] = useState<IShippedNodeBody>({
    trackingNumber: "",
    shippedAt: new Date().toISOString().split("T")[0],
    memo: "",
  });

  useEffect(() => {
    setInitFormValues({
      trackingNumber: request.nodeData?.shipped?.trackingNumber || "",
      shippedAt: request.nodeData?.shipped?.shippedAt
        ? request.nodeData?.shipped?.shippedAt
        : new Date().toISOString().split("T")[0],
      memo: request.nodeData?.shipped?.memo || "",
    });
  }, [request]);

  const onSubmit = async (values: IShippedNodeBody) => {
    const res = await updateShippedNode(request.id, values);
    if (res) {
      alert({
        title: "발송 완료",
        description: "발송 완료되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
        onAccept: () => {
          navigate(`/erp/sample-requests/${request.id}?n=completed`);
        },
      });
      mutate([GET_SAMPLE_REQUEST, request.id.toString()]);
    }
  };

  const handleCompleteShipped = (submitForm: () => void) => {
    alert({
      title: "발송 완료",
      description: "발송 완료하시겠습니까?",
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
        <Formik<IShippedNodeBody>
          initialValues={initFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, submitForm, errors, touched }) => (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  배송 중
                </h3>
                <Button
                  onClick={() => handleCompleteShipped(submitForm)}
                  size="small"
                  variant="outlined"
                >
                  발송 완료
                </Button>
              </div>

              {/* 송장번호 입력 */}
              <div className="flex flex-col gap-4 mb-4">
                <Input
                  required
                  label="송장번호"
                  placeholder="송장번호를 입력하세요"
                  name="trackingNumber"
                  value={values.trackingNumber}
                  onChange={handleChange}
                  helperText={
                    touched.trackingNumber && errors.trackingNumber
                      ? errors.trackingNumber
                      : undefined
                  }
                  error={touched.trackingNumber && !!errors.trackingNumber}
                />

                <Input
                  label="배송일자"
                  placeholder="배송일자를 입력하세요"
                  type="date"
                  name="shippedAt"
                  value={values.shippedAt}
                  onChange={handleChange}
                />
                <TextArea
                  label="내부 메모"
                  name="memo"
                  placeholder="작업 진행 상황을 기록하세요"
                  value={values.memo}
                  rows={4}
                  onChange={handleChange}
                />
                {/* <Input label="배송 추적 링크" readOnly /> */}
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
