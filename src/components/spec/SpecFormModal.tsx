import { ISpecType } from "@/lib/types/spec";
import { Button, Input, Modal } from "@ph-mold/ph-ui";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { InitValues } from ".";

import * as yup from "yup";

const validationSchema = yup.object().shape({
  label: yup.string().required("레이블을 입력해주세요"),
  key: yup
    .string()
    .required("키를 입력해주세요")
    .matches(/^[a-zA-Z0-9]+$/, "영문과 숫자만 입력 가능합니다"),
  unit: yup.string().required("단위를 입력해주세요"),
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ISpecType) => void;
  editingSpecType?: ISpecType;
}
export function SpecFormModal({
  open,
  onClose,
  onSubmit,
  editingSpecType,
}: Props) {
  const [initFormValues, setInitFormValues] = useState(InitValues);

  useEffect(() => {
    if (editingSpecType) {
      setInitFormValues({
        id: editingSpecType.id,
        label: editingSpecType.label,
        key: editingSpecType.key,
        unit: editingSpecType.unit,
      });
    } else {
      setInitFormValues(InitValues);
    }
  }, [editingSpecType]);

  const handleSubmit = (
    values: ISpecType,
    { setSubmitting }: FormikHelpers<ISpecType>
  ) => {
    try {
      setSubmitting(true);
      onSubmit(values);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={editingSpecType ? "스펙 수정" : "스펙 추가"}
      open={open}
      onClose={onClose}
      bodyClassName="!p-4"
    >
      <Formik<ISpecType>
        initialValues={initFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize={true}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
          submitForm,
          setTouched,
          resetForm,
        }) => (
          <Form className="space-y-4">
            <Input
              label="레이블"
              required
              name="label"
              placeholder="레이블을 입력해주세요"
              value={values.label}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.label && touched.label)}
              helperText={
                errors.label && touched.label ? errors.label : undefined
              }
            />
            <Input
              label="키"
              required
              name="key"
              placeholder="키를 입력해주세요"
              value={values.key}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.key && touched.key)}
              helperText={errors.key && touched.key ? errors.key : undefined}
            />
            <Input
              label="단위"
              required
              name="unit"
              placeholder="단위를 입력해주세요"
              value={values.unit}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.unit && touched.unit)}
              helperText={errors.unit && touched.unit ? errors.unit : undefined}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="text"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                type="button"
                loading={isSubmitting}
                onClick={() => {
                  setTouched({ label: true, key: true, unit: true });
                  submitForm();
                }}
              >
                {editingSpecType ? "수정" : "추가"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
