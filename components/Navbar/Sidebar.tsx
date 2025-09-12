import { ArchiveIcon, BoxIcon, ChartBar, FileAxis3dIcon, LineChartIcon, SquareStack, User2Icon, Wallet2Icon } from "lucide-react";
import { Button } from "../ui/button";

function DashboardMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <ChartBar size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Dashboard</span>
    </Button>
  )
}
function JobsMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <SquareStack size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Jobs</span>
    </Button>
  )
}
function StatisticsMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <LineChartIcon size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Statistics</span>
    </Button>
  )
}
function UsersMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <User2Icon size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Users</span>
    </Button>
  )
}
function ContainerMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <BoxIcon size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Container</span>
    </Button>
  )
}
function DocumentMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <FileAxis3dIcon size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Document</span>
    </Button>
  )
}
function ArchiveMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <ArchiveIcon size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Archive</span>
    </Button>
  )
}
function WalletMenu({ menu }: { menu: any }) {
  return (
    <Button size={"default"} variant={"ghost"} className="overflow-hidden w-full flex items-center justify-start gap-2">
      <Wallet2Icon size={20} color="#525252" className="" />
      <span ref={menu} className="text-md text-neutral-800 outfit-regular">Wallet</span>
    </Button>
  )
}

export default function Sidebar({
  isDashboard, classes, element, menu
}: {
  isDashboard: boolean,
  classes: any,
  element: any,
  menu: any
}) {

  const menuList = [<DashboardMenu menu={undefined}/>, <JobsMenu menu={undefined}/>, <StatisticsMenu menu={undefined}/>, <UsersMenu menu={undefined}/>, <ContainerMenu menu={undefined}/>, <DocumentMenu menu={undefined}/>, <ArchiveMenu menu={undefined}/>, <WalletMenu menu={undefined}/>]

  return (
    <div
      ref={element}
      className={`${classes} w-[280px] relative`}
      style={{ minWidth: 0 }}
    >
      <div className="grid gap-2 py-2 px-2">
        {menuList.map((menu, index) => (
          <div key={index + 1}>
            {menu}
          </div>
        ))}
      </div>
    </div>
  )
}