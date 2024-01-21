import { Box, Input } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface FileDropProps {
  filename: string,
  data: Record<string, any>,
  setData: (data: any) => void
}

export const FileDrop: FC<FileDropProps> = ({ filename, data, setData }) => {

  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((file: File[]) => {
    console.log("onDrop", file)
    if (!file.some(f => f.name === filename)) return;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      console.log(binaryStr)
      setUploaded(true)
      setData({ ...data, [filename]: new Blob([binaryStr as ArrayBuffer]) })
    }
    reader.readAsArrayBuffer(file[0])
    // reader.readAsText(file[0])

  }, [data, filename, setData])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: {
      "text/xml": [".xml"]
    },
    maxFiles: 1
  })

  let text;
  if (uploaded) {
    text = "Uploaded"
  } else if (isDragActive) {
    text = "Drag and drop some files here, or click to select files"
  } else {
    text = `Drop ${filename} here`
  }

  return (
    <Box {...getRootProps()} m={10}>
      <Input {...getInputProps({ name: filename, multiple: false, type: "file" })} />
      <Box m={5}>
        {text}
      </Box>
    </Box>
  )
}