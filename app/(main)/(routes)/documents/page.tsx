"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

type Props = {}

const DocumentsPage = (props: Props) => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({title: "Untitled"})
    .then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    })
  };

  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <Image
      src="/images/empty.png"
      alt="empty"
      width="300"
      height="300"
      className="dark:hidden"
      />
      <Image
      src="/images/empty-dark.png"
      alt="empty"
      width="300"
      height="300"
      className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Notion</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2"/>
        Create a Note
      </Button>
    </div>
  )
}

export default DocumentsPage