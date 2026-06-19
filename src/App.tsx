import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiClock,
  FiHeart,
  FiHome,
  FiMapPin,
  FiMenu,
  FiSend,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiUsers,
  FiX,
} from 'react-icons/fi'
import { FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { GiMusicalNotes, GiSkateboard, GiTargetPrize, GiTrophyCup } from 'react-icons/gi'

type Tone = 'orange' | 'lime'

type ToneClasses = {
  bg: string
  bgSoft: string
  border: string
  borderSoft: string
  glow: string
  text: string
}

const tones: Record<Tone, ToneClasses> = {
  orange: {
    bg: 'bg-[#FF6B00]',
    bgSoft: 'bg-[#FF6B00]/[0.08]',
    border: 'border-[#FF6B00]',
    borderSoft: 'border-[#FF6B00]/35',
    glow: 'shadow-[0_0_40px_rgba(255,107,0,0.45)]',
    text: 'text-[#FF6B00]',
  },
  lime: {
    bg: 'bg-[#A3FF12]',
    bgSoft: 'bg-[#A3FF12]/[0.08]',
    border: 'border-[#A3FF12]',
    borderSoft: 'border-[#A3FF12]/35',
    glow: 'shadow-[0_0_40px_rgba(163,255,18,0.22)]',
    text: 'text-[#A3FF12]',
  },
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Merch', href: '#merch' },
  { label: 'Contact', href: '#contact' },
]

const stats = [
  { value: '500+', label: 'Community Members' },
  { value: '52', label: 'Weekly Events' },
  { value: '200+', label: 'Skate Lessons Given' },
  { value: '18', label: 'Competitions Held' },
]

const experiences: Array<{
  title: string
  description: string
  icon: IconType
  tag: string
  tone: Tone
  tilt: string
}> = [
  {
    title: 'Open Sessions',
    description: 'Ride freely with the community any day of the week. All skill levels welcome.',
    icon: GiSkateboard,
    tag: 'Daily',
    tone: 'orange',
    tilt: 'hover:rotate-1',
  },
  {
    title: 'Learn to Skate',
    description: 'Beginner lessons and coaching from certified instructors.',
    icon: GiTargetPrize,
    tag: 'Coaching',
    tone: 'lime',
    tilt: 'hover:-rotate-1',
  },
  {
    title: 'Competitions',
    description: 'Monthly trick contests with prizes, clout, and lifetime bragging rights.',
    icon: GiTrophyCup,
    tag: 'Monthly',
    tone: 'orange',
    tilt: 'hover:rotate-1',
  },
  {
    title: 'Events & Hangouts',
    description: 'Music, food, fashion, and skate culture converge in one electric space.',
    icon: GiMusicalNotes,
    tag: 'Weekly',
    tone: 'lime',
    tilt: 'hover:-rotate-1',
  },
]

const gallery = [
  { id: '1763044938426-17fd51e9d21a', title: 'Night Tricks', height: 'h-[380px]' },
  { id: '1503417680882-163c1609fd2f', title: 'The Crew', height: 'h-[270px]' },
  { id: '1663243216708-a7831e1a9c55', title: 'Big Air', height: 'h-[340px]' },
  { id: '1651675804338-8a1cbfb5bd54', title: 'Graffiti Tunnel', height: 'h-[300px]' },
  { id: '1564557287817-3785e38ec1f5', title: 'Street Style', height: 'h-[400px]' },
  { id: '1763044938637-4d04f3f762d0', title: 'Night Session', height: 'h-[300px]' },
  { id: '1489614389547-f2209ef4b321', title: 'Ollie Up', height: 'h-[260px]' },
  { id: '1611063158871-7dd3ed4a2ac8', title: 'Wall Art', height: 'h-[330px]' },
  { id: '1685354217981-26c14a211bf8', title: 'Culture Drop', height: 'h-[360px]' },
]

const communityCards: Array<{
  title: string
  description: string
  href: string
  icon: IconType
}> = [
  {
    title: 'Meet the Crew',
    description: 'Get to know the riders and creators behind Tag Sports.',
    href: '#community',
    icon: FiUsers,
  },
  {
    title: 'Join Events',
    description: 'Never miss a jam, competition, or culture drop.',
    href: '#events',
    icon: FiCalendar,
  },
  {
    title: 'Volunteer',
    description: 'Help build the scene and give back to the culture.',
    href: '#contact',
    icon: FiHeart,
  },
  {
    title: 'Partner With Us',
    description: 'Brands, collectives, and businesses can collaborate with the movement.',
    href: '#contact',
    icon: FiBriefcase,
  },
]

const testimonials = [
  {
    name: 'Kwame Asante',
    handle: '@kwame_sk8',
    text: "Tag Sports changed my life. I found my people, learned to skate in two months, and now I'm teaching others.",
  },
  {
    name: 'Abena Osei',
    handle: '@benask8s',
    text: "The Friday night jams are legendary. Music up, tricks flying, Kumasi's finest all in one spot.",
  },
  {
    name: 'Kofi Mensah',
    handle: '@kofim_official',
    text: 'I came for skateboarding and stayed for the community. These are my brothers and sisters for life.',
  },
  {
    name: 'Akosua Frimpong',
    handle: '@ak_creates',
    text: 'As a photographer and artist, Tag Sports is my muse. The energy here is unlike anything in Ghana.',
  },
]

const events: Array<{
  title: string
  date: string
  time: string
  type: string
  spots: string
  tone: Tone
}> = [
  {
    title: 'Friday Night Skate Jam',
    date: 'July 11, 2026',
    time: '7:00 PM - 11:00 PM',
    type: 'Community',
    spots: '12 left',
    tone: 'orange',
  },
  {
    title: 'Beginner Bootcamp',
    date: 'July 19, 2026',
    time: '9:00 AM - 1:00 PM',
    type: 'Coaching',
    spots: '8 left',
    tone: 'lime',
  },
  {
    title: 'Trick Competition Vol. 3',
    date: 'August 2, 2026',
    time: '2:00 PM - 6:00 PM',
    type: 'Competition',
    spots: '20 left',
    tone: 'orange',
  },
  {
    title: 'Thrift & Skate Market',
    date: 'August 16, 2026',
    time: '11:00 AM - 5:00 PM',
    type: 'Culture',
    spots: 'Open',
    tone: 'lime',
  },
]

const merch: Array<{
  name: string
  price: string
  tag: string
  imageId: string
  tone: Tone
}> = [
  {
    name: 'TAG SPORTS Hoodie',
    price: 'GHS 280',
    tag: 'New Drop',
    imageId: '1564557287817-3785e38ec1f5',
    tone: 'orange',
  },
  {
    name: 'Graphic Tee Vol. 1',
    price: 'GHS 150',
    tag: 'Bestseller',
    imageId: '1542406775-ade58c52d2e4',
    tone: 'lime',
  },
  {
    name: 'Kumasi Deck',
    price: 'GHS 380',
    tag: 'Limited',
    imageId: '1597332463629-a3bdaae22e5f',
    tone: 'orange',
  },
  {
    name: 'Culture Cap',
    price: 'GHS 120',
    tag: 'Popular',
    imageId: '1685354217981-26c14a211bf8',
    tone: 'lime',
  },
]

const mobileNav: Array<{
  label: string
  href: string
  icon: IconType
  primary?: boolean
}> = [
  { label: 'Home', href: '#home', icon: FiHome },
  { label: 'Events', href: '#events', icon: FiCalendar },
  { label: 'Book', href: '#contact', icon: GiSkateboard, primary: true },
  { label: 'Gallery', href: '#gallery', icon: FiCamera },
  { label: 'Merch', href: '#merch', icon: FiShoppingBag },
]

function unsplashPhoto(id: string, params: string) {
  return `https://images.unsplash.com/photo-${id}?${params}&fit=crop&auto=format`
}

function SectionLabel({ children, tone = 'orange' }: { children: ReactNode; tone?: Tone }) {
  const toneClass = tones[tone]

  return (
    <div
      className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[0.65rem] uppercase ${toneClass.bgSoft} ${toneClass.borderSoft} ${toneClass.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${toneClass.bg}`} />
      <span className="inline-block">{children}</span>
    </div>
  )
}

function SectionHeading({
  line1,
  line2,
  tone = 'orange',
}: {
  line1: string
  line2: string
  tone?: Tone
}) {
  return (
    <h2 className="font-display text-5xl font-bold uppercase leading-[0.88] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
      <span className="inline-block">{line1}</span>
      <br />
      <span className={`inline-block ${tones[tone].text}`}>{line2}</span>
    </h2>
  )
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}

function SkateboardGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 60" fill="none" aria-hidden="true">
      <path d="M18 16 Q90 4 162 16 L162 34 Q90 46 18 34 Z" fill="#FF6B00" opacity="0.85" />
      <path d="M18 16 Q90 4 162 16" stroke="#A3FF12" strokeWidth="1.5" opacity="0.5" />
      <rect x="36" y="32" width="30" height="6" rx="3" fill="#444444" />
      <rect x="114" y="32" width="30" height="6" rx="3" fill="#444444" />
      <circle cx="42" cy="48" r="8" fill="#252525" />
      <circle cx="42" cy="48" r="3.5" fill="#3A3A3A" />
      <circle cx="60" cy="48" r="8" fill="#252525" />
      <circle cx="60" cy="48" r="3.5" fill="#3A3A3A" />
      <circle cx="120" cy="48" r="8" fill="#252525" />
      <circle cx="120" cy="48" r="3.5" fill="#3A3A3A" />
      <circle cx="138" cy="48" r="8" fill="#252525" />
      <circle cx="138" cy="48" r="3.5" fill="#3A3A3A" />
      {[60, 80, 100, 120].map((x) => (
        <line
          key={x}
          x1={x}
          y1="17"
          x2={x - 12}
          y2="33"
          stroke="#F5F5F5"
          strokeWidth="0.6"
          opacity="0.25"
        />
      ))}
    </svg>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/5 bg-[#0D0D0D]/95 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a className="font-display text-[1.7rem] font-bold uppercase text-white" href="#home">
          TAG<span className="text-[#FF6B00]">SPORTS</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li className="list-none" key={link.label}>
              <a
                className="font-mono text-[0.65rem] uppercase text-white/55 transition-colors hover:text-[#FF6B00]"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="hidden rounded-full bg-[#FF6B00] px-6 py-2 font-display text-[1.05rem] font-bold uppercase text-[#111111] transition-all hover:scale-105 hover:bg-[#ff8533] active:scale-95 md:block"
          href="#contact"
        >
          Book Session
        </a>

        <button
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/[0.08] bg-[#0C0C0C]/98 px-8 py-10 backdrop-blur-xl md:hidden"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  className="font-display text-[2.4rem] font-bold uppercase leading-none text-white/80 transition-colors hover:text-[#FF6B00]"
                  href={link.href}
                  key={link.label}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                className="mt-4 rounded-full bg-[#FF6B00] py-4 text-center font-display text-2xl font-bold uppercase text-[#111111]"
                href="#contact"
                onClick={() => setOpen(false)}
              >
                Book Session
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[#0D0D0D]" id="home">
      <div className="absolute inset-0">
        <img
          alt="Skateboarder performs a night trick with palms in the background"
          className="h-full w-full object-cover object-center opacity-45"
          src={unsplashPhoto('1763044938426-17fd51e9d21a', 'w=1920&h=1080')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/55 to-[#111111]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/65 to-transparent" />
      </div>

      <SkateboardGraphic className="absolute right-16 top-28 hidden w-44 animate-float-one opacity-25 lg:block" />
      <SkateboardGraphic className="absolute right-[38%] top-56 hidden w-32 animate-float-two opacity-15 lg:block" />
      <SkateboardGraphic className="absolute bottom-52 right-8 hidden w-36 animate-float-three opacity-20 lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-36">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#A3FF12]/35 bg-[#A3FF12]/[0.08] px-4 py-1.5 font-mono text-[0.65rem] uppercase text-[#A3FF12]"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#A3FF12]" />
          <span className="inline-block">Kumasi, Ghana</span>
        </motion.div>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-display text-7xl font-bold uppercase leading-[0.82] text-white sm:text-8xl md:text-[10rem] lg:text-[13rem] xl:text-[15rem]"
          initial={{ opacity: 0, y: 34 }}
          transition={{ delay: 0.08, duration: 0.72, ease: 'easeOut' }}
        >
          TAG
          <br />
          <span className="text-[#FF6B00]">SPORTS</span>
        </motion.h1>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
          initial={{ opacity: 0, y: 28 }}
          transition={{ delay: 0.18, duration: 0.64, ease: 'easeOut' }}
        >
          <p className="mb-3 font-body text-lg text-white/65 md:text-xl">Skate. Connect. Create.</p>
          <p className="mb-14 font-mono text-[0.7rem] uppercase text-white/35">
            Kumasi's home for skateboarding culture.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              className="rounded-full bg-[#FF6B00] px-9 py-4 font-display text-xl font-bold uppercase text-[#111111] shadow-[0_0_40px_rgba(255,107,0,0.45)] transition-colors hover:bg-[#ff8533]"
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Book a Session
            </motion.a>
            <motion.a
              className="rounded-full border border-white/20 px-9 py-4 font-display text-xl font-bold uppercase text-white backdrop-blur-sm transition-all hover:border-[#A3FF12] hover:text-[#A3FF12]"
              href="#community"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Join Community
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 overflow-hidden bg-[#FF6B00] py-3">
        <div className="inline-flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 14 }, (_, index) => (
            <span
              className="pr-2 font-display text-lg font-bold uppercase text-[#111111]"
              key={`marquee-${index}`}
            >
              SKATE / CREATE / CONNECT / REPEAT /
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="bg-[#111111] py-28 md:py-36" id="about">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2 lg:gap-24">
          <Reveal className="grid h-[420px] grid-cols-2 gap-3 sm:h-[500px]">
            <div className="row-span-2 overflow-hidden rounded-3xl bg-[#1A1A1A]">
              <img
                alt="Skate community gathering"
                className="h-full w-full object-cover"
                src={unsplashPhoto('1503417680882-163c1609fd2f', 'w=500&h=700')}
              />
            </div>
            <div className="overflow-hidden rounded-3xl bg-[#1A1A1A]">
              <img
                alt="Skater big air trick"
                className="h-full w-full object-cover"
                src={unsplashPhoto('1663243216708-a7831e1a9c55', 'w=400&h=260')}
              />
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A]">
              <img
                alt="Graffiti tunnel street art"
                className="h-full w-full object-cover"
                src={unsplashPhoto('1651675804338-8a1cbfb5bd54', 'w=400&h=260')}
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-[#FF6B00] px-3 py-1 font-mono text-xs font-bold text-[#111111]">
                Est. 2021
              </div>
            </div>
          </Reveal>

          <Reveal className="max-w-xl">
            <SectionLabel tone="lime">Who We Are</SectionLabel>
            <SectionHeading line1="More Than" line2="A Skate Spot" tone="orange" />
            <p className="mt-7 mb-12 font-body text-lg leading-relaxed text-white/55">
              Tag Sports is a creative hub where skaters, artists, and young people come together
              to learn, express themselves, and build community. From Kumasi to the world - we ride
              different.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-[#FF6B00]/35"
                  key={stat.label}
                  whileHover={{ y: -4 }}
                >
                  <div className="font-display text-[2.8rem] font-bold leading-none text-[#FF6B00] transition-colors group-hover:text-[#ff8533]">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-body text-sm text-white/45">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Experiences() {
  return (
    <section className="bg-[#0D0D0D] py-28" id="experiences">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionHeading line1="The" line2="Experiences" />
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-white/40">
            Whatever your level, whatever your vibe - there is a session shaped for you.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            const toneClass = tones[experience.tone]

            return (
              <motion.article
                className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1A1A1A] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#FF6B00]/25 hover:shadow-[0_20px_60px_rgba(255,107,0,0.12)] ${experience.tilt}`}
                initial={{ opacity: 0, y: 32 }}
                key={experience.title}
                transition={{ delay: index * 0.06, duration: 0.55, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.25 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className={`absolute inset-x-0 bottom-0 h-32 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-30 ${toneClass.bg}`} />
                <Icon className={`mb-5 h-10 w-10 ${toneClass.text}`} />
                <div
                  className={`mb-4 inline-flex rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold uppercase ${toneClass.bgSoft} ${toneClass.borderSoft} ${toneClass.text}`}
                >
                  {experience.tag}
                </div>
                <h3 className="mb-3 font-display text-[1.7rem] font-bold uppercase leading-tight text-white">
                  {experience.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/45">{experience.description}</p>
                <a
                  className={`mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase ${toneClass.text}`}
                  href="#contact"
                >
                  Learn more <FiArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="bg-[#111111] py-28" id="gallery">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <SectionLabel tone="lime">The Moments</SectionLabel>
            <SectionHeading line1="Life at" line2="Tag Sports" tone="lime" />
          </div>
          <a
            className="inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase text-white/40 transition-colors hover:text-white md:self-auto"
            href="#community"
          >
            View all <FiArrowRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>

        <div className="columns-2 gap-4 space-y-4 md:columns-3">
          {gallery.map((item, index) => (
            <motion.figure
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#1A1A1A]"
              initial={{ opacity: 0, y: 28 }}
              key={item.id}
              transition={{ delay: index * 0.035, duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <img
                alt={item.title}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.08] ${item.height}`}
                src={unsplashPhoto(item.id, 'w=600')}
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-display text-2xl font-bold uppercase text-white">{item.title}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Community() {
  return (
    <section className="bg-[#0D0D0D] py-28" id="community">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-20 text-center">
          <SectionLabel>The People</SectionLabel>
          <h2 className="font-display text-6xl font-bold uppercase leading-[0.85] text-white sm:text-7xl md:text-8xl lg:text-[9.5rem]">
            The Culture
            <br />
            <span className="text-[#FF6B00]">Lives Here</span>
          </h2>
        </Reveal>

        <div className="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {communityCards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.a
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B00]/30"
                href={card.href}
                initial={{ opacity: 0, y: 26 }}
                key={card.title}
                transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.25 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Icon className="mb-5 h-10 w-10 text-[#FF6B00]" />
                <h3 className="mb-2 font-display text-[1.6rem] font-bold uppercase leading-tight text-white">
                  {card.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/45">{card.description}</p>
              </motion.a>
            )
          })}
        </div>

        <Reveal>
          <p className="mb-8 text-center font-mono text-[0.65rem] uppercase text-white/25">
            What They're Saying
          </p>
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((testimonial) => (
              <article
                className="w-80 flex-shrink-0 snap-start rounded-3xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-sm"
                key={testimonial.name}
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FiStar className="h-3.5 w-3.5 text-[#FF6B00]" fill="#FF6B00" key={index} />
                  ))}
                </div>
                <p className="mb-6 font-body text-sm leading-relaxed text-white/75">
                  "{testimonial.text}"
                </p>
                <div className="block">
                  <div className="font-display text-lg font-bold uppercase text-white">{testimonial.name}</div>
                  <div className="font-mono text-[0.7rem] text-[#FF6B00]">{testimonial.handle}</div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Events() {
  return (
    <section className="bg-[#111111] py-28" id="events">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel tone="lime">What's Coming</SectionLabel>
            <SectionHeading line1="Upcoming" line2="Events" tone="lime" />
          </div>
          <a
            className="inline-flex items-center gap-2 self-start font-mono text-[0.65rem] uppercase text-white/35 transition-colors hover:text-white md:self-auto"
            href="#contact"
          >
            Full calendar <FiArrowRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>

        <div className="flex flex-col gap-4">
          {events.map((event, index) => {
            const toneClass = tones[event.tone]

            return (
              <motion.article
                className="group flex flex-col justify-between gap-6 rounded-3xl border border-white/[0.08] bg-[#1A1A1A] p-7 transition-all duration-300 hover:border-white/15 hover:bg-[#1E1E1E] md:flex-row md:items-center"
                initial={{ opacity: 0, y: 28 }}
                key={event.title}
                transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.18 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-6">
                  <div className="hidden min-w-14 flex-shrink-0 font-display text-[4rem] font-bold leading-none text-white/[0.08] md:block">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="block">
                    <div
                      className={`mb-3 inline-flex rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold uppercase ${toneClass.bgSoft} ${toneClass.borderSoft} ${toneClass.text}`}
                    >
                      {event.type}
                    </div>
                    <h3 className="font-display text-3xl font-bold uppercase leading-tight text-white md:text-[2rem]">
                      {event.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-5">
                      <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-white/35">
                        <FiCalendar className="h-3 w-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-white/35">
                        <FiClock className="h-3 w-3" /> {event.time}
                      </span>
                      <span className={`flex items-center gap-1.5 font-mono text-[0.65rem] ${toneClass.text}`}>
                        <FiUsers className="h-3 w-3" /> {event.spots}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.a
                  className={`flex-shrink-0 rounded-full px-8 py-3 text-center font-display text-lg font-bold uppercase text-[#111111] transition-all ${toneClass.bg}`}
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Register
                </motion.a>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Merchandise() {
  return (
    <section className="bg-[#0D0D0D] py-28" id="merch">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>The Drop</SectionLabel>
            <SectionHeading line1="Shop the" line2="Culture" />
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-white/35">
            Limited drops. Street-ready gear. Repping Kumasi to the world.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {merch.map((item, index) => {
            const toneClass = tones[item.tone]

            return (
              <motion.article
                className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-2 hover:border-white/[0.18]"
                initial={{ opacity: 0, y: 28 }}
                key={item.name}
                transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.22 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative h-72 overflow-hidden bg-[#222222]">
                  <img
                    alt={item.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    src={unsplashPhoto(item.imageId, 'w=500&h=600&crop=top')}
                  />
                  <div className="absolute left-4 top-4">
                    <span
                      className={`rounded-full px-3 py-1 font-mono text-xs font-bold text-[#111111] ${toneClass.bg}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-base font-bold text-[#111111] transition-colors hover:bg-[#FF6B00]"
                      type="button"
                    >
                      <FiShoppingCart className="h-4 w-4" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-1 font-display text-[1.35rem] font-bold uppercase text-white">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm font-bold ${toneClass.text}`}>{item.price}</span>
                    <button
                      aria-label={`Add ${item.name} to cart`}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/[0.06] hover:text-white"
                      type="button"
                    >
                      <FiShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section className="bg-[#111111] py-28" id="contact">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 md:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionLabel tone="lime">Find Us</SectionLabel>
            <SectionHeading line1="Get In" line2="Touch" tone="lime" />

            <div className="relative mt-8 mb-8 h-64 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#1A1A1A]">
              <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 400 256" aria-hidden="true">
                {Array.from({ length: 9 }, (_, index) => (
                  <line
                    key={`horizontal-${index}`}
                    x1="0"
                    y1={index * 32}
                    x2="400"
                    y2={index * 32}
                    stroke="#A3FF12"
                    strokeWidth="0.8"
                  />
                ))}
                {Array.from({ length: 13 }, (_, index) => (
                  <line
                    key={`vertical-${index}`}
                    x1={index * 33.3}
                    y1="0"
                    x2={index * 33.3}
                    y2="256"
                    stroke="#A3FF12"
                    strokeWidth="0.8"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/15">
                  <FiMapPin className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold uppercase text-white">Tag Sports Park</div>
                  <div className="font-mono text-[0.65rem] text-white/35">Kumasi, Ashanti Region, Ghana</div>
                </div>
                <a
                  className="mt-1 rounded-full border border-white/15 px-5 py-1.5 font-mono text-[0.6rem] uppercase text-white/45 transition-all hover:border-[#FF6B00]/50 hover:text-[#FF6B00]"
                  href="https://maps.google.com/?q=Kumasi%20Ashanti%20Region%20Ghana"
                  rel="noreferrer"
                  target="_blank"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#1A1A1A] px-5 py-3 font-mono text-[0.65rem] uppercase text-white/50 transition-all hover:border-[#25D366]/35 hover:text-white"
                href="https://wa.me/"
                rel="noreferrer"
                target="_blank"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp Us
              </a>
              <a
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#1A1A1A] px-5 py-3 font-mono text-[0.65rem] uppercase text-white/50 transition-all hover:border-[#E1306C]/35 hover:text-white"
                href="https://instagram.com/"
                rel="noreferrer"
                target="_blank"
              >
                <FaInstagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#1A1A1A] px-5 py-3 font-mono text-[0.65rem] uppercase text-white/50 transition-all hover:border-white/35 hover:text-white"
                href="https://www.tiktok.com/"
                rel="noreferrer"
                target="_blank"
              >
                <FaTiktok className="h-4 w-4" />
                TikTok
              </a>
            </div>
          </Reveal>

          <Reveal>
            <form
              className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-sm md:p-10"
              onSubmit={submit}
            >
              <h3 className="mb-8 font-display text-[2rem] font-bold uppercase text-white">Send a Message</h3>
              <div className="flex flex-col gap-5">
                <div className="block">
                  <label className="mb-2 block font-mono text-[0.6rem] uppercase text-white/35" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-body text-white placeholder-white/20 transition-colors focus:border-[#FF6B00] focus:outline-none"
                    id="name"
                    onChange={update('name')}
                    placeholder="Kwame Asante"
                    type="text"
                    value={form.name}
                  />
                </div>
                <div className="block">
                  <label className="mb-2 block font-mono text-[0.6rem] uppercase text-white/35" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-body text-white placeholder-white/20 transition-colors focus:border-[#FF6B00] focus:outline-none"
                    id="email"
                    onChange={update('email')}
                    placeholder="kwame@tagsports.gh"
                    type="email"
                    value={form.email}
                  />
                </div>
                <div className="block">
                  <label className="mb-2 block font-mono text-[0.6rem] uppercase text-white/35" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-body text-white placeholder-white/20 transition-colors focus:border-[#FF6B00] focus:outline-none"
                    id="message"
                    onChange={update('message')}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={form.message}
                  />
                </div>
                <motion.button
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B00] py-4 font-display text-xl font-bold uppercase text-[#111111] shadow-[0_0_30px_rgba(255,107,0,0.3)] transition-colors hover:bg-[#ff8533]"
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend className="h-5 w-5" /> Send Message
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A] pt-20 pb-40 md:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 overflow-hidden text-center font-display text-6xl font-bold uppercase leading-none text-white/[0.04] select-none md:text-8xl lg:text-[11rem]">
          TAG SPORTS
        </div>

        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-4 font-display text-[1.7rem] font-bold uppercase text-white">
              TAG<span className="text-[#FF6B00]">SPORTS</span>
            </div>
            <p className="mb-7 max-w-xs font-body text-sm leading-relaxed text-white/35">
              Kumasi's home for skateboarding culture. Built by skaters, for skaters.
            </p>
            <div className="flex gap-3">
              <a
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all hover:border-[#E1306C]/35 hover:text-[#E1306C]"
                href="https://instagram.com/"
                rel="noreferrer"
                target="_blank"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all hover:border-white/35 hover:text-white"
                href="https://www.tiktok.com/"
                rel="noreferrer"
                target="_blank"
              >
                <FaTiktok className="h-4 w-4" />
              </a>
              <a
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all hover:border-[#FF0000]/35 hover:text-[#FF0000]"
                href="https://youtube.com/"
                rel="noreferrer"
                target="_blank"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="block">
            <h4 className="mb-5 font-mono text-[0.6rem] uppercase text-white/25">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li className="list-none" key={link.label}>
                  <a className="font-body text-sm text-white/40 transition-colors hover:text-[#FF6B00]" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="block">
            <h4 className="mb-5 font-mono text-[0.6rem] uppercase text-white/25">Connect</h4>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'TikTok', 'YouTube', 'WhatsApp'].map((item) => (
                <li className="list-none" key={item}>
                  <a className="font-body text-sm text-white/40 transition-colors hover:text-[#FF6B00]" href="#contact">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-mono text-[0.6rem] uppercase text-white/20">(c) 2026 TAG SPORTS - Kumasi, Ghana</p>
          <p className="font-mono text-[0.6rem] uppercase text-white/20">Built by skaters, for skaters.</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-white/[0.08] bg-[#0A0A0A]/95 px-4 py-3 backdrop-blur-xl md:hidden">
      {mobileNav.map((item) => {
        const Icon = item.icon

        return (
          <a
            className={`flex flex-col items-center gap-0.5 ${item.primary ? 'relative -top-5' : ''}`}
            href={item.href}
            key={item.label}
          >
            {item.primary ? (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B00] text-[#111111] shadow-[0_0_24px_rgba(255,107,0,0.7)]">
                <Icon className="h-7 w-7" />
              </span>
            ) : (
              <Icon className="h-5 w-5 text-white/55" />
            )}
            <span className="font-mono text-[0.55rem] uppercase text-white/35">{item.label}</span>
          </a>
        )
      })}
    </div>
  )
}

function HomePage() {
  return (
    <div className="overflow-x-hidden bg-[#111111] font-body text-[#F5F5F5]">
      <Nav />
      <main className="block">
        <Hero />
        <About />
        <Experiences />
        <Gallery />
        <Community />
        <Events />
        <Merchandise />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}
