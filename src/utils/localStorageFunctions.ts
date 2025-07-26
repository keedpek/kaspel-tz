import { dataSource } from "@/consts/mockData";
import { ITableData } from "@/types/ITableData";
import moment from "moment";

const storageKey = "tableItems";

export const getItems = (): ITableData[] => {
  const storedItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
  return storedItems.map((item: ITableData) => ({
    ...item,
    date: moment(item.date),
  }));
};

export const addItem = (record: ITableData): ITableData[] => {
  const storedItems: ITableData[] = getItems();
  const newItems = [...storedItems, record];
  localStorage.setItem(storageKey, JSON.stringify(newItems));
  return newItems;
};

export const modifyItem = (modifiedItem: ITableData): ITableData[] => {
  const storedItems: ITableData[] = getItems();
  const newItems = storedItems.map((item) =>
    item.key === modifiedItem.key ? modifiedItem : item
  );
  localStorage.setItem(storageKey, JSON.stringify(newItems));
  return newItems;
};

export const deleteItem = (key: string): ITableData[] => {
  const storedItems: ITableData[] = getItems();
  const newItems = storedItems.filter((item) => item.key !== key);
  localStorage.setItem(storageKey, JSON.stringify(newItems));
  return newItems;
};

export const setMockData = () => {
  localStorage.setItem(storageKey, JSON.stringify(dataSource));
};
