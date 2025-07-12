import AdminSideBar from "@/components/ui/dashboard/AdminSideBar";
import AdminNavbar from "@/components/ui/dashboard/AdminNavbar";
import AdminFooter from "@/components/ui/dashboard/AdminFooter";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout d-flex">
      <AdminSideBar />
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        <AdminNavbar />
        <main className="p-4" style={{ marginTop: '60px', minHeight: 'calc(100vh - 60px)' }}>
          {children}
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
