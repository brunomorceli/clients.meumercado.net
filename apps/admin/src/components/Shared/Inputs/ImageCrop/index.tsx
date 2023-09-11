import { FloatButton, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { ImageCustom } from "./styles";
import { DeleteOutlined } from "@ant-design/icons";
import { ReactNode } from "react";

interface ImageCropProps {
  aspect?: "square" | "cover" | "jumbotrom" | "dynamic";
  src?: string | null | undefined;
  children?: ReactNode | null | undefined;
  onChange: (src?: string | null | undefined) => void;
}

export function ImageCrop(props: ImageCropProps) {
  const { src, onChange } = props;
  const aspectRatio = {
    square: 1,
    cover: 16 / 4,
    jumbotrom: 2 / 1,
    dynamic: 1,
  };
  const aspectPercent = {
    square: 100,
    cover: 40,
    jumbotrom: 50,
    dynamic: 100,
  };

  function handleBeforeUpload(file: any): boolean {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => onChange(reader.result as string);

    return false;
  }

  const selectedAspectRatio = aspectRatio[props.aspect || "square"];
  const selectedAspectPercent = aspectPercent[props.aspect || "square"];

  const Content = () => (
    <ImgCrop
      aspect={selectedAspectRatio}
      modalOk="Confirmar"
      modalCancel="Cancelar"
      aspectSlider={props.aspect === 'dynamic'}
      quality={0.7}
    >
      <Upload
        beforeUpload={handleBeforeUpload}
        onRemove={() => onChange()}
        multiple={false}
        showUploadList={false}
      >
        {props.children ||
          <ImageCustom
            src={"images/no-image.png"}
            heightPercent={selectedAspectPercent}
          />
        }
      </Upload>
    </ImgCrop>
  );

  if (props.children) {
    return <Content />;
  }

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
      { !src && <Content /> }
    </>
  );
}
