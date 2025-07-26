import { ITableData } from "@/types/ITableData";

export const tableSearch = (
  data: ITableData[],
  searchQuery: string
): ITableData[] =>
  data.filter(
    (item) =>
      item.name.includes(searchQuery) ||
      item.age.toString().includes(searchQuery) ||
      item.date.format("YYYY-MM-DD").includes(searchQuery)
  );
