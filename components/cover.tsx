"use client";

import Image from "next/image";
import { ImageIcon, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoverImage } from "@/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    url?: string;
    preview?: boolean;
}

const Cover = ({url, preview}: Props) => {
  const { onOpen, onReplace } = useCoverImage();
  const { documentId } = useParams();
  const { edgestore } = useEdgeStore();

  const removeCover = useMutation(api.documents.removeCover);

  const onRemove = async() => {
    if(url){
      await edgestore.publicFiles.delete({
        url: url
      })
    }
    removeCover({
      id: documentId as Id<"documents">,
    });
  }

  return (
    <div 
    className={cn("relative w-full h-[25vh] group",
    !url && "h-[12vh]",
    url && "bg-muted"
    )}
    >
        {!!url && (
            <Image
            alt="Cover"
            src={url}
            fill
            className="object-cover"
            />
        )}
        {url && !preview && (
          <div 
          className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
            <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={() => onReplace(url)}
            >
              <ImageIcon className="h-4 w-4 mr-2"/>
              Change
            </Button>
            <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={onRemove}
            >
              <Trash2 className="h-4 w-4 mr-2"/>
              Remove
            </Button>
          </div>
        )}
    </div>
  )
}

export default Cover

Cover.Skeleton = function CoverSkeleton(){
  return (
    <Skeleton
    className="w-full h-[12vh]"
    />
  )
}