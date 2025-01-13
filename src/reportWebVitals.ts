interface ReportHandler {
  (metric: any): void;
}

interface WebVitals {
  getCLS: (onReport: ReportHandler) => void;
  getFID: (onReport: ReportHandler) => void;
  getFCP: (onReport: ReportHandler) => void;
  getLCP: (onReport: ReportHandler) => void;
  getTTFB: (onReport: ReportHandler) => void;
}

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }: WebVitals) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
