import "./globals.css";
import Sidebar from "@/components/sidebar";

export default async function Home() {
  return <Sidebar />;
}

export const dynamic = 'force-dynamic';