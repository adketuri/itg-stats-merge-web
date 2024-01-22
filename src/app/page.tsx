"use client"

import { FileDrop } from '@/components/file-drop'
import { FILENAMES } from '@/constants';
import { Button, Container, Flex, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { useState } from 'react';

export default function Home() {

  const [loading, setLoading] = useState(false);

  const submitForm = () => {
    setLoading(true)
    const body = new FormData();
    FILENAMES.forEach(filename => body.append(filename, formData[filename], filename))
    fetch("/api/upload", {
      method: "POST",
      body,
    })
      .then((res) => res.blob())
      .then((blob) => {
        const href = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'Stats.xml');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        return Promise.reject({ Error: 'oopsies', err });
      })
  };

  const [formData, setFormData] = useState<Record<string, any>>({})
  const disabled = Object.keys(formData).length < 2
  return (
    <Container display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card display="flex" >
        <CardHeader pb={0}>
          <Text fontSize="xl" mb={5}>Stats Merger</Text>
          <Text>Click or drag to upload your <strong>Stats.xml</strong> and <strong>ECFA-Stats.xml</strong> files below, then select <strong>Combine</strong> to merge the scores together.</Text>
        </CardHeader>
        <CardBody display="flex" flexDir="column" pt={0}>
          <Flex textAlign="center" gap={5} my={5} flexDir={["column", "row"]}>
            {FILENAMES.map((filename) =>
              (<FileDrop key={filename} filename={filename} formData={formData} setFormData={setFormData} />)
            )}
          </Flex>
          <Button type="submit" isLoading={loading} isDisabled={disabled} colorScheme="green" onClick={submitForm}>Combine</Button>
        </CardBody>
      </Card>
    </Container>
  )
}

