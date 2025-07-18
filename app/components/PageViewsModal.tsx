import { Modal, TitleBar } from "@shopify/app-bridge-react";
import {
  Box,
  Text,
  Checkbox,
  Divider,
  InlineStack,
  BlockStack,
  // Button,
  // Popover,
  // ActionList,
  Select,
  Icon,
} from "@shopify/polaris";

import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { CalendarIcon } from "@shopify/polaris-icons";

type Stats = {
  views: number;
  change: number;
};

type Props = {
  stats: {
    index: Stats;
    product: Stats;
    cart: Stats;
  };
  chartData: Array<{
    date: string;
    index: number;
    product: number;
    cart: number;
  }>;
  modalOpen: boolean;
  update: (open: boolean) => void;
};

const colorBackgroundMap = {
  index: "bg-fill-success",
  product: "bg-fill-caution",
  cart: "bg-fill-info-active",
} as const;

export default function PageViewsModal({
  stats,
  chartData,
  modalOpen,
  update,
}: Props) {
  const maxValue = 10000;
  const chartColors = {
    index: "#29845a", // green
    product: "#ffb800", // yellow
    cart: "#0094d5", // blue
  };
  const pageTypes = [
    { label: "Index page", key: "index", colorName: "success" },
    { label: "Product pages", key: "product", colorName: "caution" },
    { label: "Cart pages", key: "cart", colorName: "info-active" },
  ];

  // Calculate max value from chart data
  // const maxValue =
  //   Math.ceil(
  //     Math.max(...chartData.flatMap((d) => [d.index, d.product, d.cart])) /
  //       2000,
  //   ) * 2000;

  // Generate ticks from 0 to maxValue in 2000 increments
  const ticks = Array.from({ length: maxValue / 2000 + 1 }, (_, i) => i * 2000);

  // Format function for YAxis ticks
  const formatYAxisTick = (value: number) => {
    return `${value / 1000}K`;
  };

  const [checkedItems, setCheckedItems] = useState({
    index: true,
    product: true,
    cart: true,
  });
  const [hoveredLine, setHoveredLine] = useState<
    null | keyof typeof chartColors
  >(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 490,
  );


  const handleChange = useCallback((key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 490);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Modal open={modalOpen} onHide={() => update(false)}>
      <TitleBar title="Page views" />
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <InlineStack align="space-between">
          <Text variant="headingMd" as="h3">
            Page views statistics
          </Text>
          <MonthSelector />
        </InlineStack>

        {/* Stats Boxes */}
        {isMobile ? (
          <InlineStack gap="400" wrap>
            {pageTypes.map(({ label, key }) =>
              renderStatBox({
                label,
                data: stats[key as keyof typeof stats],
                key,
              }),
            )}
          </InlineStack>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            {pageTypes.map(({ label, key }) =>
              renderStatBox({
                label,
                data: stats[key as keyof typeof stats],
                key,
              }),
            )}
          </div>
        )}
        {/* Divider */}
        <Divider />
        {/* Legend checkboxes */}
        <InlineStack gap={isMobile ? "200" : "400"} wrap>
          {pageTypes.map(({ label, key }) => (
            <Checkbox
              key={key}
              label={label}
              checked={checkedItems[key as keyof typeof checkedItems]}
              onChange={() => handleChange(key as keyof typeof checkedItems)}
            />
          ))}
        </InlineStack>
        {/* Chart */}
        <div
          style={{
            width: "100%",
            paddingBottom: "32px",
            borderRadius: "12px 12px 12px 12px",
            boxShadow:
              "1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.50) inset, 0px 8px 16px -4px rgba(26, 26, 26, 0.22)",
            height: 400,
          }}
        >
          <Box padding="400">
            <InlineStack gap={isMobile ? "200" : "400"} wrap>
              {pageTypes.map(({ label, key, colorName }) => (
                <InlineStack key={key} gap="200" align="center">
                  <Box
                    width="16px"
                    minHeight="16px"
                    background={
                      colorBackgroundMap[key as keyof typeof colorBackgroundMap]
                    }
                  />
                  <Text as="h2" variant="bodySm">
                    {label}
                  </Text>
                </InlineStack>
              ))}
            </InlineStack>
          </Box>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{
                top: 16,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                horizontal={false}
              />
              <XAxis
                dataKey="date"
                allowDataOverflow
                tickLine={false}
                axisLine={{ stroke: "#ccc" }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                tickFormatter={formatYAxisTick}
                ticks={ticks}
                tickLine={false}
                domain={[0, maxValue]}
                axisLine={{ stroke: "#ccc" }}
                padding={{ top: 10, bottom: 10 }}
              />
              {/* <Tooltip
                contentStyle={{ borderRadius: "8px", fontSize: "14px" }}
                labelStyle={{ fontWeight: 600 }}
                formatter={(value: any, name: string, props: any) => {
                  if (!hoveredLine) return null;
                  if (props.dataKey !== hoveredLine) return null;
                  return [value, name];
                }}
              /> */}
              <Tooltip
                content={<CustomTooltip hoveredLine={hoveredLine} />}
                cursor={false}
              />
              {pageTypes.map(
                ({ label, key }) =>
                  checkedItems[key as keyof typeof checkedItems] && (
                    <Line
                      key={key}
                      type={hoveredLine === key ? "linear" : "monotone"}
                      dataKey={key}
                      stroke={chartColors[key as keyof typeof chartColors]}
                      name={label}
                      strokeWidth={hoveredLine === key ? 2 : 1}
                      dot={{ r: 0 }}
                      activeDot={{ r: 4, strokeWidth: 2 }}
                      onMouseEnter={() =>
                        setHoveredLine(key as keyof typeof chartColors)
                      }
                      onMouseLeave={() => setHoveredLine(null)}
                    />
                  ),
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Modal>
  );
}

// Popover not working in modal
// function MonthSelector() {
//   const [popoverActive, setPopoverActive] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState("Month");

//   const togglePopoverActive = useCallback(
//     () => setPopoverActive((active) => !active),
//     [],
//   );

//   const handleMonthSelect = useCallback((month: string) => {
//     setSelectedMonth(month);
//     setPopoverActive(false);
//   }, []);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   return (
//     <Popover
//       active={popoverActive}
//       zIndexOverride={5100}
//       activator={
//         <Button
//           onClick={togglePopoverActive}
//           icon={CalendarIcon}
//           disclosure
//           size="slim"
//         >
//           {selectedMonth}
//         </Button>
//       }
//       onClose={togglePopoverActive}
//       preferredPosition="below"
//       preferredAlignment="right"
//     >
//       <ActionList
//         items={months.map((month) => ({
//           content: month,
//           onAction: () => handleMonthSelect(month),
//         }))}
//       />
//     </Popover>
//   );
// }

function MonthSelector() {
  const [selectedMonth, setSelectedMonth] = useState("month");

  const months = [
    { label: "Day", value: "day" },
    { label: "Month", value: "month" },
    { label: "Week", value: "week" },
    { label: "Year", value: "year" },
  ];

  const handleSelectChange = useCallback((value: string) => {
    setSelectedMonth(value);
  }, []);

  return (
    <Select
      label={<Icon source={CalendarIcon} />}
      labelInline
      options={months}
      onChange={handleSelectChange}
      value={selectedMonth}
    ></Select>
  );
}

function CustomTooltip({ hoveredLine, active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const current = payload.find((p: any) => p.dataKey === hoveredLine);
  if (!current) return null;
  // console.log("CustomTooltip payload:", payload, "label:", label);

  const pageType = current.name; // e.g., 'Index page'
  const views = current.value; // e.g., 25
  const date = label; // e.g., '04/20'

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E0E0E0",
        borderRadius: "6px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)",
        padding: "8px 12px",
        fontSize: "13px",
        lineHeight: "16px",
        pointerEvents: "none",
        position: "relative",
      }}
    >
      {/* Pointer triangle */}
      <div
        style={{
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "6px solid white",
        }}
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

const renderStatBox = ({
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
      style={{
        display: "flex",
        borderRadius: "6px",
        padding: "16px",
        background: "#f6f6f7",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        width: "100%",
        justifyContent: "space-between",
        color: "#000",
      }}
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
