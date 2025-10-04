"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser, updateUser } from "@/server/users"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { User } from "@/db/schema"

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
})

interface UserFormProps {
    user?: User
}

export default function UserForm({ user }: UserFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username || "",
            email: user?.email || "",
        },
    })




    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const userData = {
                ...values,
                password: "defaultpassword",
            }
            if (user) {
                await updateUser({ ...userData, id: user.id, });
            } else {
                await createUser(userData);
            }
            form.reset();

            toast.success(user ? "User updated successfully" : "User created successfully");
            router.refresh();
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            toast.error("Failed to create user");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
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
                                <Input placeholder="shadcn@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Submitting..." : ` ${user ? "Update" : "Create"} User`}
                </Button>
            </form>
        </Form>
    )
}
