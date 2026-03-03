import ProjectEditForm from "@/components/ProjectForm";

export default async function NewPage({}) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <ProjectEditForm />
      </div>
    </div>
  );
}
