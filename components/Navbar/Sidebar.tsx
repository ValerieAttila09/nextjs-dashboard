import { ArchiveIcon, BoxIcon, ChartBar, FileAxis3dIcon, LineChartIcon, SquareStack, User2Icon, Wallet2Icon, ZapIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRef } from "react";

export default function Sidebar({
  isDashboard, classes, element, menuRefs
}: {
  isDashboard: boolean,
  classes: any,
  element: any,
  menuRefs: React.MutableRefObject<Array<HTMLSpanElement | null>>
}) {
  const menus = [
    { icon: <ChartBar size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Dashboard", href: "/dashboard" },
    { icon: <SquareStack size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Jobs", href: "/" },
    { icon: <LineChartIcon size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Statistics", href: "/statistics" },
    { icon: <User2Icon size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Users", href: "/" },
    { icon: <BoxIcon size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Container", href: "/" },
    { icon: <FileAxis3dIcon size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Document", href: "/" },
    { icon: <ArchiveIcon size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Archive", href: "/" },
    { icon: <Wallet2Icon size={20} color="#525252" className="min-h-[20px] min-w-[20px]" />, label: "Wallet", href: "/" },
  ]

  return (
    <div
      ref={element}
      className={`${classes} w-[280px] relative overflow-hidden`}
      style={{ minWidth: 0 }}
    >
      <div className="flex flex-col gap-2 py-2 px-2">
        <div className="grid gap-2">
          <div className="py-4 px-1 flex items-center justify-start gap-2">
            <div className="size-8 rounded-full p-1 bg-white flex items-center justify-center">
              <ZapIcon size={20} color="#343434"/>
            </div>
          </div>
          <div className="grid gap-2">
            {menus.map((menu, idx) => (
              <Link
                key={menu.label}
                href={menu.href}
                className="h-9 px-4 py-2 has-[>svg]:px-3 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/80 overflow-hidden w-full flex items-center justify-start gap-2"
              >
                {menu.icon}
                <span
                  ref={el => { menuRefs.current[idx] = el; }}
                  className="text-md text-neutral-800 outfit-regular"
                  style={{ display: "inline-block", transition: "width 0.3s" }}
                >
                  {menu.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}