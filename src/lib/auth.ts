import { LoginData, RegisterData, UserAddress } from "@/types/user"

const mockUsers: Array<{
  id: string
  name: string
  email: string
  password: string
  phone: string
  cpf: string
  createdAt: Date
  address: UserAddress
}> = [
  {
    id: "1",
    name: "Usuário Teste",
    email: "teste@teste.com",
    password: "123456",
    phone: "(99) 99999-9999",
    cpf: "000.000.000-00",
    address: {
      street: "Rua Exemplo",
      number: "123",
      complement: "Apto 1",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
    createdAt: new Date(),
  },
]

export async function mockLogin({ email, password }: LoginData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((user) => user.email === email)

  if (!user) {
    throw new Error("Email ou senha incorretos")
  }

  if (user.password !== password) {
    throw new Error("Email ou senha incorretos")
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    cpf: user.cpf ?? "",
    ...user.address,
    createdAt: user.createdAt,
  }
}

export async function mockRegister({
  name,
  email,
  password,
  phone,
  address,
  cpf,
}: Omit<RegisterData, "confirmPassword"> & {
  address: UserAddress
  cpf: string
}) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const existingUser = mockUsers.find((user) => user.email === email)
  if (existingUser) {
    throw new Error("Este email já está cadastrado")
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    phone,
    cpf,
    address,
    createdAt: new Date(),
  }

  mockUsers.push(newUser)

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    cpf: newUser.cpf,
    ...newUser.address,
    createdAt: newUser.createdAt,
  }
}
