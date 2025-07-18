import { maxValue } from "../constant";
import type { ChartDataPoint } from "../types/modal";

// Generate ticks from 0 to maxValue in 2000 increments
export const reChartPageViewTicks = Array.from({ length: maxValue / 2000 + 1 }, (_, i) => i * 2000);

// Format function for YAxis ticks
export const reChartPageViewFormatYAxisTick = (value: number) => {
    return `${value / 1000}K`;
};

// Calculate max value from chart data
export const maxValueDynamicViews = (chartData: ChartDataPoint[]) => {
    return Math.ceil(
        Math.max(...chartData.flatMap((d: ChartDataPoint) => [d.index, d.product, d.cart])) /
        2000,
    ) * 2000;
}
