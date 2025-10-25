'use client';

import Silk from '@/components/Silk';
import GlassSurface from '@/components/GlassSurface';
import Link from 'next/link';
import dynamic from 'next/dynamic';


const DomeGallery = dynamic(() => import('@/components/DomeGallery'), {
  ssr: false,
});

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
      </div>

      {/* Navbar */}
      <div className="w-full flex justify-center pt-6 z-50 transition-all duration-700">
        <GlassSurface
          width="90%"
          height={56}
          borderRadius={28}
          backgroundOpacity={0.15}
          blur={12}
          saturation={1.2}
          brightness={55}
          opacity={0.92}
          className="relative flex items-center justify-center backdrop-blur-md"
        >
          {/* Left Badge */}
          <div className="absolute left-6 flex items-center gap-2">
            <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-black font-bold">
              λ
            </div>
            <span className="font-medium text-sm tracking-wide text-white/90">
              Gallery
            </span>
          </div>

          <nav className="text-sm font-medium text-white/90">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
          </nav>
        </GlassSurface>
      </div>

      {/* Canvas gallery */}
      <section className="w-full max-w-[1400px] px-4 mt-6 mb-10">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div style={{ width: '100%', height: '82vh' }}>
            <DomeGallery
              fit={0.8}
              minRadius={800}
              maxVerticalRotationDeg={10}
              segments={34}
              dragDampening={3.6}
              grayscale={false}
              overlayBlurColor="rgba(10,10,12,0.55)"
              imageBorderRadius="22px"
              openedImageBorderRadius="22px"
              padFactor={0.06}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
