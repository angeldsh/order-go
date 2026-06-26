export interface Rol {
  map?(arg0: (role: any) => any): string[];
  id?: number;
 name: string;
}