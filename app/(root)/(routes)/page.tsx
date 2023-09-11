import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import db from "@/lib/db";

// Searchparams will automatically get all the server component
interface RootPageProps {
  searchParams: {
    name: string;
    categoryId: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await db.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await db.category.findMany();

  return (
    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
