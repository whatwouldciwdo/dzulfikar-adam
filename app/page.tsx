'use client';

import React, { useState, useEffect } from 'react';
import Silk from '@/components/Silk';
import GlassSurface from '@/components/GlassSurface';
import GradualBlur from '@/components/GradualBlur';
import SpotlightCard from '@/components/SpotlightCard';
import Link from 'next/link';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import LogoLoop from '@/components/LogoLoop';
import Image from 'next/image';


type Lang = 'id' | 'en' | 'de';

type Dict = Record<string, string>;
const COPY: Record<Lang, Dict> = {
  id: {
    // Navbar
    'nav.cv': 'Curriculum Vitae',
    'nav.gallery': 'Gallery',
    'nav.cv.short': 'CV',
    // Hero
    'hero.role.it': 'IT Infrastruktur',
    'hero.role.jne': 'Junior Network Engineer',
    'hero.location': 'Cilegon, Banten',
    // Language buttons
    'lang.id': 'Bahasa Indonesia',
    'lang.en': 'English',
    'lang.de': 'Deutsch',
    // Sections
    'sec.education': 'RIWAYAT EDUKASI',
    'sec.work': 'PENGALAMAN KERJA',
    'sec.skills.it': 'KEAHLIAN TEKNIS — IT INFRASTRUCTURE',
    'sec.skills.web': 'KEAHLIAN TEKNIS — WEB DEVELOPER',
    'sec.certs': 'SERTIFIKASI',
    'sec.projects': 'PROJECTS',
    'sec.awards': 'PENGHARGAAN',
    // Education items
    'edu.bol.title': 'Binus University Online Learning (BOL)',
    'edu.bol.subtitle': 'Mahasiswa (Semester-3) – Sistem Informasi',
    'edu.bol.meta.line1': 'Online Learning',
    'edu.bol.meta.line2': '2023 – Present',
    'edu.sma.title': 'SMAN 2 Krakatau Steel',
    'edu.sma.subtitle': 'Ilmu Pengetahuan Alam',
    'edu.sma.meta.line1': 'Banten, Indonesia',
    'edu.sma.meta.line2': '2015 – 2018',
    // Work items
    'work.pln.title': 'PT PLN Indonesia Power PLTGU Cilegon',
    'work.pln.subtitle': 'Tenaga Alih Daya – Staff Sistem Informasi',
    'work.pln.meta.line1': 'Cilegon, Banten',
    'work.pln.meta.line2': 'Agustus 2022 – Sekarang',
    'work.freelance.title': 'Freelance Web Developer',
    'work.freelance.subtitle': 'Freelance',
    'work.freelance.meta.line1': 'Cilegon, Banten',
    'work.freelance.meta.line2': '2021 – Sekarang',
    // Skills bullets
    'skills.it.1': 'Windows Server, macOS, Debian Linux',
    'skills.it.2': 'TCP/IP, VLAN, NAT, VPN, Firewall',
    'skills.it.3': 'Aruba OS-X, Cisco, MikroTik, Fortinet, Ubiquiti',
    'skills.it.4': 'Virtualisasi (VMware / Hyper-V)',
    'skills.it.5': 'Active Directory & Office 365 Management',
    'skills.web.1': 'Frontend: HTML, CSS, JavaScript',
    'skills.web.2': 'Backend: PHP, MySQL, Laravel',
    // Certs
    'certs.1.title': 'Ruijie RCNA',
    'certs.1.org': 'Ruijie Networks',
    'certs.1.date': 'September 2025 – September 2028',
    'certs.2.title': 'IT Support Google Professional Certificate',
    'certs.2.org': 'Coursera',
    'certs.2.date': 'Issued June 2023',
    'certs.3.title': 'Networking Essentials',
    'certs.3.org': 'Cisco',
    'certs.3.date': 'Issued February 2023',
    // Projects
    'proj.1.title': 'IP Address Migration — Class C ➜ A',
    'proj.1.meta': 'Sistem Informasi — PT PLN Indonesia Power UBP Cilegon · 2025',
    'proj.1.li1': 'Assessment & konfigurasi perangkat (firewall, switch, access point).',
    'proj.1.li2': 'Backup konfigurasi & re-drawing topologi migrasi.',
    'proj.1.li3': 'Heatmap access point & optimasi VLAN routing.',
    'proj.2.title': 'Solar PV Monitoring Systems',
    'proj.2.meta': 'Sistem Informasi — PT PLN Indonesia Power Cilegon PGU · 2024',
    'proj.2.li1': 'Desain topologi & konfigurasi inverter solar PV.',
    'proj.2.li2': 'Pembuatan aplikasi web monitoring berbasis database.',
    'proj.3.title': 'Innovation Idea Fest 2024 — Crew',
    'proj.3.meta': 'Sistem Informasi — PT PLN Indonesia Power UBP Cilegon · 2024',
    'proj.3.li1': 'Full-stack web developer untuk aplikasi penilaian inovasi.',
    'proj.3.li2': 'Implementasi dengan Laravel 11.',
    // Awards
    'aw.1.title': '3rd Winner — PLN Indonesia Power UBP Cilegon · 2025',
    'aw.1.desc': 'Innovation Idea Contest — “System for Processing and Extracting Efficient Data via Telegram”',
    'aw.2.title': '3rd Winner — PLN Indonesia Power UBP Cilegon · 2024',
    'aw.2.desc': 'Innovation Idea Fest — “Sistem Informasi Penyedia — Si-IPE”',
    'aw.3.title': '3rd Winner — PLN Indonesia Power Cilegon PGU · 2023',
    'aw.3.desc': 'Innovation Idea Contest — “Solar PV Monitoring Systems”',
    // Footer
    'footer.built': '— Built with Next.js',
  },
  en: {
    'nav.cv': 'Curriculum Vitae',
    'nav.gallery': 'Gallery',
    'nav.cv.short': 'CV',
    'hero.role.it': 'IT Infrastructure',
    'hero.role.jne': 'Junior Network Engineer',
    'hero.location': 'Cilegon, Banten',
    'lang.id': 'Indonesian',
    'lang.en': 'English',
    'lang.de': 'German',
    'sec.education': 'EDUCATION',
    'sec.work': 'WORK EXPERIENCE',
    'sec.skills.it': 'TECH SKILLS — IT INFRASTRUCTURE',
    'sec.skills.web': 'TECH SKILLS — WEB DEVELOPER',
    'sec.certs': 'CERTIFICATIONS',
    'sec.projects': 'PROJECTS',
    'sec.awards': 'AWARDS',
    'edu.bol.title': 'Binus University Online Learning (BOL)',
    'edu.bol.subtitle': 'Undergraduate (3rd Semester) — Information Systems',
    'edu.bol.meta.line1': 'Online Learning',
    'edu.bol.meta.line2': '2023 – Present',
    'edu.sma.title': 'SMAN 2 Krakatau Steel',
    'edu.sma.subtitle': 'Natural Sciences',
    'edu.sma.meta.line1': 'Banten, Indonesia',
    'edu.sma.meta.line2': '2015 – 2018',
    'work.pln.title': 'PT PLN Indonesia Power PLTGU Cilegon',
    'work.pln.subtitle': 'Contract Staff — Information Systems',
    'work.pln.meta.line1': 'Cilegon, Banten',
    'work.pln.meta.line2': 'Aug 2022 – Present',
    'work.freelance.title': 'Freelance Web Developer',
    'work.freelance.subtitle': 'Freelance',
    'work.freelance.meta.line1': 'Cilegon, Banten',
    'work.freelance.meta.line2': '2021 – Present',
    'skills.it.1': 'Windows Server, macOS, Debian Linux',
    'skills.it.2': 'TCP/IP, VLAN, NAT, VPN, Firewall',
    'skills.it.3': 'Aruba OS-X, Cisco, MikroTik, Fortinet, Ubiquiti',
    'skills.it.4': 'Virtualization (VMware / Hyper-V)',
    'skills.it.5': 'Active Directory & Office 365 Management',
    'skills.web.1': 'Frontend: HTML, CSS, JavaScript',
    'skills.web.2': 'Backend: PHP, MySQL, Laravel',
    'certs.1.title': 'Ruijie RCNA',
    'certs.1.org': 'Ruijie Networks',
    'certs.1.date': 'September 2025 – September 2028',
    'certs.2.title': 'IT Support Google Professional Certificate',
    'certs.2.org': 'Coursera',
    'certs.2.date': 'Issued June 2023',
    'certs.3.title': 'Networking Essentials',
    'certs.3.org': 'Cisco',
    'certs.3.date': 'Issued February 2023',
    'proj.1.title': 'IP Address Migration — Class C ➜ A',
    'proj.1.meta': 'Information Systems — PT PLN Indonesia Power UBP Cilegon · 2025',
    'proj.1.li1': 'Assessment & configuration (firewall, switches, access points).',
    'proj.1.li2': 'Config backup & migration topology re-drawing.',
    'proj.1.li3': 'AP heatmap & VLAN routing optimization.',
    'proj.2.title': 'Solar PV Monitoring Systems',
    'proj.2.meta': 'Information Systems — PT PLN Indonesia Power Cilegon PGU · 2024',
    'proj.2.li1': 'Topology design & inverter configuration.',
    'proj.2.li2': 'Database-backed web monitoring app.',
    'proj.3.title': 'Innovation Idea Fest 2024 — Crew',
    'proj.3.meta': 'Information Systems — PT PLN Indonesia Power UBP Cilegon · 2024',
    'proj.3.li1': 'Full-stack developer for innovation assessment app.',
    'proj.3.li2': 'Implemented with Laravel 11.',
    'aw.1.title': '3rd Winner — PLN Indonesia Power UBP Cilegon · 2025',
    'aw.1.desc': 'Innovation Idea Contest — “System for Processing and Extracting Efficient Data via Telegram”',
    'aw.2.title': '3rd Winner — PLN Indonesia Power UBP Cilegon · 2024',
    'aw.2.desc': 'Innovation Idea Fest — “Vendor Information System — Si-IPE”',
    'aw.3.title': '3rd Winner — PLN Indonesia Power Cilegon PGU · 2023',
    'aw.3.desc': 'Innovation Idea Contest — “Solar PV Monitoring Systems”',
    'footer.built': '— Built with Next.js',
  },
  de: {
    'nav.cv': 'Lebenslauf',
    'nav.gallery': 'Galerie',
    'nav.cv.short': 'CV',
    'hero.role.it': 'IT-Infrastructure',
    'hero.role.jne': 'Junior Netzwerkingenieur',
    'hero.location': 'Cilegon, Banten',
    'lang.id': 'Indonesisch',
    'lang.en': 'Englisch',
    'lang.de': 'Deutsch',
    'sec.education': 'AUSBILDUNG',
    'sec.work': 'BERUFSERFAHRUNG',
    'sec.skills.it': 'TECHNISCHE FÄHIGKEITEN — IT-INFRASTRUCTURE',
    'sec.skills.web': 'TECHNISCHE FÄHIGKEITEN — WEBENTWICKLUNG',
    'sec.certs': 'ZERTIFIKATE',
    'sec.projects': 'PROJEKTE',
    'sec.awards': 'AUSZEICHNUNGEN',
    'edu.bol.title': 'Binus University Online Learning (BOL)',
    'edu.bol.subtitle': 'Studierender (3. Semester) — Informationssysteme',
    'edu.bol.meta.line1': 'Online-Lernen',
    'edu.bol.meta.line2': '2023 – Heute',
    'edu.sma.title': 'SMAN 2 Krakatau Steel',
    'edu.sma.subtitle': 'Naturwissenschaften',
    'edu.sma.meta.line1': 'Banten, Indonesien',
    'edu.sma.meta.line2': '2015 – 2018',
    'work.pln.title': 'PT PLN Indonesia Power PLTGU Cilegon',
    'work.pln.subtitle': 'Leiharbeit — Informationssysteme',
    'work.pln.meta.line1': 'Cilegon, Banten',
    'work.pln.meta.line2': 'Aug. 2022 – Heute',
    'work.freelance.title': 'Freelance Webentwickler',
    'work.freelance.subtitle': 'Freiberuflich',
    'work.freelance.meta.line1': 'Cilegon, Banten',
    'work.freelance.meta.line2': '2021 – Heute',
    'skills.it.1': 'Windows Server, macOS, Debian Linux',
    'skills.it.2': 'TCP/IP, VLAN, NAT, VPN, Firewall',
    'skills.it.3': 'Aruba OS-X, Cisco, MikroTik, Fortinet, Ubiquiti',
    'skills.it.4': 'Virtualisierung (VMware / Hyper-V)',
    'skills.it.5': 'Active Directory & Office 365 Verwaltung',
    'skills.web.1': 'Frontend: HTML, CSS, JavaScript',
    'skills.web.2': 'Backend: PHP, MySQL, Laravel',
    'certs.1.title': 'Ruijie RCNA',
    'certs.1.org': 'Ruijie Networks',
    'certs.1.date': 'September 2025 – September 2028',
    'certs.2.title': 'IT Support Google Professional Certificate',
    'certs.2.org': 'Coursera',
    'certs.2.date': 'Ausgestellt Juni 2023',
    'certs.3.title': 'Networking Essentials',
    'certs.3.org': 'Cisco',
    'certs.3.date': 'Ausgestellt Februar 2023',
    'proj.1.title': 'IP-Adressmigration — Klasse C ➜ A',
    'proj.1.meta': 'Informationssysteme — PT PLN Indonesia Power UBP Cilegon · 2025',
    'proj.1.li1': 'Bewertung & Konfiguration von Geräten (Firewall, Switch, Access Point).',
    'proj.1.li2': 'Backup der Konfiguration & Neuzeichnung der Migrations-Topologie.',
    'proj.1.li3': 'Heatmap der Access Points & Optimierung des VLAN-Routings.',
    'proj.2.title': 'Solar-PV-Überwachungssysteme',
    'proj.2.meta': 'Informationssysteme — PT PLN Indonesia Power Cilegon PGU · 2024',
    'proj.2.li1': 'Topologiedesign & Konfiguration von PV-Wechselrichtern.',
    'proj.2.li2': 'Entwicklung einer datenbankgestützten Web-Monitoring-Anwendung.',
    'proj.3.title': 'Innovation Idea Fest 2024 — Crew',
    'proj.3.meta': 'Informationssysteme — PT PLN Indonesia Power UBP Cilegon · 2024',
    'proj.3.li1': 'Full-Stack-Webentwickler für eine Innovations-Bewertungsanwendung.',
    'proj.3.li2': 'Implementierung mit Laravel 11.',
    'aw.1.title': '3. Platz — PLN Indonesia Power UBP Cilegon · 2025',
    'aw.1.desc': 'Innovation Idea Contest — „System for Processing and Extracting Efficient Data via Telegram“',
    'aw.2.title': '3. Platz — PLN Indonesia Power UBP Cilegon · 2024',
    'aw.2.desc': 'Innovation Idea Fest — „Sistem Informasi Penyedia — Si-IPE“',
    'aw.3.title': '3. Platz — PLN Indonesia Power Cilegon PGU · 2023',
    'aw.3.desc': 'Innovation Idea Contest — „Solar PV Monitoring Systems“',
    'footer.built': '— Erstellt mit Next.js',
  },
};


const tr = (lang: Lang, key: string) => COPY[lang][key] ?? COPY.id[key] ?? key;


type LangButtonProps = {
  code: Lang;
  active: boolean;
  label: string;
  onSelect: () => void;
};
const LangButton: React.FC<LangButtonProps> = ({ code, active, label, onSelect }) => {
  return (
    <button type="button" onClick={onSelect} aria-pressed={active} className="focus:outline-none">
      <GlassSurface
        width={code === 'id' ? 170 : 120}
        height={38}
        borderRadius={20}
        backgroundOpacity={active ? 0.18 : 0.1}
        blur={10}
        brightness={active ? 70 : 60}
        className={`flex items-center justify-center transition
          ${
            active
              ? 'ring-1 ring-white/20 shadow-[0_0_14px_rgba(255,255,255,0.18)]'
              : 'hover:shadow-[0_0_10px_rgba(255,255,255,0.12)]'
          }`}
      >
        <span className="text-white/90 text-xs sm:text-sm font-medium">{label}</span>
      </GlassSurface>
    </button>
  );
};


export default function LandingPage() {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);


  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'id';
    const saved = localStorage.getItem('lang') as Lang | null;
    return saved ?? 'id';
  });
  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    const heroTimeout = setTimeout(() => setAnimateHero(true), 300);
    const cardsTimeout = setTimeout(() => setAnimateCards(true), 800);
    return () => {
      clearTimeout(heroTimeout);
      clearTimeout(cardsTimeout);
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white overflow-hidden">
      {/* BG SILK*/}
      <div className="absolute inset-0 -z-10">
        <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
      </div>

      {/* NAVBAR GUEH */}
      <div className="w-full flex justify-center pt-4 md:pt-6 z-50 transition-all duration-700">
        <GlassSurface
          width="94%"
          height={52}
          borderRadius={24}
          backgroundOpacity={0.15}
          blur={12}
          saturation={1.2}
          brightness={55}
          opacity={0.92}
          className="relative flex items-center justify-center backdrop-blur-md"
        >
          {/* Mobile*/}
          <div className="flex sm:hidden items-center justify-between w-full px-4">
            {/* Left badge */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-black font-bold">
                λ
              </div>
              <span className="font-medium text-xs tracking-wide text-white/90">
                {tr(lang, 'nav.cv.short')}
              </span>
            </div>

            {/* Right link */}
            <nav className="text-xs font-medium text-white/90">
              <Link href="/gallery" className="hover:text-white transition">
                {tr(lang, 'nav.gallery')}
              </Link>
            </nav>
          </div>

          {/* Tablet/desktop*/}
          <div className="hidden sm:grid grid-cols-[auto_1fr_auto] items-center w-full h-full px-6">
            {/* Left badge */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-black font-bold">
                λ
              </div>
              <span className="font-medium text-sm tracking-wide text-white/90">
                {tr(lang, 'nav.cv')}
              </span>
            </div>

            {/* Center nav */}
            <nav className="justify-self-center text-sm font-medium text-white/90">
              <Link href="/gallery" className="hover:text-white transition">
                {tr(lang, 'nav.gallery')}
              </Link>
            </nav>

            {/* Right spacer */}
            <div className="opacity-0 select-none pointer-events-none">
              <div className="w-6 h-6" />
            </div>
          </div>
        </GlassSurface>
      </div>

      {/* Hero*/}
      <section
        className={`flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 space-y-5 sm:space-y-6 transition-all duration-1000 ease-out ${
          animateHero ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-md translate-y-6'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* IT Infrastruktur */}
          <GlassSurface
            width={220}
            height={40}
            borderRadius={24}
            backgroundOpacity={0.1}
            blur={12}
            brightness={60}
            opacity={0.9}
            className="flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:scale-[1.03]"
          >
            <span className="text-xs sm:text-sm text-white/90 tracking-wide">
              {tr(lang, 'hero.role.it')}
            </span>
          </GlassSurface>

          {/* Junior Network Engineer */}
          <GlassSurface
            width={260}
            height={40}
            borderRadius={24}
            backgroundOpacity={0.1}
            blur={12}
            brightness={60}
            opacity={0.9}
            className="flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:scale-[1.03]"
          >
            <span className="text-xs sm:text-sm text-white/90 tracking-wide">
              {tr(lang, 'hero.role.jne')}
            </span>
          </GlassSurface>
        </div>

        <h1 className="text-[28px] sm:text-4xl md:text-5xl font-bold leading-tight">
          Dzulfikar Adam Sangaji
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/80 mt-1 sm:mt-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {tr(lang, 'hero.location')}
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <a href="mailto:adamdxz07@gmail.com" className="hover:text-white">
              adamdxz07@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin size={16} />
            <a
              href="https://www.linkedin.com/in/adamdzulfikar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              linkedin.com/in/adamdzulfikar
            </a>
          </div>
        </div>

        {/* Button Bahasa */}
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mt-4 sm:mt-6">
          <LangButton
            code="id"
            active={lang === 'id'}
            label={tr(lang, 'lang.id')}
            onSelect={() => setLang('id')}
          />
          <LangButton
            code="en"
            active={lang === 'en'}
            label={tr(lang, 'lang.en')}
            onSelect={() => setLang('en')}
          />
          <LangButton
            code="de"
            active={lang === 'de'}
            label={tr(lang, 'lang.de')}
            onSelect={() => setLang('de')}
          />
        </div>
      </section>

      <section
        className={`w-full flex flex-col items-center gap-6 sm:gap-8 py-6 sm:py-10 px-3 sm:px-4 transition-all duration-1000 ease-out ${
          animateCards ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-8'
        }`}
      >
        {/* Riwayat Edukasi */}
        <SpotlightCard className="w-full max-w-3xl text-neutral-200" spotlightColor="rgba(255, 255, 255, 0.08)">
          <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3">
            {tr(lang, 'sec.education')}
          </h2>
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="font-semibold text-white">{tr(lang, 'edu.bol.title')}</h3>
                <p className="italic text-neutral-400 text-sm">{tr(lang, 'edu.bol.subtitle')}</p>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs sm:text-sm">
                <p>{tr(lang, 'edu.bol.meta.line1')}</p>
                <p>{tr(lang, 'edu.bol.meta.line2')}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="font-semibold text-white">{tr(lang, 'edu.sma.title')}</h3>
                <p className="italic text-neutral-400 text-sm">{tr(lang, 'edu.sma.subtitle')}</p>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs sm:text-sm">
                <p>{tr(lang, 'edu.sma.meta.line1')}</p>
                <p>{tr(lang, 'edu.sma.meta.line2')}</p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Pengalaman Kerja */}
        <SpotlightCard className="w-full max-w-3xl text-neutral-200" spotlightColor="rgba(255, 255, 255, 0.08)">
          <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3">
            {tr(lang, 'sec.work')}
          </h2>
          <div className="space-y-5 sm:space-y-6">
            {/* PT.PLN IP */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex items-start gap-3">
                {/* Logo Perusahaan */}
                <div className="mt-1 h-8 sm:h-10 w-[110px] sm:w-[120px] overflow-hidden rounded-xl ring-1 ring-white/10 bg-white">
                  <Image
                    src="/pln-logo.png"
                    alt="PLN Indonesia Power Logo"
                    width={120}
                    height={40}
                    className="h-full w-auto object-contain"
                    sizes="(max-width: 640px) 110px, 120px"
                    priority={false}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-white">{tr(lang, 'work.pln.title')}</h3>
                  <p className="italic text-neutral-400 text-sm">{tr(lang, 'work.pln.subtitle')}</p>
                </div>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs sm:text-sm">
                <p>{tr(lang, 'work.pln.meta.line1')}</p>
                <p>{tr(lang, 'work.pln.meta.line2')}</p>
              </div>
            </div>

            {/* Freelance Web Developer */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h3 className="font-semibold text-white">{tr(lang, 'work.freelance.title')}</h3>
                <p className="italic text-neutral-400 text-sm">{tr(lang, 'work.freelance.subtitle')}</p>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs sm:text-sm">
                <p>{tr(lang, 'work.freelance.meta.line1')}</p>
                <p>{tr(lang, 'work.freelance.meta.line2')}</p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Card Teknik boz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl">
          {/* IT Infrastructure */}
          <SpotlightCard
            className="flex flex-col justify-between text-neutral-200 bg-linear-to-br from-[#101010]/70 to-[#1b1b1b]/40 border border-white/5 rounded-2xl p-4 sm:p-6"
            spotlightColor="rgba(255, 255, 255, 0.12)"
          >
            <div>
              <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3 sm:mb-4">
                {tr(lang, 'sec.skills.it')}
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 text-[13px] sm:text-sm text-neutral-300 leading-relaxed mb-4 sm:mb-6">
                <li>{tr(lang, 'skills.it.1')}</li>
                <li>{tr(lang, 'skills.it.2')}</li>
                <li>{tr(lang, 'skills.it.3')}</li>
                <li>{tr(lang, 'skills.it.4')}</li>
                <li>{tr(lang, 'skills.it.5')}</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur-md py-1.5 sm:py-2 px-2 mt-auto">
              <LogoLoop
                logos={[
                  { src: '/logos/cisco.svg', alt: 'Cisco' },
                  { src: '/logos/mikrotik.svg', alt: 'MikroTik' },
                  { src: '/logos/fortinet.svg', alt: 'Fortinet' },
                  { src: '/logos/ubiquiti.svg', alt: 'Ubiquiti' },
                  { src: '/logos/vmware.svg', alt: 'VMware' },
                ]}
                speed={90}
                direction="left"
                fadeOut
                pauseOnHover
                scaleOnHover
                logoHeight={22}
                gap={28}
              />
            </div>
          </SpotlightCard>

          {/* Web Developer */}
          <SpotlightCard
            className="flex flex-col justify-between text-neutral-200 bg-linear-to-br from-[#161616]/70 to-[#222]/40 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_25px_rgba(255,255,255,0.04)]"
            spotlightColor="rgba(255, 255, 255, 0.15)"
          >
            <div>
              <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3 sm:mb-4">
                {tr(lang, 'sec.skills.web')}
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 text-[13px] sm:text-sm text-neutral-300 leading-relaxed mb-4 sm:mb-6">
                <li>{tr(lang, 'skills.web.1')}</li>
                <li>{tr(lang, 'skills.web.2')}</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/10 backdrop-blur-md py-1.5 sm:py-2 px-2 mt-auto">
              <LogoLoop
                logos={[
                  { src: '/logos/html.svg', alt: 'HTML' },
                  { src: '/logos/css.svg', alt: 'CSS' },
                  { src: '/logos/js.svg', alt: 'JavaScript' },
                  { src: '/logos/php.svg', alt: 'PHP' },
                  { src: '/logos/laravel.svg', alt: 'Laravel' },
                ]}
                speed={90}
                direction="right"
                fadeOut
                pauseOnHover
                scaleOnHover
                logoHeight={22}
                gap={28}
              />
            </div>
          </SpotlightCard>
        </div>

        {/* Sertifikasi */}
        <SpotlightCard
          className="w-full max-w-3xl text-neutral-200 border border-white/10 rounded-xl p-4 sm:p-6 bg-linear-to-tr from-[#151515]/70 to-[#1f1f1f]/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.04)]"
          spotlightColor="rgba(255, 255, 255, 0.15)"
        >
          <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3 sm:mb-4">
            {tr(lang, 'sec.certs')}
          </h2>
          <div className="flex flex-col gap-3 sm:gap-4 text-[13px] sm:text-sm text-neutral-300">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold text-white">{tr(lang, 'certs.1.title')}</h3>
                <p className="italic text-neutral-400">{tr(lang, 'certs.1.org')}</p>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs">
                <p>{tr(lang, 'certs.1.date')}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold text-white">{tr(lang, 'certs.2.title')}</h3>
                <p className="italic text-neutral-400">{tr(lang, 'certs.2.org')}</p>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs">
                <p>{tr(lang, 'certs.2.date')}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-semibold text-white">{tr(lang, 'certs.3.title')}</h3>
                <p className="italic text-neutral-400">{tr(lang, 'certs.3.org')}</p>
              </div>
              <div className="text-left sm:text-right text-neutral-400 text-xs">
                <p>{tr(lang, 'certs.3.date')}</p>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/*PROJECTS & AWARDS*/}
        <section className="w-full flex flex-col items-center gap-6 sm:gap-8">
          {/* Projects */}
          <SpotlightCard
            className="relative w-full max-w-3xl text-neutral-200 bg-linear-to-br from-[#101010]/70 to-[#1b1b1b]/40 border border-white/5 rounded-2xl p-4 sm:p-6 overflow-hidden"
            spotlightColor="rgba(255, 255, 255, 0.08)"
          >
            {/* Logo PLN (wrapped + rounded) */}
            <div className="block absolute top-3 sm:top-4 right-3 sm:right-4 h-5 sm:h-6 w-[84px] sm:w-[100px] overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
              <Image
                src="/logos/pln-white.png"
                alt="PLN Logo"
                width={100}
                height={24}
                className="h-full w-auto object-contain select-none pointer-events-none"
                sizes="(max-width: 640px) 84px, (max-width: 768px) 100px, 100px"
                priority={false}
              />
            </div>

            <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3 sm:mb-4">
              {tr(lang, 'sec.projects')}
            </h2>

            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-white">{tr(lang, 'proj.1.title')}</h3>
              <p className="italic text-neutral-400 text-xs sm:text-sm mb-2">{tr(lang, 'proj.1.meta')}</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-neutral-300 text-[13px] sm:text-sm">
                <li>{tr(lang, 'proj.1.li1')}</li>
                <li>{tr(lang, 'proj.1.li2')}</li>
                <li>{tr(lang, 'proj.1.li3')}</li>
              </ul>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-white">{tr(lang, 'proj.2.title')}</h3>
              <p className="italic text-neutral-400 text-xs sm:text-sm mb-2">{tr(lang, 'proj.2.meta')}</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-neutral-300 text-[13px] sm:text-sm">
                <li>{tr(lang, 'proj.2.li1')}</li>
                <li>{tr(lang, 'proj.2.li2')}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white">{tr(lang, 'proj.3.title')}</h3>
              <p className="italic text-neutral-400 text-xs sm:text-sm mb-2">{tr(lang, 'proj.3.meta')}</p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-1 text-neutral-300 text-[13px] sm:text-sm">
                <li>{tr(lang, 'proj.3.li1')}</li>
                <li>{tr(lang, 'proj.3.li2')}</li>
              </ul>
            </div>
          </SpotlightCard>

          {/* Awards */}
          <SpotlightCard
            className="relative w-full max-w-3xl text-neutral-200 bg-linear-to-br from-[#161616]/70 to-[#222]/40 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_25px_rgba(255,255,255,0.04)] overflow-hidden"
            spotlightColor="rgba(255, 255, 255, 0.12)"
          >
            <div className="block absolute top-3 sm:top-4 right-3 sm:right-4 h-5 sm:h-6 w-[84px] sm:w-[100px] overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
              <Image
                src="/logos/pln-white.png"
                alt="PLN Logo"
                width={100}
                height={24}
                className="h-full w-auto object-contain select-none pointer-events-none"
                sizes="(max-width: 640px) 84px, (max-width: 768px) 100px, 100px"
                priority={false}
              />
            </div>

            <h2 className="text-base sm:text-lg font-semibold border-b border-white/10 pb-2 mb-3 sm:mb-4">
              {tr(lang, 'sec.awards')}
            </h2>

            <div className="space-y-3 sm:space-y-4 text-[13px] sm:text-sm">
              <div>
                <p className="font-semibold text-white">{tr(lang, 'aw.1.title')}</p>
                <p className="italic text-neutral-400">{tr(lang, 'aw.1.desc')}</p>
              </div>

              <div>
                <p className="font-semibold text-white">{tr(lang, 'aw.2.title')}</p>
                <p className="italic text-neutral-400">{tr(lang, 'aw.2.desc')}</p>
              </div>

              <div>
                <p className="font-semibold text-white">{tr(lang, 'aw.3.title')}</p>
                <p className="italic text-neutral-400">{tr(lang, 'aw.3.desc')}</p>
              </div>
            </div>
          </SpotlightCard>
        </section>
      </section>

      {/* Footer */}
      <section className="relative w-full" style={{ height: 320, overflow: 'hidden' }}>
        <footer className="pb-6 text-[11px] sm:text-xs text-white/40 text-center">
          © {new Date().getFullYear()} Dzulfikar Adam Sangaji {tr(lang, 'footer.built')}
        </footer>

        <GradualBlur
          target="parent"
          position="bottom"
          height="8rem"
          strength={3}
          divCount={8}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </section>
    </main>
  );
}
