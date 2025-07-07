import { useHeader } from "@/hooks/useHeader";
import {
  createSpecType,
  deleteSpecType,
  GET_SPEC_TYPES_PAGINATED,
  getSpecTypesPaginated,
  updateSpecType,
} from "@/lib/api/spec-types";
import { ISpecType, ISpecTypeListResponse } from "@/lib/types/spec";
import {
  Button,
  Input,
  Modal,
  Pagination,
  Popover,
  useAlert,
} from "@ph-mold/ph-ui";
import { Form, Formik, FormikHelpers } from "formik";
import { MoreVertical, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  label: yup.string().required("레이블을 입력해주세요"),
  key: yup
    .string()
    .required("키를 입력해주세요")
    .matches(/^[a-zA-Z0-9]+$/, "영문과 숫자만 입력 가능합니다"),
  unit: yup.string().required("단위를 입력해주세요"),
});

const ITEMS_PER_PAGE = 5;

const InitValues: ISpecType = {
  id: 0,
  label: "",
  key: "",
  unit: "",
};

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
    { setSubmitting, resetForm }: FormikHelpers<ISpecType>
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

export default function SpecsPage() {
  useHeader({
    title: "스펙 관리",
    prevLink: "/cms",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpec, setEditingSpec] = useState<ISpecType | null>(null);

  const handleModalOpen = (spec?: ISpecType) => {
    if (spec) {
      setEditingSpec(spec);
    } else {
      setEditingSpec(null);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSpec(null);
  };

  const handleSubmit = async (specType: ISpecType) => {
    try {
      if (editingSpec) {
        await updateSpecType(specType);
        alert({
          description: "스펙이 수정되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      } else {
        await createSpecType(specType);
        alert({
          description: "스펙이 생성되었습니다.",
          acceptLabel: "확인",
          showCancelButton: false,
        });
      }
      mutate(
        (key) => Array.isArray(key) && key[0] === GET_SPEC_TYPES_PAGINATED,
        undefined
      );
      handleModalClose();
    } catch {
      alert({
        description: editingSpec
          ? "스펙 수정에 실패했습니다."
          : "스펙 생성에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  const alert = useAlert();
  const handleDelete = async (specType: ISpecType) => {
    const confirmed = await new Promise<boolean>((resolve) => {
      alert({
        description: "정말 삭제하시겠습니까?",
        acceptLabel: "삭제",
        onAccept: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
    if (!confirmed) return;

    try {
      await deleteSpecType(specType.id);
      alert({
        description: "스펙이 삭제되었습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
      mutate(
        (key) => Array.isArray(key) && key[0] === GET_SPEC_TYPES_PAGINATED,
        undefined
      );
    } catch {
      alert({
        description: "스펙 삭제에 실패했습니다.",
        acceptLabel: "확인",
        showCancelButton: false,
      });
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: specTypes } = useSWR<ISpecTypeListResponse | undefined>(
    [GET_SPEC_TYPES_PAGINATED, currentPage],
    () => getSpecTypesPaginated({ page: currentPage, limit: ITEMS_PER_PAGE })
  );
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const currentItems = specTypes?.items ?? [];
  const totalPages = Math.ceil((specTypes?.total || 0) / ITEMS_PER_PAGE);

  return (
    <>
      <SpecFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        editingSpecType={editingSpec ?? undefined}
      />
      <div className="flex flex-col h-full overflow-y-auto">
        {/* 타이틀 */}
        <div className="py-8 px-4 sm:px-6 border-b border-border-light">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              스펙 관리
            </h1>
            <p className="text-foreground2">제품의 스펙을 관리합니다</p>
          </div>
          {/* 버튼 */}
          <div className="flex justify-center gap-6">
            <Button
              variant="outlined"
              startIcon={<Plus size={20} />}
              onClick={() => handleModalOpen()}
            >
              스펙 추가
            </Button>
          </div>
        </div>
        {/* 스펙 리스트 컨테이너 */}
        <div className="flex-1">
          <div className="py-8 px-4 sm:px-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">스펙 리스트</h1>
            {/* 스펙 리스트 */}
            <div className="space-y-2">
              {/* Spec Item */}
              {currentItems.map((specType) => (
                <div className="relative border border-border-strong rounded-lg px-4 py-3 hover:shadow-sm transition-shadow bg-background cursor-pointer group flex items-center justify-between">
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <span className="text-xs text-foreground2 bg-background2 border px-2 py-0.5 rounded-full border-border-light">
                      #{specType.id}
                    </span>
                    <div className="flex flex-row items-center gap-2 min-w-8">
                      <span className="font-semibold">{specType.label}</span>
                      <span className="text-xs text-foreground2/30">
                        {specType.key}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row ml-4 gap-2 items-center">
                    <span className="text-xs text-foreground2">단위</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-background2 text-foreground2 border-border-light min-w-8 justify-center">
                      {specType.unit}
                    </span>
                  </div>
                  <div className="relative z-10 ml-3">
                    <Popover
                      trigger={
                        <Button variant="text" size="small" className="!p-2">
                          <MoreVertical size={16} />
                        </Button>
                      }
                      placement="bottom-right"
                    >
                      <div className="flex flex-col p-2 gap-1 w-40">
                        <Button
                          variant="text"
                          color="secondary"
                          size="small"
                          className="!py-2.5"
                          onClick={() => handleModalOpen(specType)}
                        >
                          수정
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          size="small"
                          className="!py-2.5"
                          onClick={() => handleDelete(specType)}
                        >
                          삭제
                        </Button>
                      </div>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
