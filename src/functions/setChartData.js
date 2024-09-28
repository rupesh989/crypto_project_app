import { getDate } from "./getDate";

export const setChartDataFunction = (setState, prices1, prices2) => {
  // let bgCol = prices2 ? "transparent" : "rgba(58,128,33,0.1";
  // console.log(prices1);
  setState({
    labels: prices1?.map((data) => getDate(data[0])),
    datasets: [
      {
        label: "Crypto 1",
        data: prices1?.map((data) => data[1]),
        borderWidth: 1,
        fill: true,
        tension: 0.25,
        backgroundColor: "transparent",
        borderColor: "#3a80e9",
        pointRadius: 0,
      },
      prices2
        ? {
            label: "Crypto 2",
            data: prices2?.map((data) => data[1]),
            borderWidth: 1,
            fill: false,
            tension: 0.25,
            backgroundColor: "transparent",
            borderColor: "#61c96f",
            pointRadius: 0,
            yAxisID: "y1",
          }
        : {},
    ],
  });
};