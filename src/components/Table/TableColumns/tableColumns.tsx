import { ITableData } from "@/types/ITableData";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, TableProps } from "antd";
import { Moment } from "moment";

export const getTableColumns = (
  handleEdit: (
    record: ITableData
  ) => React.MouseEventHandler<HTMLButtonElement>,
  handleDelete: (key: string) => React.MouseEventHandler<HTMLButtonElement>
): TableProps<ITableData>["columns"] => [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name, "ru"),
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    render: (date: Moment) => date.format("YYYY-MM-DD"),
    sorter: (a, b) =>
      new Date(a.date.toDate()).getTime() - new Date(b.date.toDate()).getTime(),
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Действия",
    key: "actions",
    render: (_, record: ITableData) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEdit(record)}
        />
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={handleDelete(record.key)}
          danger
        />
      </Space>
    ),
  },
];
