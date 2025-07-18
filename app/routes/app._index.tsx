import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  Icon,
  BlockStack,
  Banner,
  Box,
} from "@shopify/polaris";
import {
  ProductIcon,
  AffiliateIcon,
  ProfileIcon,
} from "@shopify/polaris-icons";
import PageViewsModal from "app/components/PageViewsModal";
import { useState } from "react";

const data = {
  summary: {
    index: {
      label: "Index page",
      views: 500,
      change: -2,
    },
    product: {
      label: "Product pages",
      views: 0,
      change: 0,
    },
    cart: {
      label: "Cart pages",
      views: 100,
      change: 2,
    },
  },
  legend: [
    {
      label: "Index page",
      color: "#29845a",
    },
    {
      label: "Product pages",
      color: "#ffb800",
    },
    {
      label: "Cart pages",
      color: "#0094d5",
    },
  ],
  chartData: [
    {
      date: "04/01",
      index: 1800,
      product: 0,
      cart: 800,
    },
    {
      date: "04/05",
      index: 1000,
      product: 0,
      cart: 4000,
    },
    {
      date: "04/10",
      index: 4100,
      product: 0,
      cart: 1800,
    },
    {
      date: "04/15",
      index: 4300,
      product: 0,
      cart: 8000,
    },
    {
      date: "04/20",
      index: 8700,
      product: 0,
      cart: 4250,
    },
    {
      date: "04/25",
      index: 3250,
      product: 0,
      cart: 7000,
    },
    {
      date: "04/30",
      index: 5000,
      product: 0,
      cart: 3000,
    },
  ],
};

export const loader: LoaderFunction = async () => {
  return {
    stats: data.summary,
    chartData: data.chartData,
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
              <Text as="p" variant="bodyLg"  tone="subdued">
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
                  update={setOpen}
                  stats={data.stats}
                  chartData={data.chartData}
                />
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Features Section */}
        <Layout.Section>
          <Layout>
            {[
              {
                icon: ProductIcon,
                title: "Product Management",
                description:
                  "Easily add, edit, and organize your products in one place.",
              },
              {
                icon: AffiliateIcon,
                title: "Sales Analytics",
                description:
                  "Real-time insights into your store's performance.",
              },
              {
                icon: ProfileIcon,
                title: "Customer Profiles",
                description: "Understand your buyers and their preferences.",
              },
            ].map((feature, index) => (
              <Layout.Section key={index} variant="oneThird">
                <Card>
                  <BlockStack gap="400">
                    <Icon source={feature.icon} tone="info" />
                    <Text as="h1" variant="heading2xl">
                      {feature.title}
                    </Text>
                    <Text as="p" tone="subdued">
                      {feature.description}
                    </Text>
                  </BlockStack>
                </Card>
              </Layout.Section>
            ))}
          </Layout>
        </Layout.Section>

        {/* CTA Section */}
        <Layout.Section>
          <Banner
            title="Ready to get started?"
            action={{ content: "Create Account" }}
            secondaryAction={{ content: "Contact Sales" }}
            tone="info"
          >
            <Text as="p" variant="bodyMd">
              Join thousands of merchants growing their business with StoreHub.
            </Text>
          </Banner>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
