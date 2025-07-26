import { ITableData } from "@/types/ITableData";
import { TableProps } from "antd";

export const tableColumns: TableProps<ITableData>["columns"] = [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
];
