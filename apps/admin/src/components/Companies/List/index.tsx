import { ICompany } from "@/interfaces";
import { Col } from "antd";
import { CardRow } from "./styles";
import { CompanyListItem } from "./Item";
import { useState } from "react";
import { CompanyDetails } from "./Details";

interface CompanyListProps {
  companies: ICompany[];
  onEdit: (company: ICompany) => void;
  onRemove: (company: ICompany) => void;
}

export function CompanyList(props: CompanyListProps) {
  const { companies, onEdit, onRemove } = props;
  const [companyDetails, setCompanyDetails] = useState<ICompany | null>(null);

  return (
    <>
      <CardRow>
        {companies.map((item, index) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4} key={index}>
            <CompanyListItem
              company={item}
              onEdit={onEdit}
              onRemove={onRemove}
              onDetails={setCompanyDetails}
            />
          </Col>
        ))}
      </CardRow>
      <CompanyDetails
        company={companyDetails}
        onClose={() => setCompanyDetails(null)}
      />
    </>
  );
}
