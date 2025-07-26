import { IModalFormProps } from "@/types/IModalFormProps";
import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { FC, useEffect } from "react";

const ModalForm: FC<IModalFormProps> = ({
  mode,
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (mode === "edit" && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, mode, visible]);

  return (
    <Modal
      title={mode === "add" ? "Добавление записи" : "Редактирование записи"}
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      okText={mode === "add" ? "Добавить" : "Сохранить"}
      cancelText="Отмена"
    >
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            { required: true, message: "Введите имя" },
            {
              validator(_, value) {
                if (value.length < 2 || value.length > 30) {
                  return Promise.reject(
                    "Длина имени должна быть от 2 до 30 символов"
                  );
                }

                if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
                  return Promise.reject("Имя может содержать только буквы");
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Дата"
          rules={[
            { required: true, message: "Введите дату" },
            {
              validator(_, value) {
                if (value && value.isAfter(moment())) {
                  return Promise.reject("Выберите прошедшую или текущую дату");
                }

                if (value && value.isBefore(moment().subtract(200, "years"))) {
                  return Promise.reject("Дата слишком старая");
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="age"
          label="Возраст"
          rules={[
            { required: true, message: "Введите возраст" },
            {
              validator(_, value) {
                if (value < 1 || value > 150) {
                  return Promise.reject("Возраст должен быть от 1 до 150 лет");
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
