'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/dictionary';
import { getPath } from '@/lib/i18n';

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: dict.menu.attorneys, href: getPath(lang, 'attorneys') },
    { label: dict.menu.practices, href: getPath(lang, 'practices') },
    { label: dict.menu.blog, href: getPath(lang, 'blog') },
  ];

  const switchLang = lang === 'vi' ? '/en' : '/vi';
  const switchLabel = lang === 'vi' ? 'EN' : 'VI';

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-sm shadow-lg'
          : 'bg-navy-900'
      }`}
    >
      <div className="max-w-content mx-auto px-5 lg:px-12">
        {/* Top bar: Logo | Office Name | Lang + Burger */}
        <div className="relative flex items-center justify-between py-3">
          {/* Logo */}
          <Link href={getPath(lang, 'home')} className="flex-none">
            <Image
              src="/images/logo-v6.png"
              alt={dict.logo.alt}
              title={dict.logo.title}
              width={56}
              height={56}
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </Link>

          {/* Centered office name */}
          <h2 className="text-center whitespace-nowrap font-logo font-bold pointer-events-none text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">
            {(dict.navbar.office_name as string[]).map((line, i) => (
              <span key={i} className="block md:inline text-gold-light">
                {line}
              </span>
            ))}
          </h2>

          {/* Lang switcher + burger */}
          <div className="flex items-center space-x-4">
            <Link
              href={switchLang}
              className="flex items-center px-3 py-1.5 text-warm-200 hover:text-gold border border-warm-400/20 hover:border-gold/40 rounded transition duration-200"
            >
              <Image
                src={lang === 'vi' ? '/images/flag-vn.svg' : '/images/flag-us.svg'}
                alt={switchLabel}
                width={24}
                height={16}
                className="inline-block"
              />
              <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 10 6">
                <path d="M0 0l5 6 5-6z" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="block lg:hidden text-warm-200 hover:text-gold focus:outline-none transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex justify-center space-x-8 border-t border-gold/20 py-2.5 max-w-max mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium tracking-wide uppercase text-warm-300 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden bg-navy-800 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-base font-medium tracking-wide text-warm-200 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={getPath(lang, 'contact')}
            className="font-body text-base font-medium tracking-wide text-warm-200 hover:text-gold transition-colors duration-300"
          >
            {dict.menu.contact}
          </Link>
          <a
            href="tel:+84913777995"
            className="flex items-center gap-2 text-gold font-body text-base font-medium pt-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            091 377 7995
          </a>
        </div>
      </div>
    </nav>
  );
}
