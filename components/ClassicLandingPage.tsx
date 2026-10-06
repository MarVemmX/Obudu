"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Users,
  CheckCircle2,
  X,
  ArrowRight,
  Play,
  Menu,
} from "lucide-react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ClassicLandingPageProps {
  onSwitchToImmersive: () => void;
}

const PHOTO_GALLERY = [
  {
    title: "The 11km Serpentine Road",
    subtitle: "22 Hairpin Turns • Engineering Marvel of 1951",
    img: "/images/obudu road.jpg",
    ghibliImg: "/images/ghibli-road.jpg",
    elevation: "780m – 1,576m",
    desc: "Carved into sheer emerald cliffs of the Sankwala mountain range, the 11km mountain highway features signature white concrete barrier curb blocks guarding vertical drops overlooking rolling misty blue valleys.",
  },
  {
    title: "The Cattle Head Gateway",
    subtitle: "Sacred Highland Portal • Granite & Bronze",
    img: "/images/obudu entrance.jpg",
    ghibliImg: "/images/ghibli-entrance.jpg",
    elevation: "1,480m Elevation",
    desc: "The authentic entrance archway crowned by the sculpted Bull Head with magnificent horns, supported by dry-stone granite masonry pillars and rustic timber crossbeams welcoming travelers to the plateau.",
  },
  {
    title: "The Historic Ranch Village",
    subtitle: "Alpine Pastures & African Cableway",
    img: "/images/obudu.jpeg",
    ghibliImg: "/images/ghibli-village.jpg",
    elevation: "1,550m Elevation",
    desc: "Founded in 1951 by Scottish ranchers M. McCaughley and Hugh Jones. Gentle White Fulani cattle graze across lush meadows between chalets on stilts and Africa's longest aerial cableway overhead.",
  },
  {
    title: "Plateau Chalets on Stilts",
    subtitle: "Summit Lodges Overlooking Endless Horizons",
    img: "/images/obudu 2.webp",
    ghibliImg: "/images/ghibli-chalets.jpg",
    elevation: "1,576m Summit",
    desc: "Two-tier cedar and terracotta chalets elevated on black stilts with wrap-around balconies, catching the morning sunrise above rolling clouds and boundless violet-blue mountain ridges.",
  },
];

const RESORT_ACCOMMODATIONS = [
  {
    name: "Mountain View Chalet",
    tier: "Signature 2-Tier Lodge",
    img: "/images/obudu 2.webp",
    features: [
      "Elevated on black timber stilts with wrap-around veranda",
      "Panoramic views of the Cameroon mountain border",
      "Two-tier cedar hipped roof with clerestory loft",
      "Authentic volcanic stone hearth fireplace",
    ],
    price: "₦145,000",
    rateUnit: "per night",
  },
  {
    name: "Presidential Summit Villa",
    tier: "Executive Plateau Suite",
    img: "/images/obudu.jpeg",
    features: [
      "Private cliffside observation cloud deck",
      "Expansive 3-bedroom master highland residence",
      "Dedicated butler & private highland chef",
      "Unlimited Obudu Cable Car priority access",
    ],
    price: "₦320,000",
    rateUnit: "per night",
  },
  {
    name: "Honeycomb Stone Cottage",
    tier: "Heritage Granite Lodge",
    img: "/images/obudu entrance.jpg",
    features: [
      "Original 1951 dry-stone granite masonry",
      "Nestled adjacent to the highland pine grove",
      "Heated cedar flooring & mountain spring bath",
      "Complimentary Becheve nature reserve guide",
    ],
    price: "₦98,000",
    rateUnit: "per night",
  },
];

const ARCHIVAL_DISPATCHES = [
  {
    date: "14.05.1951",
    tag: "ARCHIVAL CHRONICLE",
    title: "The Scottish Ranchers & The McCaughley Pass",
    desc: "How M. McCaughley and Hugh Jones traversed the Sankwala ridges in 1951, introducing cattle ranching to the temperate high plateau of Cross River.",
  },
  {
    date: "22.10.2005",
    tag: "ENGINEERING MILESTONE",
    title: "Africa's Longest Cableway across Sankwala Peaks",
    desc: "Rising 870 vertical meters in a single continuous 4.0km aerial journey, linking the tropical base resort directly to the mountain summit in 25 minutes.",
  },
  {
    date: "PRESENT DAY",
    tag: "CONSERVATION & ECOLOGY",
    title: "Preserving the Endangered Highland Forest Canopy",
    desc: "The Becheve Nature Reserve shelters rare drill monkeys and alpine birds along its 100-meter elevated canopy suspension walkway.",
  },
];

export const ClassicLandingPage: React.FC<ClassicLandingPageProps> = ({
  onSwitchToImmersive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile nav toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Motto Video Showcase state
  const mottoVideoRef = useRef<HTMLVideoElement>(null);
  const [isMottoPlaying, setIsMottoPlaying] = useState(false);
  const [isMottoMuted, setIsMottoMuted] = useState(false);

  // Fullscreen Cinema Video Modal
  const [cinemaModalOpen, setCinemaModalOpen] = useState(false);

  // Booking Form State
  const [chaletType, setChaletType] = useState("Mountain View Chalet");
  const [checkInDate, setCheckInDate] = useState("2026-10-15");
  const [checkOutDate, setCheckOutDate] = useState("2026-10-18");
  const [guestsCount, setGuestsCount] = useState(2);
  const [includeCableCar, setIncludeCableCar] = useState(true);
  const [includeCanopyWalk, setIncludeCanopyWalk] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("OBUDU-842915");

  // ==========================================
  // GSAP SCROLL ANIMATIONS (Reveal & Reverse)
  // ==========================================
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Parallax Exit
      gsap.to(".hero-center-content", {
        y: -75,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 2. Specifications Bar Reveal & Reverse
      gsap.fromTo(
        ".spec-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".spec-strip",
            start: "top 92%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 3. The 11km Serpentine Pass ("Pure Elevation") Reveal & Reverse
      gsap.fromTo(
        ".pass-left-content",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#pass",
            start: "top 78%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".pass-right-image",
        { x: 60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#pass",
            start: "top 75%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 4. Motto Section ("Nulla Tenaci Invia Est Via") Reveal & Reverse
      gsap.fromTo(
        ".motto-content",
        { y: 40, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".motto-section",
            start: "top 75%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".motto-video-box",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".motto-video-box",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 5. THE OBUDU HERITAGE SECTION: Dramatic Reveal on Scroll & Reverse on Scroll Out
      const heritageTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#heritage",
          start: "top 78%",
          end: "bottom 12%",
          toggleActions: "play reverse play reverse",
        },
      });

      heritageTl
        .fromTo(
          ".heritage-photo-left",
          { x: -80, opacity: 0, scale: 0.92 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".heritage-center-block",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.9"
        )
        .fromTo(
          ".heritage-photo-right",
          { x: 80, opacity: 0, scale: 0.92 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=1.0"
        );

      // Parallax scroll on Heritage images
      gsap.to(".heritage-drift-up", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: "#heritage",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".heritage-drift-down", {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: "#heritage",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 6. Chalets on Stilts Stagger Reveal & Reverse
      gsap.fromTo(
        ".chalet-card",
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#chalets",
            start: "top 72%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 7. Dual Photo References (Archival vs Ghibli) Reveal & Reverse
      gsap.fromTo(
        ".comparison-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.22,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".comparison-section",
            start: "top 75%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 8. Dispatches Grid Reveal & Reverse
      gsap.fromTo(
        ".dispatch-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#dispatches",
            start: "top 75%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleMottoPlay = () => {
    if (mottoVideoRef.current) {
      if (mottoVideoRef.current.paused) {
        mottoVideoRef.current.play();
        setIsMottoPlaying(true);
      } else {
        mottoVideoRef.current.pause();
        setIsMottoPlaying(false);
      }
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingRef(`OBUDU-${Math.floor(100000 + Math.random() * 900000)}`);
    setBookingConfirmed(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.65 },
        colors: ["#D99B35", "#527048", "#BC5439", "#FAF6EC", "#4A8237"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-[#111111] selection:bg-black selection:text-white font-sans overflow-x-hidden"
    >
      {/* ========================================================= */}
      {/* 1. TOP HEADER (LOGO EXACTLY IN THE MIDDLE)                 */}
      {/* ========================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-white px-4 sm:px-8 md:px-12 xl:px-14 py-3.5 sm:py-4 md:py-5 transition-all">
        <div className="max-w-7xl mx-auto relative flex items-center justify-between min-h-[44px]">
          {/* Mobile Brand Wordmark: Left-aligned on mobile/tablet so it never collides with buttons */}
          <div className="flex lg:hidden flex-col items-start z-20">
            <a
              href="#"
              className="font-display-ghibli text-lg sm:text-xl font-bold tracking-[0.28em] text-white uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              OBUDU
            </a>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#A69778] mt-0.5 whitespace-nowrap">
              EST. 1951 • NIGERIA
            </span>
          </div>

          {/* Left: Quick Minimalist Editorial Links with generous right spacing from centered logo */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[10px] xl:text-[11px] font-mono uppercase tracking-[0.18em] xl:tracking-[0.22em] text-[#D0D0D0] z-10 pr-10 xl:pr-16 max-w-[420px] xl:max-w-[480px]">
            <a href="#pass" className="hover:text-white transition-colors whitespace-nowrap">
              The 11km Pass
            </a>
            <a href="#gateway" className="hover:text-white transition-colors whitespace-nowrap">
              The Gateway
            </a>
            <a href="#heritage" className="hover:text-white transition-colors whitespace-nowrap">
              Heritage
            </a>
            <a href="#chalets" className="hover:text-white transition-colors whitespace-nowrap">
              Chalets
            </a>
            <a href="#dispatches" className="hover:text-white transition-colors whitespace-nowrap">
              Dispatches
            </a>
          </nav>

          {/* Center: Brand Wordmark (Mathematically centered on desktop with ample breathing room on left) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex-col items-center text-center z-20 pointer-events-auto">
            <a
              href="#"
              className="font-display-ghibli text-xl xl:text-2xl font-bold tracking-[0.35em] text-white uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              OBUDU
            </a>
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#A69778] mt-0.5 whitespace-nowrap">
              EST. 1951 • NIGERIA
            </span>
          </div>

          {/* Right: Sharp Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-4 ml-auto z-10">
            <a
              href="#booking"
              className="hidden sm:inline-block border border-white/60 px-4 xl:px-5 py-2 font-mono text-[9px] xl:text-[10px] uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition-all rounded-none font-semibold whitespace-nowrap"
            >
              Reservations
            </a>

            <button
              onClick={onSwitchToImmersive}
              className="border border-[#D99B35] bg-[#D99B35] text-black px-3.5 sm:px-5 py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold hover:bg-transparent hover:text-[#D99B35] transition-all rounded-none cursor-pointer whitespace-nowrap"
              title="Launch the interactive Studio Ghibli scrollytelling car drive"
            >
              <span className="hidden sm:inline">Immersive Drive</span>
              <span className="sm:hidden">Drive</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#D99B35] transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3.5 pt-4 border-t border-white/10 flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white bg-black/40 backdrop-blur-md px-2 pb-2">
            <a
              href="#pass"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#D99B35] transition-colors"
            >
              The 11km Pass
            </a>
            <a
              href="#gateway"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#D99B35] transition-colors"
            >
              The Gateway
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#D99B35] transition-colors"
            >
              Heritage
            </a>
            <a
              href="#chalets"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#D99B35] transition-colors"
            >
              Chalets
            </a>
            <a
              href="#dispatches"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#D99B35] transition-colors"
            >
              Dispatches
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#D99B35]"
            >
              Reservations
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSwitchToImmersive();
              }}
              className="py-2.5 text-left text-[#D99B35] font-bold border-t border-white/10 mt-1 uppercase tracking-[0.25em] flex items-center justify-between cursor-pointer"
            >
              <span>Interactive Drive</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HERO: PRISTINE CINEMATIC REVEAL (Frames 00:07 - 00:11) */}
      {/* Zero clutter, no AI pills, sharp-edge rectangular CTA     */}
      {/* ========================================================= */}
      <section className="hero-section relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Full-bleed Authentic Background Video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/obudu 2.webp"
            className="w-full h-full object-cover opacity-60 scale-100"
          >
            <source src="/videos/obudu-hero.mp4" type="video/mp4" />
            <source src="/videos/obudu hero.mp4" type="video/mp4" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/obudu 2.webp"
              alt="Obudu Mountain Resort Chalets on Stilts"
              className="w-full h-full object-cover opacity-60"
            />
          </video>
          {/* Subtle dark gradient scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Hero Center Editorial Content */}
        <div className="hero-center-content relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-[#D99B35] font-semibold mb-4">
            THE BEGINNING OF 1951
          </div>

          <h1 className="font-display-ghibli text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white max-w-5xl leading-[1.05]">
            The Next Chapter of Obudu
          </h1>

          <p className="font-serif-ghibli italic text-lg sm:text-xl md:text-2xl text-[#E8DCC4] max-w-2xl mt-5 leading-relaxed">
            Perched 1,576 meters above the clouds on the Sankwala Plateau.
          </p>

          {/* Sharp Edge Rectangular Buttons with refined sizing and mobile responsiveness */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#pass"
              className="inline-block border border-[#D99B35] bg-[#D99B35] text-[#08120A] hover:bg-[#E5A842] hover:border-[#E5A842] font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold px-6 py-3 sm:px-7 sm:py-3.5 transition-all duration-300 rounded-none shadow-xl cursor-pointer text-center w-full sm:w-auto"
            >
              Discover the Highland Sanctuary
            </a>

            <button
              onClick={() => setCinemaModalOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 border border-white/70 bg-black/50 text-white hover:bg-white hover:text-black font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold px-5 py-3 sm:px-6 sm:py-3.5 transition-all duration-300 rounded-none cursor-pointer backdrop-blur-sm text-center w-full sm:w-auto"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#D99B35] group-hover:text-black transition-colors" />
              <span>Watch Aerial Film</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MINIMALIST SPECIFICATION STRIP (Automotive Tech Spec)  */}
      {/* ========================================================= */}
      <section className="spec-strip bg-[#080E09] border-y border-white/10 text-white py-8 px-6 md:px-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="spec-card border-l border-white/15 pl-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A69778] font-semibold">
              Summit Elevation
            </div>
            <div className="font-display-ghibli text-2xl font-bold text-white mt-1">
              1,576 M
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">Sankwala Mountain Range</div>
          </div>

          <div className="spec-card border-l border-white/15 pl-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A69778] font-semibold">
              Mountain Pass
            </div>
            <div className="font-display-ghibli text-2xl font-bold text-white mt-1">
              22 Bends
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">11km Serpentine Highway</div>
          </div>

          <div className="spec-card border-l border-white/15 pl-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A69778] font-semibold">
              Aerial Cableway
            </div>
            <div className="font-display-ghibli text-2xl font-bold text-white mt-1">
              4.0 KM
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">Longest in Africa</div>
          </div>

          <div className="spec-card border-l border-white/15 pl-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#A69778] font-semibold">
              Micro-Climate
            </div>
            <div className="font-display-ghibli text-2xl font-bold text-white mt-1">
              15°C – 23°C
            </div>
            <div className="text-[11px] text-white/50 mt-0.5">Temperate Sub-Alpine</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. ASYMMETRIC EDITORIAL: "PURE PASSION" / THE 11KM PASS    */}
      {/* ========================================================= */}
      <section id="pass" className="py-28 md:py-36 px-6 md:px-14 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Architectural Detail */}
          <div className="pass-left-content lg:col-span-5 space-y-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C5E28] font-bold">
                THE ALLURE OF 1951
              </div>
              <h2 className="font-display-ghibli text-4xl sm:text-5xl font-bold text-black tracking-tight uppercase mt-2 leading-[1.08]">
                Pure Elevation
              </h2>
            </div>

            <p className="text-sm md:text-base text-[#333333] leading-relaxed">
              Carved into the sheer emerald cliffs of the Sankwala mountain range, the 11km mountain highway is an engineering marvel initiated in 1951. Twenty-two hairpin bends rise dramatically from tropical savanna into pristine alpine mists.
            </p>

            <p className="text-sm md:text-base text-[#333333] leading-relaxed">
              Interlocking white concrete rim guardblocks line the exterior precipices, offering daring panoramic vantage points where rolling blue ridges fade infinitely into cloud inversions.
            </p>

            {/* Inset Detail Photography Card (Sharp Edges rounded-none) */}
            <div id="gateway" className="pt-4">
              <div className="border border-[#E5E5E5] bg-white rounded-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/obudu entrance.jpg"
                  alt="Dry-Stone Granite Gateway"
                  className="w-full h-64 object-cover rounded-none"
                />
                <div className="p-5 border-t border-[#E5E5E5]">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C5E28] font-bold">
                    Granite Masonry Portal
                  </div>
                  <div className="text-xs text-[#555555] mt-1.5 leading-relaxed">
                    Authentic dry-stone granite pillars and sculpted bull-head archway at 1,480m elevation welcoming travelers above the clouds.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Hero Image with Editorial Caption */}
          <div className="pass-right-image lg:col-span-7 space-y-4">
            <div className="border border-[#E5E5E5] bg-black rounded-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/obudu road.jpg"
                alt="The 11km Serpentine Road authentic archival photography"
                className="w-full h-[520px] md:h-[620px] object-cover rounded-none"
              />
            </div>

            <p className="font-mono text-xs text-[#666666] leading-relaxed max-w-xl">
              Devil&apos;s Elbow Pass • Hairpin Turn 14 • 1,220m Elevation Above Sea Level. Signature white concrete barrier curb blocks guard vertical drops overlooking rolling misty valleys.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. STATEMENT BANNER: "NULLA TENACI INVIA EST VIA"         */}
      {/* ========================================================= */}
      <section className="motto-section bg-black text-white py-32 px-6 md:px-14 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#D99B35] font-semibold">
            THE OBUDU CREED • EST. 1951
          </div>

          <div className="motto-content space-y-4">
            <h2 className="font-display-ghibli text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.08em] text-white uppercase leading-tight">
              Nulla Tenaci Invia Est Via
            </h2>

            <p className="font-serif-ghibli italic text-xl sm:text-2xl md:text-3xl text-[#E8DCC4] max-w-3xl mx-auto">
              “For the tenacious, no mountain road is impassable.”
            </p>

            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#888888]">
              Sankwala Ridge • Elevation 1,576m • Cross River State Highlands
            </p>
          </div>

          {/* Cinematic Video Player Showcase Box (Modeled on Spyker's Frame 00:20) */}
          <div className="motto-video-box mt-14 relative border border-white/20 shadow-2xl max-w-4xl mx-auto bg-black aspect-video rounded-none">
            <video
              ref={mottoVideoRef}
              loop
              playsInline
              muted={isMottoMuted}
              poster="/images/obudu 2.webp"
              className="w-full h-full object-cover rounded-none"
            >
              <source src="/videos/obudu-hero.mp4" type="video/mp4" />
              <source src="/videos/obudu hero.mp4" type="video/mp4" />
            </video>

            {/* Video overlay controls & sharp play button */}
            {!isMottoPlaying && (
              <div
                onClick={toggleMottoPlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/20"
              >
                <div className="border border-white bg-black/70 text-white px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] font-semibold rounded-none hover:bg-white hover:text-black transition-all flex items-center gap-3">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play Aerial Film</span>
                </div>
              </div>
            )}

            {isMottoPlaying && (
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-black/80 border border-white/20 px-4 py-2 text-xs text-white rounded-none">
                <button
                  onClick={toggleMottoPlay}
                  className="hover:text-[#D99B35] transition-colors cursor-pointer uppercase font-mono text-[10px] tracking-wider"
                >
                  Pause
                </button>
                <span className="text-white/30">|</span>
                <button
                  onClick={() => {
                    if (mottoVideoRef.current) {
                      mottoVideoRef.current.muted = !isMottoMuted;
                      setIsMottoMuted(!isMottoMuted);
                    }
                  }}
                  className="hover:text-[#D99B35] transition-colors cursor-pointer uppercase font-mono text-[10px] tracking-wider"
                >
                  {isMottoMuted ? "Unmute" : "Mute"}
                </button>
                <span className="text-white/30">|</span>
                <button
                  onClick={() => setCinemaModalOpen(true)}
                  className="hover:text-[#D99B35] transition-colors cursor-pointer uppercase font-mono text-[10px] tracking-wider"
                >
                  Fullscreen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. THE HERITAGE ARCHIVES: "SINCE 1951"                      */}
      {/* Reveal on scroll in, Reverse on scroll out                 */}
      {/* ========================================================= */}
      <section id="heritage" className="py-28 md:py-36 px-6 md:px-14 max-w-7xl mx-auto bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Flanking Left Photo Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="heritage-photo-left heritage-drift-up border border-[#E5E5E5] h-60 relative rounded-none shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/obudu.jpeg"
                alt="Ranch Village Green 1951"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase tracking-wider rounded-none">
                Village Pastures
              </div>
            </div>

            <div className="heritage-photo-left heritage-drift-down border border-[#E5E5E5] h-60 relative rounded-none shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ghibli-village.jpg"
                alt="Ghibli Studio Rendition"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-[#D99B35] text-[9px] font-mono uppercase tracking-wider rounded-none">
                Ghibli Gouache
              </div>
            </div>
          </div>

          {/* Center Editorial Block */}
          <div className="heritage-center-block lg:col-span-6 text-center px-4 md:px-8 space-y-6">
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-[#8C5E28] font-bold">
              SINCE 1951
            </div>

            <h2 className="font-display-ghibli text-3xl sm:text-5xl font-bold text-black tracking-tight uppercase">
              The Obudu Heritage
            </h2>

            <p className="font-serif-ghibli italic text-base md:text-lg text-[#555555] leading-relaxed">
              Founded in 1951 by Scottish ranchers M. McCaughley and Hugh Jones. Gentle White Fulani cattle graze across high sub-alpine plateaus between authentic two-tier cedar chalets on stilts and Africa&apos;s longest aerial cableway.
            </p>

            <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
              From early horseback expeditions through the cloud forests to international mountain marathons, Obudu&apos;s history has always been shaped by human tenacity in harmony with primeval African ecology.
            </p>

            <div className="pt-4">
              <a
                href="#dispatches"
                className="inline-block border border-black text-black font-mono text-[11px] uppercase tracking-[0.3em] font-semibold px-8 py-3.5 hover:bg-black hover:text-white transition-all rounded-none"
              >
                Explore Obudu Archives
              </a>
            </div>
          </div>

          {/* Flanking Right Photo Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="heritage-photo-right heritage-drift-up border border-[#E5E5E5] h-60 relative rounded-none shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/obudu 2.webp"
                alt="Summit Chalets on Stilts"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase tracking-wider rounded-none">
                Summit Chalets
              </div>
            </div>

            <div className="heritage-photo-right heritage-drift-down border border-[#E5E5E5] h-60 relative rounded-none shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ghibli-chalets.jpg"
                alt="Ghibli Studio Chalets"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-[#D99B35] text-[9px] font-mono uppercase tracking-wider rounded-none">
                Ghibli Gouache
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. ACCOMMODATIONS: CHALETS ON STILTS                       */}
      {/* ========================================================= */}
      <section id="chalets" className="py-28 px-6 md:px-14 bg-[#FAF9F6] border-y border-[#EAE8E2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#8C5E28] font-bold">
              PLATEAU SUMMIT LODGES • ELEVATION 1,576M
            </div>
            <h2 className="font-display-ghibli text-3xl sm:text-5xl font-bold text-black tracking-tight uppercase">
              Highland Chalets on Stilts
            </h2>
            <p className="font-serif-ghibli italic text-base md:text-lg text-[#666666]">
              Inspired by the authentic aerial vista of the high plateau chalets
            </p>
            <p className="text-xs md:text-sm text-[#555555] max-w-xl mx-auto">
              Perched on black stilts along the plateau ridge, each chalet features wrap-around balconies overlooking endless blue mountain ranges that melt into the misty horizon.
            </p>
          </div>

          {/* Chalet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESORT_ACCOMMODATIONS.map((chalet, idx) => (
              <div
                key={idx}
                className="chalet-card bg-white border border-[#E5E5E5] flex flex-col justify-between rounded-none shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="h-60 overflow-hidden relative border-b border-[#E5E5E5] rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={chalet.img}
                      alt={chalet.name}
                      className="w-full h-full object-cover rounded-none"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded-none">
                      {chalet.tier}
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="font-display-ghibli text-xl font-bold text-black">
                      {chalet.name}
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-xs text-[#555555]">
                      {chalet.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E28] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <div className="pt-5 border-t border-[#EAE8E2] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] text-[#8C5E28] uppercase font-bold tracking-wider">
                        Rates From
                      </div>
                      <div className="font-display-ghibli text-lg font-bold text-black">
                        {chalet.price}{" "}
                        <span className="text-[10px] font-normal text-[#666666]">
                          {chalet.rateUnit}
                        </span>
                      </div>
                    </div>
                    <a
                      href="#booking"
                      onClick={() => setChaletType(chalet.name)}
                      className="border border-black bg-black text-white hover:bg-transparent hover:text-black font-mono text-[11px] uppercase tracking-[0.25em] px-6 py-2.5 transition-all rounded-none font-semibold"
                    >
                      Reserve
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ARCHIVES VS GHIBLI DUAL REFERENCE                      */}
      {/* ========================================================= */}
      <section className="comparison-section py-28 px-6 md:px-14 max-w-7xl mx-auto bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#8C5E28] font-bold">
            ARCHIVAL RECORDS & STUDIO GHIBLI VISION
          </div>
          <h2 className="font-display-ghibli text-3xl sm:text-5xl font-bold text-black tracking-tight uppercase">
            Authentic Photo References
          </h2>
          <p className="font-serif-ghibli italic text-base md:text-lg text-[#666666]">
            See how each historical photograph translates into our Studio Ghibli gouache world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PHOTO_GALLERY.map((item, idx) => (
            <div
              key={idx}
              className="comparison-card bg-white border border-[#E5E5E5] p-6 flex flex-col justify-between rounded-none shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display-ghibli text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="font-serif-ghibli italic text-xs text-[#777777]">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] px-2.5 py-1 bg-black text-white rounded-none">
                    {item.elevation}
                  </span>
                </div>

                {/* Side-by-Side Dual Photos (Sharp Edges) */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="border border-[#E5E5E5] relative h-48 rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={`${item.title} Real Photo`}
                      className="w-full h-full object-cover rounded-none"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-white text-[8px] font-mono uppercase tracking-wider rounded-none">
                      Authentic 1951
                    </div>
                  </div>

                  <div className="border border-[#E5E5E5] relative h-48 rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.ghibliImg}
                      alt={`${item.title} Ghibli Artwork`}
                      className="w-full h-full object-cover rounded-none"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black text-[#D99B35] text-[8px] font-mono uppercase tracking-wider rounded-none">
                      Studio Ghibli
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EAE8E2] flex justify-end">
                <button
                  onClick={onSwitchToImmersive}
                  className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black hover:text-[#D99B35] transition-colors cursor-pointer"
                >
                  <span>Experience in Ghibli Drive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. EDITORIAL DISPATCHES: 3-COLUMN NEWS & ARCHIVES          */}
      {/* ========================================================= */}
      <section id="dispatches" className="py-24 px-6 md:px-14 bg-[#F7F6F2] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#8C5E28] font-bold">
                CHRONICLES & DISPATCHES
              </div>
              <h2 className="font-display-ghibli text-3xl sm:text-4xl font-bold text-black tracking-tight uppercase mt-1">
                Highland Press & Chronicles
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARCHIVAL_DISPATCHES.map((item, idx) => (
              <div
                key={idx}
                className="dispatch-card bg-white p-8 border border-[#E5E5E5] flex flex-col justify-between rounded-none shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8C5E28] pb-3 border-b border-[#F0EFEB]">
                    <span>{item.date}</span>
                    <span className="uppercase tracking-wider font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display-ghibli text-lg font-bold text-black mt-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed mt-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F0EFEB] text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C5E28] font-bold">
                  Read Dispatch →
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#booking"
              className="inline-block border border-black text-black font-mono text-[11px] uppercase tracking-[0.3em] px-8 py-3.5 hover:bg-black hover:text-white transition-all rounded-none font-semibold"
            >
              View All Dispatches
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. RESERVATION SANCTUARY: LUXURY RESERVATION BANNER       */}
      {/* ========================================================= */}
      <section
        id="booking"
        className="relative py-28 px-6 md:px-14 overflow-hidden bg-black text-white"
      >
        {/* Background Image with Dark Scrim */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/obudu.jpeg"
            alt="Obudu Plateau background"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-[#0D140E]/95 border border-white/20 p-5 sm:p-8 md:p-14 text-white rounded-none shadow-2xl">
            {!bookingConfirmed ? (
              <>
                <div className="text-center mb-6 sm:mb-8 space-y-2">
                  <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#D99B35] font-semibold">
                    EXCLUSIVE HIGHLAND RESERVATION
                  </div>
                  <h2 className="font-display-ghibli text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">
                    Reserve Your Plateau Sanctuary
                  </h2>
                  <p className="font-serif-ghibli italic text-xs sm:text-sm md:text-base text-[#D0C5B0] max-w-xl mx-auto">
                    Experience authentic cedar chalets on stilts with volcanic stone fireplaces overlooking the clouds.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99B35] font-bold mb-1.5 sm:mb-2">
                      Select Chalet Lodge
                    </label>
                    <select
                      value={chaletType}
                      onChange={(e) => setChaletType(e.target.value)}
                      className="w-full bg-[#141F16] border border-white/20 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-white rounded-none"
                    >
                      <option value="Mountain View Chalet">
                        Mountain View Chalet (2-Tier Cedar Lodge on Stilts)
                      </option>
                      <option value="Presidential Summit Villa">
                        Presidential Summit Villa (Panoramic Cloud Deck)
                      </option>
                      <option value="Honeycomb Stone Cottage">
                        Honeycomb Stone Cottage (Volcanic Hearth)
                      </option>
                      <option value="Governor's Heritage Suite">
                        Governor&apos;s Heritage Suite (Est. 1951)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
                    <div>
                      <label className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99B35] font-bold mb-1.5 sm:mb-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#D99B35]" /> Check In
                        </span>
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full bg-[#141F16] border border-white/20 px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-white font-medium focus:outline-none focus:border-white rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99B35] font-bold mb-1.5 sm:mb-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#D99B35]" /> Check Out
                        </span>
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full bg-[#141F16] border border-white/20 px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-white font-medium focus:outline-none focus:border-white rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99B35] font-bold mb-1.5 sm:mb-2">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-[#D99B35]" /> Guests
                        </span>
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-[#141F16] border border-white/20 px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-white font-medium focus:outline-none focus:border-white rounded-none"
                      >
                        <option value={1}>1 Guest (Solo Retreat)</option>
                        <option value={2}>2 Guests (Highland Couple)</option>
                        <option value={4}>4 Guests (Family Chalet)</option>
                        <option value={6}>6+ Guests (Full Villa)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-white/10 space-y-2.5 sm:space-y-3">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D99B35] font-bold">
                      Curated Highland Inclusions
                    </div>
                    <label className="flex items-start sm:items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeCableCar}
                        onChange={(e) => setIncludeCableCar(e.target.checked)}
                        className="rounded-none border-white/30 text-black focus:ring-0 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <span>Complimentary Obudu Cable Car Unlimited Pass (4.0km ride)</span>
                    </label>
                    <label className="flex items-start sm:items-center gap-2.5 text-xs text-[#CCCCCC] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeCanopyWalk}
                        onChange={(e) => setIncludeCanopyWalk(e.target.checked)}
                        className="rounded-none border-white/30 text-black focus:ring-0 mt-0.5 sm:mt-0 shrink-0"
                      />
                      <span>Becheve Nature Reserve & Canopy Walkway Guide</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-5 sm:mt-6 py-3.5 sm:py-4 px-4 sm:px-8 border border-white bg-white text-black hover:bg-transparent hover:text-white font-mono font-bold text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all rounded-none cursor-pointer"
                  >
                    Confirm Sanctuary Reservation
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto border border-white text-white flex items-center justify-center rounded-none">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display-ghibli text-3xl font-bold text-white uppercase">
                  Sanctuary Awaits You
                </h3>
                <p className="font-serif-ghibli text-base text-[#D0C5B0] max-w-md mx-auto leading-relaxed">
                  Your journey to the clouds is confirmed. A warm cedar fire and fresh highland cream tea are being prepared at {chaletType}.
                </p>
                <div className="bg-[#141F16] p-4 text-sm text-[#D99B35] font-mono border border-white/20 max-w-xs mx-auto rounded-none">
                  Booking Ref: {bookingRef}
                </div>
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D99B35] hover:text-white underline cursor-pointer"
                >
                  Modify Reservation
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. MINIMALIST LUXURY FOOTER (Spyker Footer Frame 00:28)  */}
      {/* ========================================================= */}
      <footer className="bg-white text-black py-20 px-6 md:px-14 border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Mark */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-display-ghibli text-2xl font-bold tracking-[0.35em] text-black uppercase">
              OBUDU
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C5E28]">
              Mountain Resort • Est. 1951
            </div>
            <p className="text-xs text-[#555555] leading-relaxed max-w-sm">
              Africa&apos;s legendary highland retreat perched 1,576 meters on the Sankwala Plateau. Experience the 11km pass, alpine meadows, and luxury chalets.
            </p>
          </div>

          {/* Navigation Columns (Modeled on Spyker Frame 00:29) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 font-mono text-xs uppercase tracking-[0.2em]">
            <div className="space-y-3">
              <div className="text-black font-bold text-[11px] mb-2">Sanctuary</div>
              <div><a href="#pass" className="text-[#666666] hover:text-black transition-colors">The 11km Pass</a></div>
              <div><a href="#gateway" className="text-[#666666] hover:text-black transition-colors">The Gateway</a></div>
              <div><a href="#chalets" className="text-[#666666] hover:text-black transition-colors">Chalets on Stilts</a></div>
              <div><a href="#heritage" className="text-[#666666] hover:text-black transition-colors">Heritage Pastures</a></div>
            </div>

            <div className="space-y-3">
              <div className="text-black font-bold text-[11px] mb-2">Experience</div>
              <div><a href="#booking" className="text-[#666666] hover:text-black transition-colors">Reservations</a></div>
              <div><a href="#dispatches" className="text-[#666666] hover:text-black transition-colors">Dispatches</a></div>
              <div>
                <button
                  onClick={onSwitchToImmersive}
                  className="text-[#8C5E28] hover:text-black transition-colors text-left uppercase"
                >
                  Ghibli Drive
                </button>
              </div>
            </div>
          </div>

          {/* Coordinates & Legal */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-black font-bold uppercase tracking-[0.2em] mb-2">
              Highland Coordinates
            </div>
            <div className="text-[#666666]">
              Obanliku Local Government Area, Cross River State, Nigeria
            </div>
            <div className="text-[#666666]">
              Coordinates: 9°22′N 9°15′E • Summit: 1,576m ASL
            </div>
            <div className="pt-2 text-[10px] text-[#999999]">
              © {new Date().getFullYear()} Obudu Mountain Resort. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 12. FULLSCREEN CINEMA MODAL (Sharp Edges)                 */}
      {/* ========================================================= */}
      {cinemaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8">
          <button
            onClick={() => setCinemaModalOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-3 border border-white/30 hover:border-white transition-all cursor-pointer z-50 rounded-none bg-black"
            title="Close video"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video border border-white/30 bg-black rounded-none shadow-2xl">
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain rounded-none"
            >
              <source src="/videos/obudu-hero.mp4" type="video/mp4" />
              <source src="/videos/obudu hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};
