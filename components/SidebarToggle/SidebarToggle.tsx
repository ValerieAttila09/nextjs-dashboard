import { Sidebar } from "lucide-react";
import { Button } from "../ui/button";


export default function SidebarToggle({ toggleSidebar, classes }: { toggleSidebar: any, classes: any }) {
  return (
    <Button variant="outline" onClick={toggleSidebar} className={`${classes}`}>
      <Sidebar size={18} color="#525252"/>
    </Button>
  )
}