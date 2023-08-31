import { Typography, Upload } from "antd";
import ImgCrop from "antd-img-crop";

interface ImageEditorProps {
  title?: string;
  text?: string;
  url?: string;
  blob?: string;
  onChange?: (blob: string) => void;
  onDiscard?: () => void;
}

export function ImageEditor(props: ImageEditorProps) {
  function handleBeforeUpload(file: any): boolean {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      props.onChange && props.onChange(reader.result as string);

    return false;
  }

  return (
    <>
      <ImgCrop
        aspect={3 / 1}
        modalTitle={props.title || "Selecionar Imagem"}
        modalOk="Confirmar"
        modalCancel="Cancelar"
      >
        <Upload
          name="Capa Carregada"
          action="/upload"
          beforeUpload={handleBeforeUpload}
        >
          <>
            <Typography.Title>
              {props.text || "Adicionar Imagem"}
            </Typography.Title>
            <Typography.Text>Suporta JPG, JPEG2000, PNG</Typography.Text>
          </>
        </Upload>
      </ImgCrop>
    </>
  );
}
