import db from "@/lib/db";
import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await db.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
