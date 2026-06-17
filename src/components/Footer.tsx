export default function Footer() {
  return (
    <footer className="bg-white/80 border-t border-outline-variant/30 mt-auto relative overflow-hidden backdrop-blur-xl w-full py-20 px-margin-mobile md:px-margin-desktop shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="/" className="text-headline-lg font-headline-lg  text-primary hover:text-secondary transition-colors">
            PureSleep
          </a>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-sm text-center md:text-left">
            The Science of Sleep. Expert-led reviews to help you find your best night's rest.
          </p>
          <p className="text-body-sm text-on-surface-variant/50 mt-4">
            © 2026 PureSleep. All rights reserved.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center md:justify-end gap-8 mt-8 md:mt-0">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary font-bold">Company</h4>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/about">About Us</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="mailto:support@puresleep.com">Contact</a>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="text-label-sm font-label-sm uppercase tracking-widest text-secondary font-bold">Legal</h4>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/methodology">Editorial Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/privacy-policy">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-outline-variant/20 text-center relative z-10 max-w-container-max mx-auto">
        <p className="text-xs text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          <strong>Editorial Independence:</strong> PureSleep earns no commission and accepts no paid placements. Scores are editorially independent. Product links go directly to manufacturers.
        </p>
      </div>
    </footer>
  );
}
