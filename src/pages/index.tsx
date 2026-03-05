import { Menu, Zap } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import FilterToolbar from "@/components/FilterToolbar";
import MonthlyStats from "@/components/MonthlyStats";
import ProjectSummary from "@/components/ProjectSummary";
import SheetStatus from "@/components/SheetStatus";
import Sidebar from "@/components/Sidebar";
import TransactionsTable from "@/components/TransactionsTable";
import { SheetDataProvider } from "@/context/SheetContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SheetDataProvider>
      <div
        className={`${geistSans.className} ${geistMono.className} min-h-screen bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors`}
      >
        <Head>
          <title>Panel Contable - Unergy</title>
        </Head>

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="lg:pl-64 transition-all duration-300">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border-b border-white/40 dark:border-zinc-800/50 sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-xl text-white shadow-md">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tight">Unergy</span>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
            >
              {" "}
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Dashboard Content */}
          <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <DashboardHeader />
              <FilterToolbar />
            </div>

            <ProjectSummary />

            <SheetStatus />

            <MonthlyStats />

            <TransactionsTable />
          </div>
        </main>
      </div>
    </SheetDataProvider>
  );
}
