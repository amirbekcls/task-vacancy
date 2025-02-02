import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useCompanies } from "../../hooks/useComaies";
import { CompanyModalProps } from "../../types/companies";

const CompanyModal:React.FC<CompanyModalProps> = ({ visible, onClose, editingCompany }) => {
  const { createCompany, updateCompany } = useCompanies();
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCompany) {
      form.setFieldsValue(editingCompany);
    } else {
      form.resetFields();
    }
  }, [editingCompany, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingCompany) {
        updateCompany.mutate({ ...editingCompany, ...values });
      } else {
        createCompany.mutate(values);
        
      }
      onClose();
    });
  };

  return (
    <Modal
      title={editingCompany ? "Редактировать компанию" : "Добавить компанию"}
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText={editingCompany ? "Обновить" : "Добавить"}
      cancelText="Отмена"
      width={400}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Название" rules={[{ required: true, message: "Введите название" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="count" label="Сотрудники" rules={[{ required: true, message: "Введите количество" }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyModal;
