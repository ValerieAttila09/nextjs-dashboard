import { useRef, useState } from "react"
import { Button } from "../ui/button"
import gsap from "gsap"
import SidebarToggle from "../SidebarToggle/SidebarToggle"

export default function Navbar({ isDashboard, classes }: { isDashboard: boolean, classes: any }) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        width: active ? "60px" : "260px",
        ease: "power2.out",
        duration: 0.3,
      })
      setActive(!active)
    }
  }

  return (
    <div
      ref={sidebarRef}
      className={`${classes} w-[260px] relative border-r border-[#dfdfdf]`}
      style={{ minWidth: 0 }}
    >
      <SidebarToggle toggleSidebar={toggleSidebar} classes={"absolute top-8 -right-[14px]"}/>
      {/* Konten sidebar di sini */}
    </div>
  )
}