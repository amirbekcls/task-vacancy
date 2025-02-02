import axios from "axios";
import { config } from "../config";
import { AddCompApi, DeleteCompApi, EditCompApi, GetAll } from "../api/api";


export const companyService = {
  getAll: async () => {
    const res = await axios.get(GetAll, config);
    console.log(res.data);
    
    return res.data;
  },

  create: async (newComp: { name: string; count: number }) => {
    const res = await axios.post(AddCompApi, newComp, config);
    return res.data;
  },

  update: async (updatedComp: { id: string; name: string; count: number }) => {
    const res = await axios.put(EditCompApi, updatedComp, config);
    return res.data;
  },

  delete: async (id: string) => {
    await axios.delete(DeleteCompApi, {
      ...config,
      data: JSON.stringify(id),
    });
    return id;
  },
};
