import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProjectForm from "@/components/projects/ProjectForm";
import { createProject, deleteProjectById, fetchMessages, fetchProjects, updateProject } from "@/lib/firestore";
import { toast } from "sonner";
import type { Project } from "@shared/api";

const ADMIN_EMAIL = "wahadis@gmail.com";
const ADMIN_PASSWORD = "wahadis67$";
const AUTH_TOKEN_KEY = "__admin_auth";

export default function Dashboard() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated from localStorage
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token === ADMIN_EMAIL) {
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    (async () => {
      try {
        setProjectsLoading(true);
        const [p, m] = await Promise.all([fetchProjects(), fetchMessages()]);
        setProjects(p);
        setMessages(m);
      } catch (err) {
        console.error("Failed to load data:", err);
        toast.error("Failed to load projects and messages");
      } finally {
        setProjectsLoading(false);
      }
    })();
  }, [isAuthed]);

  const login = async () => {
    try {
      setLoading(true);
      // Validate user input against hardcoded credentials
      if (inputEmail === ADMIN_EMAIL && inputPassword === ADMIN_PASSWORD) {
        localStorage.setItem(AUTH_TOKEN_KEY, ADMIN_EMAIL);
        setIsAuthed(true);
        setInputEmail("");
        setInputPassword("");
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthed(false);
    setProjects([]);
    setMessages([]);
    toast.success("Logged out");
  };

  const refreshProjects = async () => {
    try {
      const p = await fetchProjects();
      setProjects(p);
    } catch (err) {
      toast.error("Failed to refresh projects");
    }
  };

  const refreshMessages = async () => {
    try {
      const m = await fetchMessages();
      setMessages(m);
    } catch (err) {
      toast.error("Failed to refresh messages");
    }
  };

  const create = async (data: Omit<Project, "id" | "createdAt">) => {
    try {
      await createProject(data);
      setEditing(null);
      toast.success("Project created");
      await refreshProjects();
    } catch (err: any) {
      toast.error(err.message || "Failed to create project");
    }
  };

  const update = async (p: Project) => {
    try {
      await updateProject(p.id, {
        title: p.title,
        description: p.description,
        link: p.link,
        imageBase64: p.imageBase64,
      });
      setEditing(null);
      toast.success("Project updated");
      await refreshProjects();
    } catch (err: any) {
      toast.error(err.message || "Failed to update project");
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteProjectById(id);
      toast.success("Project deleted");
      await refreshProjects();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete project");
    }
  };

  if (!isAuthed) {
    return (
      <section className="container py-16">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Sign in to manage projects and messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
                className="grid gap-4"
              >
                <div>
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Signing in..." : "Login as Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="projects" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">{editing ? "Edit" : "New"} Project</CardTitle>
                <CardDescription>Fill in project details below.</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectForm
                  initial={editing}
                  onSubmit={async (data) => {
                    if (editing) await update({ ...editing, ...data });
                    else await create(data);
                  }}
                />
                {editing && (
                  <Button variant="ghost" className="w-full mt-3" onClick={() => setEditing(null)}>
                    Clear
                  </Button>
                )}
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects ({projects.length})</CardTitle>
                    <CardDescription>Click to edit or delete.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <p className="text-sm text-muted-foreground">Loading...</p>
                ) : projects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No projects yet. Create one to get started.</p>
                ) : (
                  <div className="grid gap-3">
                    {projects.map((p) => (
                      <div key={p.id} className="group flex items-start gap-3 rounded-lg border bg-card p-4 hover:shadow-sm transition-shadow">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.imageBase64} className="h-16 w-16 rounded-lg object-cover flex-shrink-0" alt={p.title} />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{p.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
                          <a href={p.link} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">
                            View →
                          </a>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button size="sm" variant="ghost" onClick={() => setEditing(p)}>Edit</Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => remove(p.id)}>Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages ({messages.length})</CardTitle>
              <CardDescription>Latest submissions appear first.</CardDescription>
            </CardHeader>
            <CardContent>
              {projectsLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages yet. Visitors can reach you via the contact form.</p>
              ) : (
                <div className="grid gap-3">
                  {messages.map((m) => (
                    <div key={m.id} className="rounded-lg border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{m.name}</p>
                            <a href={`mailto:${m.email}`} className="text-xs text-primary hover:underline">
                              {m.email}
                            </a>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{m.message}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive flex-shrink-0"
                          onClick={async () => {
                            const { deleteMessageById } = await import("@/lib/firestore");
                            await deleteMessageById(m.id);
                            await refreshMessages();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
