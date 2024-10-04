import { Color } from "@tiptap/extension-color";
import { useRef } from "react";
import { styled } from "@mui/material/styles";
import { IconUpload } from "@tabler/icons-react";
import { Button, TextField } from "@mui/material";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { BubbleMenu, useEditor } from "@tiptap/react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductField } from "../../../../store/slices/ProductSlice";

import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

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

const ProdDescription = () => {
  const dispatch = useDispatch();
  const description = useSelector((state) => state.product.description);
  const name = useSelector((state) => state.product.name);

  const fileInputRef = useRef < HTMLInputElement > null;
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
    content: description,
    onUpdate: ({ editor: _editor }) => {
      dispatch(
        updateProductField({ field: "description", value: _editor.getHTML() })
      );
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

        dispatch(
          updateProductField({ field: "description", value: htmlContent })
        );
        editor?.commands.setContent(htmlContent);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg mb-3 p-3">
      <p className="font-medium text-lg">
        Description <span className="text-red-600"> *</span>
      </p>
      <div className="border-[2px] border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#797474] text-sm">
            Product name <span className="text-red-600"> *</span>
          </p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            value={name}
            onChange={(e) =>
              dispatch(
                updateProductField({ field: "name", value: e.target.value })
              )
            }
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 ">
            <p className="my-0 pb-1 text-[#797474] text-sm">
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
                height: "318px",
                overflowY: "scroll",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              },
            }}
          >
            <RichTextEditor.Toolbar>
              <RichTextEditor.ColorPicker
                colors={[
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
                ]}
              />

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                {/* <RichTextEditor.ClearFormatting /> */}
                <RichTextEditor.Highlight />
                {/* <RichTextEditor.Code /> */}
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              {/* <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup> */}

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                {/* <RichTextEditor.AlignJustify /> */}
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              {/* <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup> */}
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
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;
