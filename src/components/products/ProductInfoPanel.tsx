import { IGetProductInfo } from "../../lib/types/product";
import { Input } from "@ph-mold/ph-ui";
import TagEditor from "./TagEditor";
import SpecEditor from "./SpecEditor";
import { FormikProps } from "formik";

interface Props extends FormikProps<IGetProductInfo> {
  product?: IGetProductInfo;
}

export default function ProductInfoPanel({
  product,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  ...props
}: Props) {
  return (
    <>
      {values && (
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-foreground2 text-sm">{product?.code}</p>
            <Input
              required
              name="name"
              fullWidth
              placeholder="예) 3ml PP 주사기"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.name && touched.name)}
              helperText={errors.name && touched.name ? errors.name : undefined}
              className="[&>*]:!p-0 [&>*]:!border-signature/30"
              inputClassName="text-lg font-bold"
              variant="outlined"
            />
            <TagEditor values={values} setFieldValue={props.setFieldValue} />
          </div>
          <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-row justify-between">
              <p className="text-sm font-semibold">재질</p>
              <p className="text-sm">{product?.material}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm font-semibold">제조국</p>
              <p className="text-sm">{product?.origin}</p>
            </div>
            <div className="gap-2 flex flex-col ">
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm font-semibold h-fit">
                  최소 주문 수량 (MOQ)
                </p>
                <Input
                  required
                  type="number"
                  name="moq"
                  placeholder="예) 10000"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.moq}
                  error={!!(errors.moq && touched.moq)}
                  helperText={
                    errors.moq && touched.moq ? errors.moq : undefined
                  }
                  className="[&>*]:!p-1 !w-50 [&>*]:!border-signature/30 "
                  inputClassName="text-sm text-right"
                  variant="outlined"
                />
              </div>
              <SpecEditor
                formikProps={{
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  touched,
                  ...props,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
