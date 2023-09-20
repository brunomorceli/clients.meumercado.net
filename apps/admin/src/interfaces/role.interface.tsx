export interface IRole {
  id: string;
  label: string;
  permissions: {
    roles: string[];
    companies: string[];
    orders: string[];
    products: string[];
    employees: string[];
    clients: string[];
  };
}
