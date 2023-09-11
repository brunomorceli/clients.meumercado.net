import { Button, Modal, Typography, Image, Card } from "antd";
import { CardCustom, Container } from "./style";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface ImageEditorProps {
  images: string[];
  onChange?: (images: string[]) => void;
}

export function ImageGalery(props: ImageEditorProps) {
  const { images } = props;

  function handleRemove(index: number): void {
    const list = [...images];
    list.splice(index, 1);

    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Typography>Deseja realmente remover esta imagem?</Typography>,
      okText: "Remover",
      cancelText: "Cancelar",
      onOk: () => props.onChange && props.onChange(list),
    });
  }

  function handleMove(currIndex: number, nextIndex: number): void {
    if (nextIndex < 0) {
      return;
    }
    const list = [...images];
    if (nextIndex > list.length) {
      let k = nextIndex - list.length + 1;
      while (k--) {
        list.push();
      }
    }

    list.splice(nextIndex, 0, list.splice(currIndex, 1)[0]);

    props.onChange && props.onChange(list);
  }

  return (
    <Container>
      {images.map((image, index) => (
        <CardCustom
          key={index}
          style={{ width: 100 }}
          cover={<Image alt={image} src={image} />}
          actions={[
            <CaretLeftOutlined disabled={index === 0} key="moveLeft" onClick={() => handleMove(index, index - 1)} />,
            <DeleteOutlined key="delete" onClick={() => handleRemove(index)} />,
            <CaretRightOutlined key="moveRight" onClick={() => handleMove(index, index + 1)} />
          ]}
        >
        </CardCustom>
      ))}
    </Container>
  );
}
