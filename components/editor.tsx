"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, BlockSchema, InlineContentSchema, PartialBlock, StyleSchema } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEdgeStore } from "@/lib/edgestore";

type Props = {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}
// PartialBlock<BlockSchema, InlineContentSchema, StyleSchema>[]

const Editor = ({onChange, initialContent, editable}: Props) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async(file: File) => {
    const response = await edgestore.publicFiles.upload({file});
    return response.url;
  };

    const editor: BlockNoteEditor = useBlockNote({
      editable,
      initialContent: initialContent ? JSON.parse(initialContent) : undefined,
      onEditorContentChange: (editor) => {
        onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
      },
      uploadFile: handleUpload
    });

  return (
    <BlockNoteView
    editor={editor}
    theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  )
}

export default Editor