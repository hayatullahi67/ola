import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MessageCircle } from "lucide-react";

const EMAILJS_PUBLIC_KEY = "3dRXual5Thw6gbzJd";
const EMAILJS_SERVICE_ID = "service_4eegiva";
const EMAILJS_TEMPLATE_ID = "template_uh6401t";
const CONTACT_EMAIL = "wahadisllahi@gmail.com";
const WHATSAPP_NUMBER = "08073147818";
const PHONE_NUMBER = "07037634124";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);

      const templateParams = {
        to_email: CONTACT_EMAIL,
        from_name: name,
        from_email: email,
        whatsapp: whatsapp,
        message: message,
        time: new Date().toLocaleString(),
        name: name,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      const { createMessage } = await import("@/lib/firestore");
      await createMessage({ name, email, message });

      setName("");
      setEmail("");
      setWhatsapp("");
      setMessage("");
      toast.success("Message sent. I will get back to you soon!");
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Let's work together</h1>
            <p className="mt-3 text-muted-foreground">Tell me about your project and how I can help.</p>

            <form onSubmit={onSubmit} className="mt-8 grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-md border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number (Optional)</label>
                <input id="whatsapp" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="e.g., +234..." className="h-11 rounded-md border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Get in touch</h2>
              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-card transition-colors group"
                >
                  <Mail className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Email</span>
                    <span className="text-sm font-medium">{CONTACT_EMAIL}</span>
                  </div>
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-card transition-colors group"
                >
                  <Phone className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Call</span>
                    <span className="text-sm font-medium">{PHONE_NUMBER}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-card transition-colors group"
                >
                  <MessageCircle className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">WhatsApp</span>
                    <span className="text-sm font-medium">{WHATSAPP_NUMBER}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-4">Connect with me</p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/oladimeji-hayatullahi-70413222b" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://github.com/hayatullahi67" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
                <a href="https://x.com/olawale217820" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
