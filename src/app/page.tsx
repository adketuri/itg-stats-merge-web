"use client"

import { FileDrop } from '@/components/file-drop'
import { Footer } from '@/components/footer';
import { FILENAMES } from '@/constants';
import { Button, Container, Flex, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { combine, parseStatsXml } from 'itg-stats-merge';
import { SaveXML } from 'itg-stats-merge/types';
import { useState } from 'react';

export default function Home() {

  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    setLoading(true);
    // FIXME Promise.all, actual error handling, etc
    const itg: SaveXML | null = await new Promise((resolve) => {
      setTimeout(() => {
        const parsed = parseStatsXml(formData["Stats.xml"])
        resolve(parsed);
      });
    });
    const ecfa: SaveXML | null = await new Promise((resolve) => {
      setTimeout(() => {
        const parsed = parseStatsXml(formData["ECFA-Stats.xml"])
        resolve(parsed);
      });
    });
    if (itg && ecfa) {
      const combinedXml = combine(itg, ecfa)
      const data = new Blob([combinedXml], { type: 'text/xml' })
      const href = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'Stats.xml');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(false)
    }
  };

  const [formData, setFormData] = useState<Record<string, any>>({})
  const disabled = Object.keys(formData).length < 2
  return (
    <Container display="flex" flexDirection="column" flex={1} height="100vh">
      <Flex direction="column" justifyContent="center" alignItems="center" flex={1}>
        <Card  >
          <CardHeader pb={0}>
            <Text fontSize="xl" mb={5}>Stats Merger</Text>
            <Text>Click or drag to upload your <strong>Stats.xml</strong> and <strong>ECFA-Stats.xml</strong> files below, then select <strong>Download</strong> to download the merged scores.</Text>
          </CardHeader>
          <CardBody display="flex" flexDir="column" pt={0}>
            <Flex textAlign="center" gap={5} my={5} flexDir={["column", "row"]}>
              {FILENAMES.map((filename) =>
                (<FileDrop key={filename} filename={filename} formData={formData} setFormData={setFormData} />)
              )}
            </Flex>
            <Button type="submit" isLoading={loading} isDisabled={disabled} colorScheme="green" onClick={submitForm}>Download</Button>
          </CardBody>
        </Card>
      </Flex>
      <Footer />
    </Container>
  )
}

