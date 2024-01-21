"use client"

import { FileDrop } from '@/components/file-drop'
import { Button, Container, Flex } from '@chakra-ui/react'
import { useState } from 'react';

export default function Home() {

  const submitForm = () => {
    const formData = new FormData();
    formData.append("Stats.xml", data["Stats.xml"], "Stats.xml");
    formData.append("ECFA-Stats.xml", data["ECFA-Stats.xml"], "ECFA-Stats.xml");
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const href = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'Stats.xml');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        return Promise.reject({ Error: 'oopsies', err });
      })
  };

  const [data, setData] = useState<Record<string, any>>({})
  return (
    <Container display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Flex direction="column">
        <Flex>
          <FileDrop filename="Stats.xml" data={data} setData={setData} />
          <FileDrop filename="ECFA-Stats.xml" data={data} setData={setData} />
        </Flex>
        <Button type="submit" onClick={submitForm}>Combine</Button>
      </Flex>

    </Container>
  )
}

