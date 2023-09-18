"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Form, Panel } from "rsuite";

interface RichTextProps {
  value: string;
  maxLength?: number;
  onChange: (value: string) => void;
}

export function RichText(props: RichTextProps) {
  const editorRef = useRef<any>();

  return (
    <Form.Group>
      <Form.ControlLabel>
        Descrição ({(props.value || "").length}/{props.maxLength || 2048})
      </Form.ControlLabel>
      <Panel bordered>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={props.value}
          init={{
            height: 500,
            menubar: false,
            skin: 'borderless',
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
            max_height: 2024,
          }}
          onChange={(e: any) => props.onChange(e.level.content || "")}
        />
      </Panel>
    </Form.Group>
  );
}
