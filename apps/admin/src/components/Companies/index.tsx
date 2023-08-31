import { useEffect, useState } from "react";
import { ICompany, ICompanyHandler, ICompanySearch } from "@/interfaces";
import { useStore } from "zustand";
import { useCompanyStore } from "@/stores/company.store";
import { Button, Card, List, Pagination, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Search, Backdrop } from "@/components";
import { CompanyList } from "./List";
import { CompanyForm } from "./Form";
import { useAuthStore } from "@/stores";

export function Companies() {
  const authStore = useStore(useAuthStore);
  const companyStore = useStore(useCompanyStore);
  const size = 20;
  const [total, setTotal] = useState<number>(0);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [companyForm, setCompanyForm] = useState<ICompany | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => { handleSearch(); }, []);

  function handleSearch(search: ICompanySearch = { page: 1 }): void {
    setSearching(true);

    companyStore
      .find(search)
      .then((result) => {
        setCompanies(result.data);
        setTotal(result.total);
      })
      .catch((e) => message.error(e))
      .finally(() => setSearching(false));
  }

  function handleRemove(company: ICompany): void {
    setProcessing(true);

    companyStore
      .remove(company.id!)
      .then(() => {
        authStore.updateCompanies();
        message.success("Empresa removido com sucesso.");
        handleSearch();
      })
      .catch((e) => {
        message.error(e);
        setProcessing(false);
      });
  }

  function handleSave(company: ICompany): void {
    setProcessing(true);

    companyStore
      .upsert(company)
      .then(() => {
        authStore.updateCompanies();
        message.success('Empresa salvo com sucesso');

        setProcessing(false);
        setCompanyForm(null);
        handleSearch();
      })
      .catch((e) => {
        setProcessing(false);
        message.error(e);
      });
  }

  return (
    <>
      <Card>
        <Typography.Title level={4}>
          Empresas &nbsp;
          <Button onClick={() => setCompanyForm(ICompanyHandler.empty())}>
            <PlusOutlined />
          </Button>
        </Typography.Title>
        <List>
          <List.Item>
            <Search
              loading={searching}
              placeholder="Buscar empresa"
              onSearch={(label) => handleSearch(label ? { label } : undefined)}
            />
          </List.Item>
          <CompanyList
            companies={companies}
            onEdit={(p) => setCompanyForm(p)}
            onRemove={handleRemove}
          />
          {companies.length >= size &&
            <Pagination
              defaultCurrent={1}
              defaultPageSize={size}
              total={total}
              onChange={(page) => handleSearch({ page })}
              showSizeChanger={false}
            />
          }
        </List>
        <CompanyForm
          company={companyForm}
          onSave={handleSave}
          onClose={() => setCompanyForm(null)}
        />
      </Card>
      <Backdrop open={processing} />
    </>
  );
}
