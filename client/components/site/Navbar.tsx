import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-foreground/90 ${isActive ? "text-foreground" : "text-foreground/70"}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">Olawale</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navItemClass} end>Home</NavLink>
          <NavLink to="/about" className={navItemClass}>About</NavLink>
          <NavLink to="/projects" className={navItemClass}>Projects</NavLink>
          <NavLink to="/contact" className={navItemClass}>Contact</NavLink>
          {/* <NavLink to="/dashboard" className={navItemClass}>Dashboard</NavLink> */}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/contact">Hire Me</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
