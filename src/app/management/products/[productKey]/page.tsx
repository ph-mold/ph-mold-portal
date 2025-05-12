import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@ph-mold/ph-ui";
import {
  IGetProductImage,
  IGetProductInfo,
  ISpecType,
  ITag,
} from "../../../../lib/types/product";
import {
  GET_PRODUCT_IMAGES_BY_KEY,
  GET_PRODUCT_INFO_BY_KEY,
  getProductImagesByKey,
  getProductInfoByKey,
} from "../../../../lib/api/products";
import AddSpecModal from "../../../../components/management/products/AddSpecModal";
import AddTagModal from "../../../../components/management/products/AddTagModal";
import ProductInfoForm from "../../../../components/management/products/ProductInfoForm";
import SpecEditor from "../../../../components/management/products/SpecEditor";
import TagEditor from "../../../../components/management/products/TagEditor";
import ProductImageManager from "../../../../components/management/products/ProductImageManager";

export default function ManagementProductPage() {
  const { productKey } = useParams<{ productKey: string }>();
  const { data: product, isLoading: isProductLoading } = useSWR<
    IGetProductInfo | undefined
  >(productKey ? [GET_PRODUCT_INFO_BY_KEY, productKey] : null, () =>
    getProductInfoByKey(productKey)
  );

  const { data: images } = useSWR<IGetProductImage[] | undefined>(
    productKey ? [GET_PRODUCT_IMAGES_BY_KEY, productKey] : null,
    () => getProductImagesByKey(productKey)
  );

  const {
    register,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<IGetProductInfo>({ mode: "onChange" });

  const specsField = useFieldArray({ control, name: "specs" });
  const tagsField = useFieldArray({ control, name: "tags" });

  const [openAddSpec, setOpenAddSpec] = useState(false);
  const [openAddTag, setOpenAddTag] = useState(false);

  const [tempImages, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        moq: product.moq,
        specs: product.specs,
        tags: product.tags,
      });
    }
  }, [product, reset]);

  const test = () => console.log(getValues());

  return (
    <>
      <AddSpecModal
        open={openAddSpec}
        setOpen={setOpenAddSpec}
        addSpecTypeAction={(spec: ISpecType) =>
          specsField.append({ value: "", specType: spec })
        }
      />
      <AddTagModal
        open={openAddTag}
        setOpen={setOpenAddTag}
        addTagAction={(tag: ITag) => tagsField.append(tag)}
      />

      <div className="flex flex-col h-screen overflow-hidden py-2">
        <div className="flex gap-2 items-center mx-2 shrink-0">
          <Link to="/management/products">
            <Button className="!p-1" variant="text">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-2xl">제품 관리</h1>
          <Button onClick={test} variant="text">
            저장
          </Button>
        </div>

        <div className=" h-full overflow-hidden">
          {!isProductLoading && (
            <div className="grid grid-cols-[auto_1fr] relative h-full">
              <div className="max-w-[400px] p-4 flex gap-2 flex-col overflow-y-auto">
                <ProductInfoForm
                  register={register}
                  errors={errors}
                  product={product}
                />
                <SpecEditor
                  specs={specsField.fields}
                  register={register}
                  remove={specsField.remove}
                  openAddSpecModal={() => setOpenAddSpec(true)}
                />
                <TagEditor
                  tags={tagsField.fields}
                  remove={tagsField.remove}
                  openAddTagModal={() => setOpenAddTag(true)}
                />
              </div>
              <div className="h-full overflow-y-auto">
                <ProductImageManager
                  images={images}
                  tempImages={tempImages}
                  onUpload={(paths) => setImages((prev) => [...prev, ...paths])}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
