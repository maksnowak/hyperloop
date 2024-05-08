import { PrismaClient } from "@prisma/client";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const prisma = new PrismaClient();

export default async function Home() {
  // const trains = await prisma.trains.findMany();
  const capsules = await prisma.capsules.findMany();

  return <Sidebar />;
}
