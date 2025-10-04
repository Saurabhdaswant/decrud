import { getUsers } from "@/server/users";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import UserDeleteButton from "./user-delete-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import UserForm from "./forms/user-form";
import { Edit, UserPlus } from "lucide-react";


export default async function UsersTable() {
    const users = await getUsers();

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users && users?.length > 0 ? (
                        users.map((user) => (
                            <TableRow key={user?.id}>
                                <TableCell className="font-medium">{user?.id}</TableCell>
                                <TableCell>{user?.username}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.createdAt?.toLocaleString()}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit User</DialogTitle>
                                                <UserForm user={user} />
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <UserDeleteButton userId={user?.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
