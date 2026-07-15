import "./globals.css";

export const metadata = {
  title: "Continuumlabs — AI Application Developer",
  description: "Turning ideas into reality. I build intelligent apps, games, and tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
