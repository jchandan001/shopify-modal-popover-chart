export const pageViewMockData = {
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

export const colorBackgroundMap = {
    index: "bg-fill-success",
    product: "bg-fill-caution",
    cart: "bg-fill-info-active",
} as const;

export const maxValue = 10000;
export const chartColors = {
    index: "#29845a", // green
    product: "#ffb800", // yellow
    cart: "#0094d5", // blue
};
export const pageTypes = [
    { label: "Index page", key: "index", colorName: "success" },
    { label: "Product pages", key: "product", colorName: "caution" },
    { label: "Cart pages", key: "cart", colorName: "info-active" },
];

export const timeOptions = [
    { label: "Day", value: "day" },
    { label: "Month", value: "month" },
    { label: "Week", value: "week" },
    { label: "Year", value: "year" },
];

export const monthsOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const chartHeight = 300;

export const mobileWidth = 490;