import { apiClient } from "@/lib/apiClient";
import { User } from "@/types";
import { notFound } from "next/navigation";
import ProfileEditForm from "@/components/ProfileEditForm";

export default async function ProfileEditPage() {
  const user = await apiClient<User>("/profile", {
    cache: "no-store",
  }).catch(() => {
    notFound();
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <ProfileEditForm initialData={user} />
      </div>
    </div>
  );
}
