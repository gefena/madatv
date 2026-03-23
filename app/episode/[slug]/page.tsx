import { redirect } from "next/navigation";
import { EPISODE_SLUGS } from "@/lib/content";

export function generateStaticParams() {
  return EPISODE_SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EpisodeRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/series/life/episode/${slug}`);
}
