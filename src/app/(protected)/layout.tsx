import Header from "@/components/custom/header";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};

export default DashboardLayout;
