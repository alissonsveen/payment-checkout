export interface User extends UserAddress {
  id: string
  email: string
  name: string
  phone: string
  cpf: string
  createdAt: string | Date
}

export interface UserAddress {
  street: string
  number: string
  complement?: string
  city: string
  state: string
  zipCode: string
  neighborhood: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  cpf: string
}
