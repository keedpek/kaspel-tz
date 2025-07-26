import { FC, useEffect, useMemo, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { ITableData } from "@/types/ITableData";
import {
  addItem,
  deleteItem,
  getItems,
  modifyItem,
} from "@/utils/localStorageFunctions";
import ModalForm from "../ModalForm/ModalForm";
import { IModalState } from "@/types/IModalState";
import { tableSearch } from "@/utils/tableSearch";
import { getTableColumns } from "./TableColumns/tableColumns";

const MainTable: FC = () => {
  const [data, setData] = useState<ITableData[]>([]);
  const [modalState, setModalState] = useState<IModalState>({
    visible: false,
    mode: "add",
  });
  const [searchStr, setSearchStr] = useState<string>("");

  useEffect(() => {
    const storedItems = getItems();
    setData(storedItems);
  }, []);

  const handleAdd = () => {
    setModalState({ visible: true, mode: "add" });
  };

  const handleEdit = (
    record: ITableData
  ): React.MouseEventHandler<HTMLButtonElement> => {
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

  const handleDelete = (
    key: string
  ): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      const newItems = deleteItem(key);
      setData(newItems);
    };
  };

  const onModalClose = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  };

  const filteredData = useMemo(
    () => tableSearch(data, searchStr),
    [data, searchStr]
  );

  const columns = useMemo(() => getTableColumns(handleEdit, handleDelete), []);

  return (
    <>
      <Space size="large" direction="vertical">
        <Input.Search
          variant="outlined"
          size="large"
          value={searchStr}
          onChange={onSearchChange}
        />
        <Button type="primary" size="large" onClick={handleAdd}>
          Добавить
        </Button>
        <Table<ITableData> dataSource={filteredData} columns={columns} />
      </Space>

      {modalState.visible && (
        <ModalForm
          {...modalState}
          onCancel={onModalClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default MainTable;
