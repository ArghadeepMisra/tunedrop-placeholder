import Link from "next/link";
import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";
import WhatsAppBubble from "@/components/ui/whatsapp-bubble";
import TiltBox from "@/components/ui/tilt-box";

export default function Sharing() {
  return (
    <Section>
      <SplitLayout
        reverse
        left={
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Share anywhere.{" "}
              <span className="text-brand">Look good everywhere.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Every Tunedrop link renders a rich preview on WhatsApp, Twitter,
              Discord, and iMessage: cover art, title, creator name. Your music
              makes a first impression before anyone even taps.
            </p>
          </ScrollReveal>
        }
        right={
          <ScrollReveal animation="fadeLeft" delay={0.15} duration={0.7}>
            <Link href="/features/sharing" className="block group">
              <TiltBox defaultRotateY={10}>
                <div className="w-full max-w-lg">
                  <WhatsAppBubble />
                  <p className="text-green-400 text-xs text-center mt-4 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all">click to view</p>
                </div>
              </TiltBox>
            </Link>
          </ScrollReveal>
        }
      />
    </Section>
  );
}
