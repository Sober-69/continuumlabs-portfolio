import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Continuumlabs — AI Application Developer",
  description: "Turning ideas into reality. I build intelligent apps, games, and tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try{const t=localStorage.getItem("theme")||"dark";document.documentElement.classList.add(t)}catch(e){}`
        }} />
      </head>
      <body className="bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100">
        <ThemeToggle />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
