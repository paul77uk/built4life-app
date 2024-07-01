import ProgramSidebar from "./programs-sidebar";
import ProgramsSidebar2 from "./programs-sidebar1";

const ProgramLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex m-5 gap-5">
      <div className="">
        <ProgramsSidebar2 />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
export default ProgramLayout;
