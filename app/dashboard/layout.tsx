const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex-grow px-6 md:px-12 mx-auto max-w-6xl">{children}</div>
  );
};
export default DashboardLayout;
