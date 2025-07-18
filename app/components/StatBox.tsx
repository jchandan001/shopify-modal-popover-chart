import { BlockStack, Text } from "@shopify/polaris";
import { statsBoxStyles } from "app/css/page-view";
import type { Stats } from "app/libs/types/modal";

export const StatBox = ({
  label,
  data,
  key,
}: {
  label: string;
  data: Stats;
  key: string;
}) => {
  const [firstLine, secondLine] = label.split(" ");
  return (
    <div
      key={label}
      style={statsBoxStyles}
    >
      <BlockStack gap="100">
        <Text as="h2" variant="bodyLg">
          {firstLine}
        </Text>
        <Text as="h2" variant="bodyLg">
          {secondLine}
        </Text>
      </BlockStack>
      <BlockStack gap="100">
        <Text
          as="h3"
          variant="headingMd"
          fontWeight="bold"
          tone={
            data.views > 0
              ? "success"
              : data.views === 0
                ? "subdued"
                : "critical"
          }
        >
          {data.views > 0 ? `+${data.views}` : data.views}
        </Text>
        <Text
          as="h4"
          variant="bodySm"
          tone={
            data.change > 0
              ? "success"
              : data.change === 0
                ? "subdued"
                : "critical"
          }
        >
          {data.change > 0 ? `+${data.change}%` : `${data.change}%`}
        </Text>
      </BlockStack>
    </div>
  );
};
