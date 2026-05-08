import Hero from "@/components/sections/Hero";
import Feed from "@/components/sections/Feed";
import PostTypes from "@/components/sections/PostTypes";
import Sharing from "@/components/sections/Sharing";
import StreamingApps from "@/components/sections/StreamingApps";
import FinalCTA from "@/components/sections/FinalCTA";
import PageLoader from "@/components/ui/page-loader";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white w-full overflow-x-hidden">
      <PageLoader />
      <Hero />
      <Feed />
      <PostTypes />
      <Sharing />
      <StreamingApps />
      <FinalCTA />
    </main>
  );
}
