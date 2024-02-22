"use client";

import { useState } from "react";
import { useMutation } from "convex/react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
    const [file, setFile] = useState<File>()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const update = useMutation(api.documents.update);
    const { documentId } = useParams();

    const {isOpen, onClose, url} = useCoverImage();
    const { edgestore } = useEdgeStore();

    const onModalClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        onClose();
    }

    const onChange = async(file?: File) => {
        if(file){
            setIsSubmitting(true);
            setFile(file);

            
                const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: url
                    }
                });

            await update({
                id: documentId as Id<"documents">,
                coverImage: res.url
            });

            onModalClose();
        }
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                    <div>
                        <SingleImageDropzone
                        className="w-full outline-none"
                        disabled={isSubmitting}
                        value={file}
                        onChange={onChange}
                        />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}