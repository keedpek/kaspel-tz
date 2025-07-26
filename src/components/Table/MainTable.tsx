import { FC, useEffect, useState } from "react";
import { Button, Input, Space, Table, TableProps } from "antd";
import { ITableData } from "@/types/ITableData";
import {
  addItem,
  deleteItem,
  getItems,
  modifyItem,
} from "@/utils/localStorageFunctions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalForm from "../ModalForm/ModalForm";
import { IModalState } from "@/types/IModalState";
import { Moment } from "moment";

const MainTable: FC = () => {
  const [data, setData] = useState<ITableData[]>([]);
  const [modalState, setModalState] = useState<IModalState>({
    visible: false,
    mode: "add",
  });

  useEffect(() => {
    const storedItems = getItems();
    setData(storedItems);
  }, []);

  const handleAdd = () => {
    setModalState({ visible: true, mode: "add" });
  };

  const handleEdit = (record: ITableData) => {
    return () => {
      setModalState({
        visible: true,
        mode: "edit",
        initialValues: record,
      });
    };
  };

  const handleSubmit = (record: Omit<ITableData, "key">) => {
    const newRecord: ITableData = {
      ...record,
      key: modalState.initialValues?.key || Date.now().toString(),
      date: record.date,
    };
    let newItems: ITableData[] = [];

    switch (modalState.mode) {
      case "add":
        newItems = addItem(newRecord);
        break;
      case "edit":
        newItems = modifyItem(newRecord);
        break;
      default:
        alert("Что-то пошло не так");
    }
    setData(newItems);
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  const handleDelete = (key: string) => {
    return () => {
      const newItems = deleteItem(key);
      setData(newItems);
    };
  };

  const onModalClose = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  const tableColumns: TableProps<ITableData>["columns"] = [
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
        new Date(a.date.toDate()).getTime() -
        new Date(b.date.toDate()).getTime(),
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

  return (
    <>
      <Space size="large" direction="vertical">
        <Input.Search variant="outlined" size="large" />
        <Button type="primary" size="large" onClick={handleAdd}>
          Добавить
        </Button>
        <Table<ITableData> dataSource={data} columns={tableColumns} />
      </Space>

      <ModalForm
        {...modalState}
        onCancel={onModalClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default MainTable;
