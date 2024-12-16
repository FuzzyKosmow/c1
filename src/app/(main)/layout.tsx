import ContactNav from "@/components/ContactNav";
import { Footer } from "@/components/Footer";
import HomeSideBar from "@/components/HomeSideBar";
import NavHeader from "@/components/NavHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ContactNav />
      <NavHeader />
      <div className="flex flex-row gap-5 px-24 py-10">
        <div className="w-1/6">
          <HomeSideBar />
        </div>
        <div className="w-5/6">{children}</div>
      </div>

      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
