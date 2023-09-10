import { Categories } from "@/components/categories";
import { SearchInput } from "@/components/search-input";
import db from "@/lib/db";

const RootPage = async () => {
  const categories = await db.category.findMany();

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
