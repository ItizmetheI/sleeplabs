import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

type DropdownItem = {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
};

type DropdownColumn = {
  title: string;
  items: DropdownItem[];
};

type NavItem = {
  label: string;
  href: string;
  columns?: DropdownColumn[];
};

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'BEST MATTRESS',
    href: '/best/overall',
    columns: [
      {
        title: 'By Sleeper Type',
        items: [
          { label: 'Best Overall', href: '/best/overall' },
          { label: 'Back Sleepers', href: '/best/back-sleepers' },
          { label: 'Side Sleepers', href: '/best/side-sleepers' },
          { label: 'Stomach Sleepers', href: '/best/stomach-sleepers' },
          { label: 'Combination Sleepers', href: '/best/combination-sleepers' },
          { label: 'Heavy Sleepers', href: '/best/heavy-sleepers' },
          { label: 'Couples', href: '/best/couples' },
        ]
      },
      {
        title: 'By Sleep Concern',
        items: [
          { label: 'Back Comfort', href: '/best/back-pain' },
          { label: 'Hip Comfort', href: '/best/hip-pain' },
          { label: 'Shoulder Comfort', href: '/best/shoulder-pain' },
          { label: 'Hot Sleepers / Cooling', href: '/best/cooling' },
          { label: 'Motion Isolation', href: '/best/motion-isolation' },
          { label: 'Pressure Relief', href: '/best/pressure-relief' },
        ]
      },
      {
        title: 'By Type & Budget',
        items: [
          { label: 'Best Luxury', href: '/best/luxury' },
          { label: 'Best Hybrid', href: '/best/hybrid' },
          { label: 'Best Organic', href: '/best/organic' },
          { label: 'Best Memory Foam', href: '/best/memory-foam' },
          { label: 'Best Value', href: '/best/value' },
          { label: 'All Categories →', href: '/best/overall' },
        ]
      }
    ]
  },
  {
    label: 'REVIEWS',
    href: '/reviews',
    columns: [
      {
        title: 'Popular Reviews',
        items: [
          { label: 'Amerisleep AS3', href: '/reviews/amerisleep-as3' },
          { label: 'Saatva Classic', href: '/reviews/saatva-classic' },
          { label: 'Helix Midnight Luxe', href: '/reviews/helix-midnight-luxe' },
          { label: 'Avocado Green', href: '/reviews/avocado-green' },
          { label: 'PlushBeds Signature Bliss', href: '/reviews/plushbeds-signature-bliss' },
          { label: 'GhostBed Flex', href: '/reviews/ghostbed-flex' }
        ]
      },
      {
        title: 'Shop by Need',
        items: [
          { label: 'Side Sleepers', href: '/best/side-sleepers' },
          { label: 'Back Sleepers', href: '/best/back-sleepers' },
          { label: 'Hot Sleepers', href: '/best/cooling' },
          { label: 'Couples', href: '/best/couples' },
          { label: 'Organic Mattresses', href: '/best/organic' },
          { label: 'Value Mattresses', href: '/best/value' }
        ]
      },
      {
        title: 'Browse the Library',
        items: [
          { label: 'All 59 Reviews', href: '/reviews' },
          { label: 'Browse 24 Brands', href: '/brands' },
          { label: 'Ranked Categories', href: '/best/overall' },
          { label: 'Head-to-Head Comparisons', href: '/comparison' },
          { label: 'Scoring Methodology', href: '/methodology' },
          { label: 'Sleep Topics', href: '/topics' }
        ]
      }
    ]
  },
  {
    label: 'GUIDES',
    href: '/guides',
    columns: [
      {
        title: 'Buying Guides',
        items: [
          { label: 'First-Time Buyer Guide', href: '/blog/mattress-buying-guide-for-first-time-buyers' },
          { label: 'How to Read a Spec Sheet', href: '/blog/how-to-read-a-mattress-spec-sheet' },
          { label: 'Firm vs Soft Mattress', href: '/blog/firm-vs-soft-mattress' },
          { label: 'Memory Foam vs Latex', href: '/blog/memory-foam-vs-latex-mattress' },
          { label: 'Evaluate a Home Trial', href: '/blog/how-to-evaluate-a-mattress-trial-period' },
          { label: 'All Guides', href: '/guides' },
        ]
      }
    ]
  },
  {
    label: 'BLOG',
    href: '/blog',
    columns: [
      {
        title: 'Popular Articles',
        items: [
          { label: 'How Memory Foam Works', href: '/blog/how-does-memory-foam-work' },
          { label: 'Mattress Certifications', href: '/blog/what-mattress-certifications-actually-mean' },
          { label: 'Compare Two Mattresses', href: '/blog/how-to-choose-between-two-mattresses' },
          { label: 'Mattress Trial Guide', href: '/blog/what-the-100-night-trial-actually-covers' },
          { label: 'Build a Sleep Routine', href: '/blog/how-to-build-a-sleep-routine-that-works' },
          { label: 'All Posts', href: '/blog' }
        ]
      },
      {
        title: 'Categories & Tags',
        items: [
          { label: 'Sleep Science', href: '/blog/category/sleep-science' },
          { label: 'Product Comparisons', href: '/blog/category/product-comparison' },
          { label: 'Mattress Care', href: '/blog/category/mattress-care' },
          { label: 'Mattress Reviews', href: '/blog/tag/mattress-reviews' },
          { label: 'Adjustable Beds', href: '/blog/tag/adjustable-beds' },
          { label: 'Bed Frames', href: '/blog/tag/bed-frames' }
        ]
      }
    ]
  },
  {
    label: 'KEY TOPICS',
    href: '/topics',
    columns: [
      {
        title: 'Sleep Science',
        items: [
          { label: 'Sleep Cycles Explained', href: '/topics/sleep-cycles' },
          { label: 'Spinal Alignment', href: '/topics/spinal-alignment' },
          { label: 'Motion Isolation', href: '/topics/motion-isolation' },
          { label: 'Edge Support', href: '/topics/edge-support' },
          { label: 'All Topics', href: '/topics' }
        ]
      },
      {
        title: 'Materials & Certifications',
        items: [
          { label: 'Memory Foam Explained', href: '/topics/memory-foam' },
          { label: 'Cooling Technology', href: '/topics/cooling-technology' },
          { label: 'Pocketed Coils Guide', href: '/topics/pocketed-coils' },
          { label: 'CertiPUR-US Explained', href: '/topics/certipur-us' }
        ]
      }
    ]
  },
  {
    label: 'COMPARISON',
    href: '/comparison',
    columns: [
      {
        title: 'Popular Comparisons',
        items: [
          { label: 'AS3 vs Saatva Classic', href: '/comparison/amerisleep-as3-vs-saatva-classic' },
          { label: 'Organica vs Avocado Green', href: '/comparison/amerisleep-organica-vs-avocado-green' },
          { label: 'AS5 Hybrid vs Leesa Sapira Chill', href: '/comparison/amerisleep-as5-hybrid-vs-leesa-sapira-chill-hybrid' },
          { label: 'AS6 vs Saatva RX', href: '/comparison/amerisleep-as6-black-series-vs-saatva-rx' },
          { label: 'AS2 vs Brooklyn Bedding Plank Firm', href: '/comparison/amerisleep-as2-vs-brooklyn-bedding-plank-firm' },
          { label: 'All 30 Comparisons', href: '/comparison' }
        ]
      },
      {
        title: 'Compare and Verify',
        items: [
          { label: 'All 59 Reviews', href: '/reviews' },
          { label: 'Browse 24 Brands', href: '/brands' },
          { label: 'Full Score Field', href: '/best/overall' },
          { label: 'Scoring Methodology', href: '/methodology' },
          { label: 'Editorial Policy', href: '/editorial-policy' },
          { label: 'Published Model Manifest', href: '/model-coverage.json' }
        ]
      }
    ]
  }
];

const DesktopDropdownItem = ({ link }: { link: DropdownItem }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a 
        href={link.href}
        className="text-body-md text-on-surface-variant hover:text-secondary transition-colors py-1.5 flex justify-between items-center pr-4"
      >
        <span>{link.label}</span>
        {link.subItems && <ChevronDown className="w-4 h-4 -rotate-90 ml-2" />}
      </a>
      <AnimatePresence>
        {hovered && link.subItems && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-0 right-0 translate-x-[90%] -mt-4 ml-2 bg-white rounded-lg p-6 shadow-xl border border-outline-variant/20 z-[80] w-64 cursor-default"
          >
            <div className="flex flex-col">
              {link.subItems.map((subLink, subIdx) => (
                <a 
                  key={subIdx} 
                  href={subLink.href}
                  className="block text-body-md text-on-surface-variant hover:text-secondary transition-colors py-1.5"
                >
                  {subLink.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TopNavBar({ currentPath = '/' }: { currentPath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const navBackground = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]);
  const navBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(24px)"]);
  
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (label: string) => {
    setHoveredNav(label);
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "text-primary border-b-2 border-secondary pb-1 text-[11px] font-label-sm uppercase tracking-normal transition-colors duration-200"
      : "text-on-surface-variant text-[11px] font-label-sm uppercase tracking-normal hover:text-secondary hover:transform hover:scale-105 transition-all duration-200";

  const getGridColsClass = (num: number) => {
    if (num === 1) return 'grid-cols-1 min-w-[320px]';
    if (num === 2) return 'grid-cols-2 gap-x-8 gap-y-0 min-w-[480px]';
    if (num === 3) return 'grid-cols-3 gap-x-8 gap-y-0 min-w-[600px]';
    return 'grid-cols-1';
  };

  const toggleAccordion = (label: string) => {
    setOpenAccordion(prev => prev === label ? null : label);
  };

  return (
    <>
      <motion.nav 
        style={{
          backgroundColor: mobileMenuOpen ? 'rgba(255, 255, 255, 0.95)' : navBackground,
          backdropFilter: mobileMenuOpen ? 'blur(24px)' : navBlur,
          WebkitBackdropFilter: mobileMenuOpen ? 'blur(24px)' : navBlur
        }}
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${scrolled || mobileMenuOpen ? 'border-[rgba(15,23,42,0.1)] shadow-sm' : 'border-transparent'}`}
      >
        <div className="max-w-container-max mx-auto w-full h-[72px] flex justify-between items-center px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-4">
            <a href="/" className="text-headline-md font-headline-md  text-primary inline-block relative z-[60]">PureSleep</a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative flex items-center h-full group"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(item.label)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) handleMouseLeave();
                }}
              >
                <a 
                  href={item.href} 
                  className={getNavClass({ isActive: currentPath === item.href || (item.label !== 'HOME' && currentPath !== '/' && currentPath.startsWith(item.href)) })}
                >
                  {item.label}
                </a>

                <AnimatePresence>
                  {hoveredNav === item.label && item.columns && (
                    <motion.div
                      initial={false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg p-8 shadow-xl border border-outline-variant/20 z-[70] cursor-default"
                    >
                      <div className={`grid ${getGridColsClass(item.columns.length)}`}>
                        {item.columns.map((col, idx) => (
                          <div key={idx} className="flex flex-col">
                            <h4 className="text-label-sm font-label-sm uppercase tracking-normal text-secondary font-bold mb-4">
                              {col.title}
                            </h4>
                            <div className="flex flex-col">
                              {col.items.map((link, linkIdx) => (
                                <DesktopDropdownItem key={linkIdx} link={link} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden items-center relative z-[60]">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-on-surface-variant hover:text-secondary transition-colors p-1"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            id="mobile-navigation"
            className="fixed inset-0 z-40 lg:hidden glass-panel-heavy pt-[90px] px-margin-mobile overflow-y-auto pb-12"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-outline-variant/30 py-2">
                  {item.columns ? (
                    <div>
                      <button 
                        onClick={() => toggleAccordion(item.label)}
                        className="w-full flex items-center justify-between py-3 text-left font-label-lg font-bold tracking-normal text-primary uppercase"
                        aria-expanded={openAccordion === item.label}
                        aria-controls={`mobile-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                      >
                        {item.label}
                        {openAccordion === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <AnimatePresence>
                        {openAccordion === item.label && (
                          <motion.div
                            id={`mobile-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="py-2 flex flex-col gap-6 pl-2 pb-6">
                              {item.columns.map((col, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                  <h4 className="text-label-sm font-label-sm uppercase tracking-normal text-secondary font-bold mb-2">
                                    {col.title}
                                  </h4>
                                  {col.items.map((link, linkIdx) => (
                                    <div key={linkIdx} className="flex flex-col">
                                      <a 
                                        href={link.href}
                                        className="block text-body-md text-on-surface-variant hover:text-secondary py-1.5 font-medium"
                                      >
                                        {link.label}
                                      </a>
                                      {link.subItems && (
                                        <div className="pl-4 border-l-2 border-outline-variant/30 flex flex-col gap-1 my-1">
                                          {link.subItems.map((s, sIdx) => (
                                            <a key={sIdx} href={s.href} className="block text-body-md text-on-surface-variant hover:text-secondary py-1 pl-2">
                                              {s.label}
                                            </a>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a 
                      href={item.href}
                      className="block py-3 font-label-lg font-bold tracking-normal text-primary uppercase"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
