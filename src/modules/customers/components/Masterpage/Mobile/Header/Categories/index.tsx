import { Drawer, Nav, Sidebar, Sidenav, Stack } from "rsuite";
import { Item } from "./Item";
import { IOption } from "./interfaces/option.interface";
import ArrowLeftLineIcon from "@rsuite/icons/ArrowLeftLine";

interface WebCategoriesProps {
  open?: boolean;
  options: IOption[];
  onPick: (value: string) => void;
  onClose: () => void;
}

export function Categories(props: WebCategoriesProps) {
  function handlePick(id: string): void {
    props.onPick(id);
    props.onClose();
  }

  return (
    <Drawer
      size="full"
      open={props.open}
      onClose={props.onClose}
      placement="left"
    >
      <Sidebar
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          overflowY: "auto",
        }}
        width="100%"
        collapsible
      >
        <Sidenav.Header
          style={{
            height: 50,
            backgroundColor: "#8bc34a",
            color: "white",
            fontSize: 20,
            fontWeight: "500",
            padding: 10,
          }}
          onClick={props.onClose}
        >
          <Stack justifyContent="flex-start">
            <Stack.Item grow={1} style={{ textAlign: 'center' }}>Produtos</Stack.Item>
            <Stack.Item>
              <ArrowLeftLineIcon />
            </Stack.Item>
          </Stack>
        </Sidenav.Header>
        <Sidenav appearance="subtle" style={{ height: "calc(100vh - 55px)" }}>
          <Sidenav.Body style={{ overflow: "hidden", overflowY: "auto" }}>
            <Nav>
              {props.options.map((option, index) => (
                <Item key={index} option={option} onPick={handlePick} />
              ))}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Sidebar>
    </Drawer>
  );
}
