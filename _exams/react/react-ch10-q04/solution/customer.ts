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
  const base = `${customer.name}（${customer.address.city} ${customer.address.zip}）`;
  if (customer.email === undefined) {
    return base;
  }
  return `${base} <${customer.email}>`;
}
