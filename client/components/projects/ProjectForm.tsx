import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fileToBase64 } from "@/lib/base64";
import { Upload, X } from "lucide-react";
import type { NewProject, Project } from "@shared/api";

export default function ProjectForm({ onSubmit, initial }: { onSubmit: (data: NewProject) => Promise<void> | void; initial?: Project | null }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [link, setLink] = useState(initial?.link ?? "");
  const [imageBase64, setImageBase64] = useState(initial?.imageBase64 ?? "");
  const [loading, setLoading] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    try {
      const dataUrl = await fileToBase64(file);
      setImageBase64(dataUrl);
    } catch (err) {
      console.error("Failed to convert file:", err);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !link || !imageBase64) {
      alert("Please fill in all fields including an image");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ title, description, link, imageBase64 });
      if (!initial) {
        setTitle("");
        setDescription("");
        setLink("");
        setImageBase64("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Project Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g., E-commerce Platform"
          required
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 160))}
          placeholder="Describe what this project does, technologies used, etc."
          required
          rows={3}
          maxLength={160}
        />
        <div className="flex justify-end">
          <p className="text-xs text-muted-foreground">{description.length}/160 characters</p>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="link" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Project Link
        </label>
        <Input
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://project.example.com"
          required
        />
      </div>

      <div className="grid gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Project Image
        </label>
        {imageBase64 ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageBase64} alt={title || "Project"} className="w-full h-40 rounded-lg object-cover border border-border" />
            <button
              type="button"
              onClick={() => setImageBase64("")}
              className="absolute top-2 right-2 bg-destructive/90 hover:bg-destructive text-white rounded-full p-1 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card/50 p-6 cursor-pointer hover:bg-card/80 transition-colors">
            <Upload className="size-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">Upload or paste image</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or Base64</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <span className="animate-spin mr-2">⚙️</span>
              {initial ? "Updating..." : "Creating..."}
            </>
          ) : initial ? (
            "Update Project"
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
}
