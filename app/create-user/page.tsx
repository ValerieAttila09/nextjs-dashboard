"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const CreateUserPage = () => {

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (res.ok) {
        toast.success("User created successfully!");
        form.reset();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to create user.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err)
    }
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto py-6">
        <h1 className="mb-5 text-4xl font-medium text-neutral-900">Create User</h1>
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
                  <FormDescription>This is your public diplay name.</FormDescription>
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
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>Please enter unique and easy password to remember.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"ghost"} type="submit" className="border border-[#fafafa] my-4 shadow hover:border-[#ebebeb] transition-all">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateUserPage