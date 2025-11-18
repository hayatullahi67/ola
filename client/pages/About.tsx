import { Button } from "@/components/ui/button";

const avatarSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>
  <defs>
    <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0%' stop-color='#6366f1'/>
      <stop offset='50%' stop-color='#06b6d4'/>
      <stop offset='100%' stop-color='#10b981'/>
    </linearGradient>
  </defs>
  <rect width='240' height='240' rx='24' fill='url(#g)'/>
  <text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='Poppins, Inter, sans-serif' font-size='72' fill='white'>OO</text>
</svg>`;
const avatarBase64 = `data:image/svg+xml;base64,${btoa(avatarSvg)}`;

const resumePdfBase64 = "data:application/pdf;base64,JVBERi0xLjMKMSAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkcyBbMiAwIFJdPj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCAxIDAgUi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDMgMCBSPj4KZW5kb2JqCjMgMCBvYmoKPDwvTGVuZ3RoIDQ+PgpzdHJlYW0KJSBCTEFOSyBQQURFCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjAgMDAwMDAgbiAKMDAwMDAwMDA5MCAwMDAwMCBuIAp0cmFpbGVyCjw8L1Jvb3QgMSAwIFIvU2l6ZSA0Pj4Kc3RhcnR4cmVmCjExMQolJUVPRg==";

export default function About() {
  const skills = ["HTML", "CSS", "Tailwind", "React", "Next.js", "Vue", "Firebase", "Supabase"];
  return (
    <section className="container py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarBase64} alt="Olawale Oladimeji" className="mx-auto h-56 w-56 rounded-3xl shadow-soft" />
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">About Me</h1>
          <p className="mt-4 text-muted-foreground">I am a React Full Stack Developer focused on building high-impact products with elegant UI and robust backend integrations. I help businesses ship faster, scale reliably, and look great doing it.</p>
          <Button asChild className="mt-6"><a href={resumePdfBase64} download="Olawale-Oladimeji-Resume.pdf">Download Resume</a></Button>
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((s) => (
            <div key={s} className="rounded-xl border bg-card p-4 text-center shadow-sm">{s}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
