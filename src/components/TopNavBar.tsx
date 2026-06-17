import { Search, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

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
  {
    label: 'SLEEPER TYPES',
    href: '/best/back-sleepers',
    columns: [
      {
        title: 'By Sleep Position',
        items: [
          { label: 'Back Sleepers', href: '/best/back-sleepers' },
          { label: 'Side Sleepers', href: '/best/side-sleepers' },
          { label: 'Stomach Sleepers', href: '/best/stomach-sleepers' },
          { label: 'Combination Sleepers', href: '/best/combination-sleepers' },
          { label: 'Heavy Sleepers', href: '/best/heavy-sleepers' },
          { label: 'Couples', href: '/best/couples' },
        ]
      }
    ]
  },
  {
    label: 'SLEEP CONCERNS',
    href: '/best/back-pain',
    columns: [
      {
        title: 'By Sleep Concern',
        items: [
          { label: 'Back Pain', href: '/best/back-pain' },
          { label: 'Hip Pain', href: '/best/hip-pain' },
          { label: 'Shoulder Pain', href: '/best/shoulder-pain' },
          { label: 'Hot Sleepers', href: '/best/cooling' },
          { label: 'Motion Isolation', href: '/best/motion-isolation' },
          { label: 'Pressure Relief', href: '/best/pressure-relief' },
        ]
      }
    ]
  },
  {
    label: 'TOP PICKS',
    href: '/best/overall',
    columns: [
      {
        title: 'Best of 2026',
        items: [
          { label: 'Best Overall', href: '/best/overall' },
          { label: 'Best Luxury', href: '/best/luxury' },
          { label: 'Best Cooling', href: '/best/cooling' },
          { label: 'Best Hybrid', href: '/best/hybrid' },
          { label: 'Best Organic', href: '/best/organic' },
          { label: 'Best Value', href: '/best/value' },
        ]
      }
    ]
  },
  {
    label: 'REVIEWS',
    href: '/reviews',
    columns: [
      {
        title: 'Amerisleep Models',
        items: [
          { label: 'AS2 Review', href: '/reviews/amerisleep-as2' },
          { label: 'AS3 Review', href: '/reviews/amerisleep-as3' },
          { label: 'AS5 Review', href: '/reviews/amerisleep-as5' },
          { label: 'AS6 Black Series Review', href: '/reviews/amerisleep-as6' },
          { label: 'Organica Review', href: '/reviews/amerisleep-organica' },
          { label: 'All 58 Reviews →', href: '/reviews' },
        ]
      }
    ]
  },
  {
    label: 'COMPARISONS',
    href: '/comparison',
    columns: [
      {
        title: 'Amerisleep vs Amerisleep',
        items: [
          { label: 'AS2 vs AS3', href: '/comparison/amerisleep-as2-vs-as3' },
          { label: 'AS3 vs AS5', href: '/comparison/amerisleep-as3-vs-as5' },
          { label: 'AS3 vs AS6', href: '/comparison/amerisleep-as3-vs-as6' },
          { label: 'AS3 vs Organica', href: '/comparison/amerisleep-as3-vs-organica' },
          { label: 'AS2 vs AS5', href: '/comparison/amerisleep-as2-vs-as5' },
          { label: 'AS6 vs Organica', href: '/comparison/amerisleep-as6-vs-organica' },
        ]
      },
      {
        title: 'vs Other Brands',
        items: [
          { label: 'AS3 vs Saatva Classic', href: '/comparison/amerisleep-as3-vs-saatva-classic' },
          { label: 'AS3 vs Nolah Evolution 15', href: '/comparison/amerisleep-as3-vs-nolah-evolution-15' },
          { label: 'AS3 vs Helix Midnight Luxe', href: '/comparison/amerisleep-as3-vs-helix-midnight-luxe' },
          { label: 'AS5 Hybrid vs Leesa Sapira Chill', href: '/comparison/amerisleep-as5-hybrid-vs-leesa-sapira-chill-hybrid' },
          { label: 'Organica vs Avocado Green', href: '/comparison/amerisleep-organica-vs-avocado-green' },
          { label: 'All Comparisons →', href: '/comparison' },
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
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-0 right-0 translate-x-[90%] -mt-4 ml-2 bg-white rounded-2xl p-6 shadow-xl border border-outline-variant/20 z-[80] w-64 cursor-default"
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
  const navBackground = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const navBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(24px)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["border-transparent", "border-[rgba(15,23,42,0.1)]"]);
  
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleMouseEnter = (label: string) => {
    setHoveredNav(label);
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "text-primary border-b-2 border-secondary pb-1 text-[11px] font-label-sm uppercase tracking-[0.15em] transition-colors duration-200"
      : "text-on-surface-variant text-[11px] font-label-sm uppercase tracking-[0.15em] hover:text-secondary hover:transform hover:scale-105 transition-all duration-200";

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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl p-8 shadow-xl border border-outline-variant/20 z-[70] cursor-default"
                    >
                      <div className={`grid ${getGridColsClass(item.columns.length)}`}>
                        {item.columns.map((col, idx) => (
                          <div key={idx} className="flex flex-col">
                            <h4 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary font-bold mb-4">
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
            
            <button className="ml-2 text-on-surface-variant hover:text-secondary transition-colors">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden items-center gap-4 relative z-[60]">
            <button className="text-on-surface-variant hover:text-secondary transition-colors">
              <Search size={22} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-on-surface-variant hover:text-secondary transition-colors p-1"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden glass-panel-heavy pt-[90px] px-margin-mobile overflow-y-auto pb-12"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-outline-variant/30 py-2">
                  {item.columns ? (
                    <div>
                      <button 
                        onClick={() => toggleAccordion(item.label)}
                        className="w-full flex items-center justify-between py-3 text-left font-label-lg font-bold tracking-widest text-primary uppercase"
                      >
                        {item.label}
                        {openAccordion === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <AnimatePresence>
                        {openAccordion === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="py-2 flex flex-col gap-6 pl-2 pb-6">
                              {item.columns.map((col, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                  <h4 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary font-bold mb-2">
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
                      className="block py-3 font-label-lg font-bold tracking-widest text-primary uppercase"
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
