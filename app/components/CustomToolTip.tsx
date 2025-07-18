import { BlockStack, InlineStack, Text } from "@shopify/polaris";
import { customToolTipContainerStyles, customToolTipInnerContainerStyles } from "app/css/page-view";

export default function CustomTooltip({ hoveredLine, active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const current = payload.find((p: any) => p.dataKey === hoveredLine);
  if (!current) return null;
  // console.log("CustomTooltip payload:", payload, "label:", label);

  const pageType = current.name; // e.g., 'Index page'
  const views = current.value; // e.g., 25
  const date = label; // e.g., '04/20'

  return (
    <div
      style={customToolTipContainerStyles}
    >
      {/* Pointer triangle */}
      <div
        style={customToolTipInnerContainerStyles}
      />

      <BlockStack gap="300">
        <Text as="h3" variant="bodySm" fontWeight="bold">
          {pageType}
        </Text>
        <InlineStack gap="400" align="space-between">
          <Text as="span" variant="bodySm">
            Views
          </Text>
          <Text as="span" variant="bodySm">
            {views}
          </Text>
        </InlineStack>
        <InlineStack gap="400" align="space-between">
          <Text as="span" variant="bodySm">
            Date
          </Text>
          <Text as="span" variant="bodySm">
            {date}
          </Text>
        </InlineStack>
      </BlockStack>
    </div>
  );
}
