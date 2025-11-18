export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Olawale Oladimeji. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/in/oladimeji-hayatullahi-70413222b" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href="https://github.com/hayatullahi67" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href="https://x.com/olawale217820" target="_blank" rel="noreferrer" className="hover:text-foreground">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
