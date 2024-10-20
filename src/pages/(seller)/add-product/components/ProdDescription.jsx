import { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { IconUpload } from "@tabler/icons-react";
import { setProductField } from "../../../../store/slices/productSlice";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
  const name = useSelector((state) => state.product.name);
  const description = useSelector((state) => state.product.description);
  const fileInputRef = useRef(null);

  // Convert initial HTML content to DraftJS EditorState
  const [editorState, setEditorState] = useState(() => {
    const contentBlock = htmlToDraft(description || "");
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const htmlContent = draftToHtml(
      convertToRaw(newEditorState.getCurrentContent())
    );
    dispatch(
      setProductField({
        field: "descriptions",
        value: htmlContent,
      })
    );
  };

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

        const contentBlock = htmlToDraft(htmlContent);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
          dispatch(
            setProductField({
              field: "descriptions",
              value: htmlContent,
            })
          );
        }
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
          <p className="my-0 mb-1 text-[#212020] text-sm text-start">
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
                setProductField({
                  field: "name",
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="my-0 pb-1 text-[#212020] text-sm">
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
          <div className="border border-gray-300 rounded-md">
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class h-[300px] px-4"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "emoji",
                  "history",
                ],
                inline: {
                  options: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "superscript",
                    "subscript",
                  ],
                },
                textAlign: {
                  inDropdown: false,
                  options: ["left", "center", "right"],
                },
                link: {
                  inDropdown: false,
                  showOpenOptionOnHover: true,
                  defaultTargetOption: "_blank",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;
