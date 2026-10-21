export type Address = {
  city: string;
  zip: string;
};

export type Customer = {
  name: string;
  address: Address;
  email?: string;
};

export function describeCustomer(customer: Customer): string {
  // TODO: 有 email 時要接在後面
  return `${customer.name}（${customer.address.city} ${customer.address.zip}）`;
}
