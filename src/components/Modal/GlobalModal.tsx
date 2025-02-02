import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useCompanies } from "../../hooks/useComaies";

const CompanyModal = ({ visible, onClose, editingCompany }:any) => {
  const { createCompany, updateCompany } = useCompanies();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(editingCompany || { name: "", count: 0 });
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
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Название компании" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="count" label="Количество сотрудников" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyModal;
