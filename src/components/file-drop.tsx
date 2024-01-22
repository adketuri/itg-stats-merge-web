import { Box, Flex, Input } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"
import { FC, useCallback } from "react"
import { useDropzone } from "react-dropzone"

interface FileDropProps {
  filename: string,
  formData: Record<string, any>,
  setFormData: (data: any) => void
}

export const FileDrop: FC<FileDropProps> = ({ filename, formData, setFormData }) => {

  const onDrop = useCallback((file: File[]) => {
    console.log("onDrop", file)
    if (!file.some(f => f.name === filename)) return;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result
      console.log(binaryStr)
      setFormData({ ...formData, [filename]: new Blob([binaryStr as ArrayBuffer]) })
    }
    reader.readAsArrayBuffer(file[0])

  }, [filename, setFormData, formData])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: {
      "text/xml": [".xml"]
    },
    maxFiles: 1
  })

  const uploaded = filename in formData;
  return (
    <Box {...getRootProps()} py={10} flex={1} border={"3px dashed lightgray"} bgColor={isDragActive ? "lightgreen" : undefined}>
      <Input {...getInputProps({ name: filename, multiple: false, type: "file" })} />
      <Flex justifyContent="center" alignItems="center">
        {uploaded && <CheckIcon color="green.500" />}
        <Box mx={2} color={uploaded ? "green.500" : "black"}>
          {uploaded ? "Uploaded" : `Drop ${filename} here`}
        </Box>
      </Flex>
    </Box>
  )
}