import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Company {
  id: string;
  name: string;
  count: number;
}

const Companies = () => {
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [compData, setCompData] = useState({
    name: '',
    count: 0
  });
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjAxOTRjMjcwLTE4MjUtNzUyNy1hYjQ2LTRjMzNiNDdjY2NhMyIsIm5iZiI6MTczODQzNTIzMCwiZXhwIjoxNzU0MDczNjMwLCJpYXQiOjE3Mzg0MzUyMzAsImlzcyI6IkVtYWlsZ3JhbS1iYXNlIiwiYXVkIjoiRW1haWxncmFtIn0.pISuU7EHcjkBVtJRmb1rO38Jo4lnszAPsFSa4mbDSLw'; // Tokenni to'g'ri joyga qo'ying

  const { data } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const res = await axios.get('http://45.138.158.137:92/api/companies/get-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res.data;
    }
  });

  const queryClient = useQueryClient();

  // Delete company
  const DeleteFunc = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete('http://45.138.158.137:92/api/companies/delete', { data: { id } });
      return id;
    },
    onSuccess: (deletedId: string) => {
      alert('Company deleted');
      removeComp(deletedId);
    }
  });

  const removeComp = (id: string) => {
    queryClient.setQueryData(['companies'], (oldData: any) => {
      if (!oldData) return;
      return oldData.filter((item: { id: string }) => item.id !== id);
    });
  };

  // Create company
  const CreateComp = useMutation({
    mutationFn: async (newcomp: { name: string, count: number }) => {
      const res = await axios.post('http://45.138.158.137:92/api/companies/add', newcomp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (addedComp) => {
      queryClient.setQueryData(['companies'], (oldComp: any[]) => {
        if (!oldComp) return [addedComp];
        return [...oldComp, addedComp];
      });
      setCompData({ name: "", count: 0 });
    }
  });

  // Update company
  const UpdateComp = useMutation({
    mutationFn: async (updatedComp: Company) => {
      const res = await axios.put('http://45.138.158.137:92/api/companies/update', updatedComp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (updatedComp) => {
      queryClient.setQueryData(['companies'], (oldComp: any[]) => {
        if (!oldComp) return [updatedComp];
        return oldComp.map((comp) =>
          comp.id === updatedComp.id ? updatedComp : comp
        );
      });
      setEditingCompany(null); // Edit rejimiga qaytish
    }
  });

  const HandleSubmit = () => {
    if (editingCompany) {
      // Agar tahrir qilayotgan bo'lsa, update so'rovi yuboramiz
      UpdateComp.mutate({ ...editingCompany, name: compData.name, count: compData.count });
    } else {
      // Yangi kompaniya yaratish
      CreateComp.mutate(compData);
    }
  };

  const OnChangeINP = (e: any) => {
    const { name, value } = e.target;
    setCompData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Companies</h2>

      {/* Add or Edit company input */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={compData.name}
          onChange={OnChangeINP}
          placeholder="Enter company name"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <input
          type="number"
          name="count"
          value={compData.count}
          onChange={OnChangeINP}
          placeholder="Enter company count"
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <button
          onClick={HandleSubmit}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
        >
          {editingCompany ? "Update Company" : "Add Company"}
        </button>
      </div>

      {/* Companies Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Company Name</th>
            <th className="py-2 px-4 text-left">Count</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((company: Company) => (
            <tr key={company.id} className="border-t">
              <td className="py-2 px-4">{company.name}</td>
              <td className="py-2 px-4">{company.count}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => {
                    setEditingCompany(company);
                    setCompData({ name: company.name, count: company.count });
                  }}
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-colors mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteFunc.mutate(company.id)}
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Companies;
