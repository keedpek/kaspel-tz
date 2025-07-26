import { ITableData } from "./ITableData";
import { ModalMode } from "./ModalMode";

export interface IModalFormProps {
  mode: ModalMode;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (item: ITableData) => void;
  initialValues?: ITableData;
}
