import Navbar from "@/app/common/Navbar";
import Footer from "@/app/common/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen">{children}</main>
      <Footer/>
    </>
  );
}
