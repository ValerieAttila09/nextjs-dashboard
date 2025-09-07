import { Button } from "@/components/ui/button"
import prisma from "@/prisma/client"

const Dashboard = async () => {

  const users = await prisma.user.findMany()

  return (
    <div className="w-full">

      <div className="max-w-5xl mx-auto py-6">
        <h1 className="mb-5 text-4xl font-medium text-neutral-900">Users List</h1>

        <div className="grid grid-cols-3 gap-4">
          {users.map((user, index) => (
            <div key={index} className="p-4 rounded-lg border border-[#ebebeb] hover:shadow-lg transition-all">
              <div className="w-full flex items-center justify-between">
                <span className="text-sm text-neutral-500 font-thin">{index + 1}</span>
                <Button variant={"ghost"} className="border border-transparent hover:border-[#ebebeb] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-neutral-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </Button>
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
  )
}

export default Dashboard