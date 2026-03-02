import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "프로필 — NAVIFACT",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProfileClient userId={id} />;
}
