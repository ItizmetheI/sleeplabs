import { RANKING_DISCLOSURE } from '../lib/disclosure';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-outline-variant mt-auto w-full py-20 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="/" className="text-headline-lg font-headline-lg  text-primary hover:text-secondary transition-colors">
            PureSleep
          </a>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-sm text-center md:text-left">
            Evidence-led mattress reviews, transparent scorecards, and side-by-side comparisons for better-informed buying decisions.
          </p>
          <p className="text-body-sm text-on-surface-variant/50 mt-4">
            © 2026 PureSleep. All rights reserved.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end gap-8 mt-8 md:mt-0">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-label-sm font-label-sm uppercase tracking-normal text-secondary font-bold">Company</h4>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/about">About Us</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/reviews">Mattress Reviews</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/comparison">Comparisons</a>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-label-sm font-label-sm uppercase tracking-normal text-secondary font-bold">Legal</h4>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/methodology">Methodology</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/editorial-policy">Editorial Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/disclosure">Disclosure</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/privacy-policy">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-outline-variant/20 text-center max-w-container-max mx-auto">
        <p className="text-xs text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          <strong>Editorial Disclosure:</strong> {RANKING_DISCLOSURE}
        </p>
      </div>
    </footer>
  );
}
