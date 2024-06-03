import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="pb-10">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
