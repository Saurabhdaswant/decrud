import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users-table";

import UserForm from "@/components/forms/user-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UserPlus } from "lucide-react";


export default async function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add User <UserPlus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <UserForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <UsersTable />
    </div>
  );
}
