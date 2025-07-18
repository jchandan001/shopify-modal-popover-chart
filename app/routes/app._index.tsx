import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  BlockStack,
  Box,
} from "@shopify/polaris";
import PageViewsModal from "app/components/PageViewsModal";
import { pageViewMockData } from "app/libs/constant";
import { useState } from "react";

export const loader: LoaderFunction = async () => {
  return {
    stats: pageViewMockData.summary,
    chartData: pageViewMockData.chartData,
  };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  return (
    <Page title="Welcome to StoreHub">
      <Layout>
        {/* Hero Section */}
        <Layout.Section>
          <Card>
            <BlockStack gap="200" align="center">
              <Text as="h1" variant="heading2xl">
                Simplify Your Store Management
              </Text>
              <Text as="p" variant="bodyLg" tone="subdued">
                An intuitive dashboard to track sales, manage products, and
                understand your customers.
              </Text>
              <BlockStack align="center">
                <Box>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Show Page View
                  </Button>
                </Box>
                <PageViewsModal
                  modalOpen={open}
                  handleModal={setOpen}
                  stats={data.stats}
                  chartData={data.chartData}
                />
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
