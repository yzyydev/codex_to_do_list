import "./globals.css";
import { TodoProvider } from "./providers";

export const metadata = {
  title: "NextJS To Do List App",
  description: "A minimal black and white Next.js To Do List application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
