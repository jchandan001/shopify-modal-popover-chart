import { Modal, TitleBar } from "@shopify/app-bridge-react";
import {
  Box,
  Text,
  Checkbox,
  Divider,
  InlineStack,
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
import type { PageViewModalProps } from "app/libs/types/modal";
import { chartColors, colorBackgroundMap, maxValue, mobileWidth, pageTypes } from "app/libs/constant";
import {
  reChartPageViewFormatYAxisTick,
  reChartPageViewTicks,
} from "app/libs/pageViewFunction/model";
import { StatBox } from "./StatBox";
import CustomTooltip from "./CustomToolTip";
import { TimeLineSelector1 } from "./TimeLineSelector";

export default function PageViewsModal({
  stats,
  chartData,
  modalOpen,
  handleModal,
}: PageViewModalProps) {
  const [checkedItems, setCheckedItems] = useState({
    index: true,
    product: true,
    cart: true,
  });
  const [hoveredLine, setHoveredLine] = useState<
    null | keyof typeof chartColors
  >(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= mobileWidth,
  );

  const handleChange = useCallback((key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= mobileWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Modal
      open={modalOpen}
      onShow={() => handleModal(true)}
      onHide={() => handleModal(false)}
    >
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
          <TimeLineSelector1 />
        </InlineStack>

        {/* Stats Boxes */}
        {isMobile ? (
          <InlineStack gap="400" wrap>
            {pageTypes.map(({ label, key }) =>
              StatBox({
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
              StatBox({
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
                interval="equidistantPreserveStart"
                axisLine={{ stroke: "#ccc" }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                tickFormatter={reChartPageViewFormatYAxisTick}
                ticks={reChartPageViewTicks}
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