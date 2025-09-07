"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const EditUserPage = ({ idUser }: { idUser: string }) => {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  // Fetch user data by id and set as default values
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return
      const res = await fetch(`/api/view-user/${id}`)
      if (res.ok) {
        const user = await res.json()
        form.reset({
          username: user.username || "",
          email: user.email || "",
          password: "" // don't prefill password
        })
      } else {
        toast.error("Failed to fetch user data.")
      }
    }
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(`/api/update-user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      })

      if (res.ok) {
        toast.success("User updated successfully!")
        router.push("/users") // redirect or refresh as needed
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to update user.")
      }
    } catch (err) {
      toast.error("Something went wrong!")
      console.error(err)
    }
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto py-6">
        <h1 className="mb-5 text-4xl font-medium text-neutral-900">Edit User</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>Email is required to create your account.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Leave blank if you don't want to change the password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"ghost"} type="submit" className="border border-[#fafafa] my-4 shadow hover:border-[#ebebeb] transition-all">Update</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditUserPage