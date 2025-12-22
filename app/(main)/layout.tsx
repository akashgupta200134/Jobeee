import Navbar from "@/app/common/Navbar";
// import Footer from "@/app/common/Footer";

export default function MainLayout({
  children}: {children: React.ReactNode;}){
  return (
    <>
     
      <main className="min-h-screen bg-[#e9ece6]">
         <Navbar/>
        {children}
        </main>
      {/* <Footer/> */}
    </>
  );
}
