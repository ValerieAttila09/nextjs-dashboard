"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Sidebar from "@/components/Navbar/Sidebar"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import SidebarToggle from "@/components/SidebarToggle/SidebarToggle"
import gsap from "gsap"

type User = {
  id: string;
  username: string;
  email: string;
};

const Dashboard = () => {

  const [users, setUsers] = useState<User[]>([])
  const [active, setActive] = useState(true)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const menuRefs = useRef<Array<HTMLSpanElement | null>>([])

  const getAllUser = async () => {
    try {
      const response = await fetch("/api/get-all-user")
      const data = response.json()

      setUsers(await data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: any) => {
    try {
      await fetch(`/api/delete-user/${id}`, {
        method: "DELETE"
      })
      toast.success("User deleted successfully!")
      getAllUser()
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete user!")
    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        width: active ? "60px" : "280px",
        ease: "power2.out",
        duration: 0.4,
      })
      gsap.to(menuRefs.current, {
        opacity: active ? 0 : 1,
        width: active ? 0 : "auto",
        marginLeft: active ? 0 : "8px",
        ease: "power2.inOut",
        duration: 0.4,
        onStart: () => {
          if (active) {
            menuRefs.current.forEach((el) => {
              if (el) el.style.overflow = "hidden"
            })
          }
          if (!active) {
            menuRefs.current.forEach((el) => {
              if (el) el.style.overflow = ""
              gsap.to(el, {
                width: "auto",
                duration: 0.4,
                ease: "power2.inOut"
              })
            })
          }
        },
      })
      setActive(!active)
    }
  }

  return (
    <div className="w-full flex">

      <Sidebar
        element={sidebarRef}
        isDashboard={false}
        classes={"h-screen"}
        menuRefs={menuRefs}
      />

      <div className="w-full pe-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <SidebarToggle toggleSidebar={toggleSidebar} classes={""} />
            <div className="relative w-auto">
              <Input type="text" className="bg-white ps-[30px] text-neutral-800" placeholder="Search" />
              <Search size={16} color="#898989" className="absolute z-5 -translate-y-[26px] translate-x-2" />
            </div>
          </div>
          <div className="">
            <Link href={"/create-user"} className="flex items-center h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
              <Plus size={14} color="#898989" className="" />
              <span className="text-sm text-neutral-800">Add User</span>
            </Link>
          </div>
        </div>
        <div className="h-full bg-white px-8 py-5 rounded-t-xl border border-input">

          <h1 className="mb-5 text-4xl font-medium text-neutral-900">Users List</h1>

          <div className="w-full grid grid-cols-3 gap-4">
            {users.map((user, index) => (
              <div key={user.id} className="col-span-1 w-full p-4 rounded-lg border border-[#ebebeb] hover:shadow-lg transition-all">
                <div className="w-full flex items-center justify-between">
                  <span className="text-sm text-neutral-500 font-thin">{index + 1}</span>
                  <Popover>
                    <PopoverTrigger className="p-1 rounded-md border border-transparent hover:border-[#ebebeb] hover:shadow-sm transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-neutral-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex items-center justify-between mb-1">
                        <h1 className="text-lg outfit-regular text-neutral-900">Operations</h1>
                        <div className="flex items-center gap-2">
                          <div className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-yellow-500"></span>
                          </div>
                          <span className="text-yellow-500 text-sm">Warning</span>
                        </div>
                      </div>
                      <p className="text-sm outfit-thin text-neutral-500">If you execute one of these operations, it can't be undo.</p>

                      <Separator className="my-5" />

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-neutral-600">Username</p>
                          <p className="text-sm text-neutral-800">{user.username}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-neutral-600">Email</p>
                          <p className="text-sm text-neutral-800">{user.email}</p>
                        </div>
                      </div>

                      <Separator className="my-5" />

                      <div className="w-full grid gap-1">
                        <div className="flex items-center justify-between">
                          <p className="text-md text-neutral-700 outfit-regular">Edit</p>
                          <Link href={`/edit-user/${user.id}`} className="w-1/3">
                            <Button variant={"outline"} className="w-full">Edit</Button>
                          </Link>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-md text-red-600 outfit-regular">Delete</p>
                          <AlertDialog>
                            <AlertDialogTrigger className="w-1/3 p-1 rounded-md outfit-medium border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                              Delete
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)} className="bg-red-500 text-white hover:bg-red-600 transition-all">Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="py-3">
                  <h1 className="text-3xl font-medium text-neutral-900">{user.username}</h1>
                  <p className="text-md text-neutral-600">{user.email}</p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard