import { FloatButton, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { ImageCustom } from "./styles";
import { DeleteOutlined } from "@ant-design/icons";

interface ImageCropProps {
  aspect?: "square" | "cover" | "jumbotrom";
  src?: string | null | undefined;
  onChange: (src?: string | null | undefined) => void;
}

export function ImageCrop(props: ImageCropProps) {
  const { src, onChange } = props;
  const aspectRatio = {
    square: 1,
    cover: 16 / 4,
    jumbotrom: 2 / 1,
  };
  const aspectPercent = {
    square: 100,
    cover: 40,
    jumbotrom: 50,
  };

  function handleBeforeUpload(file: any): boolean {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => onChange(reader.result as string);

    return false;
  }

  const selectedAspectRatio = aspectRatio[props.aspect || "square"];
  const selectedAspectPercent = aspectPercent[props.aspect || "square"];
  return (
    <>
      {src && (
        <ImageCustom src={src} heightPercent={selectedAspectPercent}>
          <FloatButton
            onClick={() => onChange()}
            icon={<DeleteOutlined />}
            type="default"
            style={{
              float: "right",
              position: "relative",
              right: 0,
              top: 0,
              margin: 10,
            }}
          />
        </ImageCustom>
      )}
      {!src && (
        <ImgCrop
          aspect={selectedAspectRatio}
          modalOk="Confirmar"
          modalCancel="Cancelar"
        >
          <Upload
            beforeUpload={handleBeforeUpload}
            onRemove={() => onChange()}
            multiple={false}
            showUploadList={false}
          >
            <ImageCustom
              src={"images/no-image.png"}
              heightPercent={selectedAspectPercent}
            />
          </Upload>
        </ImgCrop>
      )}
    </>
  );
}
