/* eslint-disable @next/next/no-img-element */
import { ICompany } from "@/interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Card, Modal, Typography } from "antd";

interface CompanyListItemProps {
  company: ICompany;
  onEdit: (company: ICompany) => void;
  onRemove: (company: ICompany) => void;
  onDetails: (company: ICompany) => void;
}

export function CompanyListItem(props: CompanyListItemProps) {
  const { company, onEdit, onRemove, onDetails } = props;

  function handleRemove(): void {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography>
          Deseja realmente remover <b>{company.name}</b>?
        </Typography>
      ),
      okText: "Remover",
      cancelText: "Cancelar",
      onOk: () => onRemove(company),
    });
  }

  return (
    <Card
      style={{ margin: 5 }}
      cover={
        <img
          alt={company.name}
          src={company.logo || "images/no-image.png"}
          onClick={() => onDetails(company)}
          style={{cursor: 'pointer'}}
        />
      }
      actions={[
        <FileSearchOutlined
          key="btDetails"
          onClick={() => onDetails(company)}
        />,
        <EditOutlined key="btEdit" onClick={() => onEdit(company)} />,
        <DeleteOutlined key="btRemove" onClick={handleRemove} />,
      ]}
    >
      <Typography.Title level={5}>
        {company.name.toUpperCase()}
      </Typography.Title>
    </Card>
  );
}
