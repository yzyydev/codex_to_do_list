import "./globals.css";

export const metadata = {
  title: "NextJS To Do List App",
  description: "A minimal black and white Next.js To Do List application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
