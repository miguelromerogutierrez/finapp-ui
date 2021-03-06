export interface AccountResponse {
  id: number,
  amount: string,
  amountRaw: number,
  alias: string,
  bankName: string,
  type: string
}

export interface UserResponse {
  id: number,
  email: string,
  username: string,
}