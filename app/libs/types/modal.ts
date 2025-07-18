export type Stats = {
    views: number;
    change: number;
};

export type PageViewModalProps = {
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
    handleModal: (open: boolean) => void;
};

export interface PageViewData {
    summary: {
      index: PageSummary;
      product: PageSummary;
      cart: PageSummary;
    };
    chartData: ChartDataPoint[];
  }
  
  export interface PageSummary {
    label: string;
    views: number;
    change: number;
  }
  
  export interface ChartDataPoint {
    date: string;
    index: number;
    product: number;
    cart: number;
  }