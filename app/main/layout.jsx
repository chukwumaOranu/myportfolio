import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const MainLayout = ({ children }) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
  );
};

export default MainLayout;