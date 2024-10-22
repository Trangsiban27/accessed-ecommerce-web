import { Color } from "@tiptap/extension-color";
import { useRef } from "react";
import { styled } from "@mui/material/styles";
import { IconUpload } from "@tabler/icons-react";
import { Button } from "@mui/material";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useFormContext } from "react-hook-form";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const colorList = [
  "#25262b",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];

const ProdDescription = () => {
  const fileInputRef = useRef(null);
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: getValues("description"),
    onUpdate: ({ editor: _editor }) => {
      setValue("description", _editor.getHTML());
    },
  });

  const handleParseTxtFile = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        const htmlContent = content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/\n/g, "<br>")
          .replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
        setValue("description", htmlContent),
          editor?.commands.setContent(htmlContent);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg mb-3 p-3">
      <p className="font-medium text-lg text-start">
        Description <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid mt-3 border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <div className="flex items-center justify-between gap-3 ">
            <p className="my-0 pb-1 text-[#212020] text-md font-semibold">
              Business Description <span className="text-red-600"> *</span>
            </p>

            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              className="capitalize"
              startIcon={<IconUpload size={20} className="mb-[1px]" />}
            >
              Upload .txt files
              <VisuallyHiddenInput
                ref={fileInputRef}
                type="file"
                onInput={handleParseTxtFile}
                accept=".txt"
                multiple
              />
            </Button>
          </div>
          <RichTextEditor
            editor={editor}
            w="100%"
            styles={{
              content: {
                minHeight: "300px",
                overflowY: "scroll",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                textAlign: "start",
              },
            }}
          >
            <RichTextEditor.Toolbar>
              <RichTextEditor.ColorPicker colors={colorList} />

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.Highlight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            {editor && (
              <BubbleMenu editor={editor}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Link />
                </RichTextEditor.ControlsGroup>
              </BubbleMenu>
            )}

            <RichTextEditor.Content />
          </RichTextEditor>
          {errors.description && (
            <p className="text-sm text-start text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;
