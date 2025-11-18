import { db } from "@/firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import type { NewProject, Project, NewMessage, Message } from "@shared/api";

const projectsCol = collection(db, "projects");
const messagesCol = collection(db, "messages");

export async function fetchProjects(): Promise<Project[]> {
  try {
    const q = query(projectsCol, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }));
  } catch {
    return [];
  }
}

export async function createProject(input: NewProject): Promise<string> {
  const docRef = await addDoc(projectsCol, {
    ...input,
    createdAt: Date.now(),
  });
  return docRef.id;
}

export async function updateProject(id: string, input: Partial<NewProject>): Promise<void> {
  await updateDoc(doc(projectsCol, id), input as any);
}

export async function deleteProjectById(id: string): Promise<void> {
  await deleteDoc(doc(projectsCol, id));
}

export async function createMessage(input: NewMessage): Promise<string> {
  const docRef = await addDoc(messagesCol, { ...input, createdAt: Date.now() });
  return docRef.id;
}

export async function fetchMessages(): Promise<Message[]> {
  try {
    const q = query(messagesCol, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Message, "id">) }));
  } catch {
    return [];
  }
}

export async function deleteMessageById(id: string): Promise<void> {
  await deleteDoc(doc(messagesCol, id));
}
