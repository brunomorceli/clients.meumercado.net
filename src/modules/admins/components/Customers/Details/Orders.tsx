import { IOrderResult } from "@admins/interfaces";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EOrderStatus,
  EOrderStatusHandler,
  GeneralUtils,
} from "@root/modules/shared";
import { Button, Table } from "rsuite";

interface OrderProps {
  orders: IOrderResult[];
  onClick: (order: IOrderResult) => void;
  onDetails: (order: IOrderResult) => void;
}

export function Orders(props: OrderProps) {
  return (
    <Table
      data={props.orders}
      onRowClick={(rowData) => props.onClick(rowData)}
      style={{ cursor: "pointer" }}
      rowHeight={55}
      autoHeight
    >
      <Table.Column width={100}>
        <Table.HeaderCell>Id</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column width={150}>
        <Table.HeaderCell>Data</Table.HeaderCell>
        <Table.Cell
          dataKey="createdAt"
          renderCell={(data) => GeneralUtils.localTime(data, true)}
        />
      </Table.Column>

      <Table.Column width={150}>
        <Table.HeaderCell>Total</Table.HeaderCell>
        <Table.Cell
          dataKey="total"
          renderCell={(data) => GeneralUtils.getAmountLabel(data)}
        />
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.Cell
          dataKey="status"
          renderCell={(data) => (
            <div style={{ color: EOrderStatusHandler.color(data), fontWeight: 500 }}>
              {EOrderStatusHandler.label(data)}
            </div>
          )}
        />
      </Table.Column>

      <Table.Column width={100} fixed="right">
        <Table.HeaderCell>Ações</Table.HeaderCell>
        <Table.Cell>
          {(order) => (
            <Button onClick={() => props.onDetails(order as any)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
}
