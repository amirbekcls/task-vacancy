import { useState } from "react";
import { Button, Table, Dropdown, Menu, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "../../hooks/useComaies";
import CompanyModal from "../../components/Modal/GlobalModal";

const Companies = () => {
  const { data, isLoading, deleteCompany } = useCompanies();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const navigate = useNavigate();

  const openAddModal = () => {
    setEditingCompany(null); 
    setIsModalVisible(true);
  };

  const openEditModal = (company:any) => {
    setEditingCompany(company);
    setIsModalVisible(true);
  };

  const handleMenuClick = (e:any, company:any) => {
    if (e.key === "edit") {
      openEditModal(company);
    } else if (e.key === "delete") {
      deleteCompany.mutate(company.id);
    }
  };

  const menu = (company:any) => (
    <Menu onClick={(e) => handleMenuClick(e, company)}>
      <Menu.Item key="edit" icon={<MdEdit />}>Изменить</Menu.Item>
      <Menu.Item key="delete" danger icon={<MdDelete />}>Удалить</Menu.Item>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-white w-full">
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-medium">Компании</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/login')}><BiLogOutCircle size={30} /></button>
          <Button type="primary" onClick={openAddModal}>Добавить компанию</Button>
        </div>
      </header>

      <div className="p-5">
        <Table
          columns={[
            { title: "Название", dataIndex: "name", key: "name" },
            { title: "Сотрудники", dataIndex: "count", key: "count" },
            {
              title: "Действия",
              key: "action",
              render: (_, record) => (
                <Dropdown overlay={menu(record)} trigger={["click"]}>
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              ),
            },
          ]}
          dataSource={data || []}
          pagination={false}
          className="border rounded-lg"
          scroll={{ x: true }}
          loading={isLoading}
        />
      </div>

      <CompanyModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        editingCompany={editingCompany}
      />
    </div>
  );
};

export default Companies;
