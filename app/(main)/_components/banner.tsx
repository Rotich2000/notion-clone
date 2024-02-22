"use client";

import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import ConfirmModal from '@/components/modals/confirm-modal';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button';

type Props = {
    documentId: Id<"documents">;
}

const Banner = ({documentId}: Props) => {
    const router = useRouter();
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({id: documentId});

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted successfully!",
            error: "Failed to delete Note"
        })
        router.push("/documents")
    }

    const onRestore = () => {
        const promise = restore({id: documentId});

        toast.promise(promise, {
            loading: "Note Restoring...",
            success: "Note restored successfully!",
            error: "Failed to restore note!"
        })
    }
  return (
    <div
    className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'
    >
        <p>
            This page is in the Trash!
        </p>
        <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 h-auto font-normal
        text-white hover:text-white p-1 px-2 transition-all duration-300 ease-in-out"
        >
            Restore
        </Button>
        <ConfirmModal onConfirm={onRemove}>
            <Button
            size="sm"
            variant="outline"
            className="border-white bg-transparent hover:bg-primary/5 h-auto font-normal
            text-white hover:text-white p-1 px-2 transition-all duration-300 ease-in-out"
            >
                Delete
            </Button>
        </ConfirmModal>
    </div>
  )
}

export default Banner