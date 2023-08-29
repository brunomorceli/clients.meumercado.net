import { ICompany, ICompanyHandler } from "@/interfaces";
import { useEffect, useState } from "react";
import { Card, Divider, Modal, Typography } from "antd";
import { ListImage, CustomTypo } from "./styles";
import { ShoppingOutlined } from "@ant-design/icons";

interface CompanyDetailsProps {
  company: ICompany | null | undefined;
  onClose: () => void;
}

export function CompanyDetails(props: CompanyDetailsProps) {
  const { onClose } = props;
  const [company, setCompany] = useState<ICompany>(ICompanyHandler.empty());

  useEffect(() => {
    setCompany(props.company || ICompanyHandler.empty());
  }, [props.company]);

  return (
    <Modal open={Boolean(props.company)} onCancel={onClose} footer={null} title="Detalhes do empresa">
      <Card cover={<ListImage src={company.logo || "images/no-image.png"} />}>
        <Typography.Title level={5}>
          {company.label.toUpperCase()}
        </Typography.Title>
        <Typography.Text disabled>{company.description}</Typography.Text>

        <Divider />

        <Typography.Title level={3}>
          <ShoppingOutlined /> Dados gerais
        </Typography.Title>

        <CustomTypo level={5} disabled>
          Dado 1
        </CustomTypo>
        <CustomTypo level={4}>
          alguma coisa
        </CustomTypo>
      </Card>
    </Modal>
  );
}
