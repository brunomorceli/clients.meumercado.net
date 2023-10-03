import { Container } from "./style";
import { Uploader } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import { FileType } from "rsuite/esm/Uploader";

interface ImageEditorProps {
  images: string[];
  disableAdd?: boolean;
  onChange?: (images: string[]) => void;
}

export function ImageGalery(props: ImageEditorProps) {
  function handleUpload(fileList: FileType[]): void {
    const promises = fileList.map((file) => {
      if (Boolean(file.url)) {
        return Promise.resolve(file.url as string);
      }

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file.blobFile!);
      });
    });

    Promise.all(promises).then(props.onChange);
  }

  return (
    <Container>
      <Uploader
        multiple
        listType="picture"
        action=""
        onChange={handleUpload}
        fileList={props.images.map((image) => ({ url: image }))}
        draggable
        disabled={props.disableAdd}
      >
        <button>
          <CameraRetroIcon />
        </button>
      </Uploader>
    </Container>
  );
}
