"use client"

import React from 'react'
import { Button } from './ui/button'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { deleteUser } from '@/server/users';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface UserDeleteButtonProps {
    userId: string;
}

export default function UserDeleteButton({ userId }: UserDeleteButtonProps) {

    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);

    async function handleDelete() {
        try {
            setIsDeleting(true);
            await deleteUser(userId);
            toast.success("User deleted successfully");
            router.refresh();
            setIsOpen(false);
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to delete user");
        }
        finally {
            setIsDeleting(false);
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        Delete
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
                    <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
