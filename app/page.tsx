import { Product, Filter } from './components/clientComponent';
import ClientComponent from './components/clientComponent';

export async function fetchProducts(filters: Filter): Promise<Product[]> {
  const response = await fetch('https://flipakartworking.onrender.com/api/printers/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  const result = await response.json();
  return result.data || [];
}
const Page = async () => {
  const filters: Filter = {}
  const initialData = await fetchProducts(filters);
  return (
    <ClientComponent initialData={initialData} initialFilters={filters} />
  );
};

export default Page;
