import "../globals.css";

export const metadata = {
  title: "Login",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-300">
      {children}
    </section>
  );
}
