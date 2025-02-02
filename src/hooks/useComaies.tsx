import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { companyService } from "../Services/companiesServecis";

export const useCompanies = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: companyService.getAll,
  });

  const createCompany = useMutation({
    mutationFn: companyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      message.success("Компания добавлена");
    },
  });

  const updateCompany = useMutation({
    mutationFn: companyService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      message.success("Компания обновлена");
    },
  });

  const deleteCompany = useMutation({
    mutationFn: companyService.delete,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["companies"], (oldData: any) =>
        oldData ? oldData.filter((item: any) => item.id !== deletedId) : []
      );
      message.success("Компания удалена");
    },
  });

  return {
    data,
    isLoading,
    error,
    createCompany,
    updateCompany,
    deleteCompany,
  };
};
