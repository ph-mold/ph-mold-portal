import { Modal, Input, Button } from "@ph-mold/ph-ui";
import { CreateTagDto, ITag } from "../../../lib/types/tag";
import { useState, useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("이름을 입력해주세요"),
  key: yup.string().required("키를 입력해주세요"),
});
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; key: string }) => void;
  editingTag?: ITag;
}

export default function TagFormModal({
  open,
  onClose,
  onSubmit,
  editingTag,
}: Props) {
  const [initFormValues, setInitFormValues] = useState({ name: "", key: "" });

  useEffect(() => {
    if (editingTag) {
      setInitFormValues({ name: editingTag.name, key: editingTag.key });
    } else {
      setInitFormValues({ name: "", key: "" });
    }
  }, [editingTag]);

  const handleSubmit = (
    values: CreateTagDto,
    { setSubmitting, resetForm }: FormikHelpers<CreateTagDto>
  ) => {
    try {
      setSubmitting(true);
      onSubmit(values);
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={editingTag ? "태그 수정" : "태그 추가"}
      open={open}
      onClose={onClose}
      bodyClassName="!p-4"
    >
      <Formik<CreateTagDto>
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
            <div>
              <label className="block text-sm font-medium mb-1">이름</label>
              <Input
                required
                name="name"
                placeholder="이름을 입력해주세요"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.name && touched.name)}
                helperText={
                  errors.name && touched.name ? errors.name : undefined
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">키</label>
              <Input
                required
                name="key"
                placeholder="키를 입력해주세요"
                value={values.key}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!(errors.key && touched.key)}
                helperText={errors.key && touched.key ? errors.key : undefined}
              />
            </div>

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
                  setTouched({ name: true, key: true });
                  submitForm();
                }}
              >
                {editingTag ? "수정" : "추가"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
