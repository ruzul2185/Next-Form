const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div>header</div>
      <section>{children}</section>
    </>
  );
};

export default DashboardLayout;
