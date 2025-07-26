import { ITableData } from "./ITableData";
import { ModalMode } from "./ModalMode";

export interface IModalState {
  mode: ModalMode;
  visible: boolean;
  initialValues?: ITableData;
}
