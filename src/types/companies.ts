export interface CompaniesTs {
    id:string,
    name:string,
    count:number
    setName: (val: string) => void;
    setCount: (val: number) => void;
} 

export interface CompanyModalProps {
    visible: boolean;
    onClose: () => void;
    editingCompany: CompaniesTs | null; // Agar modal tahrir qilishda bo'lsa, bu qiymat mavjud bo'ladi
  }