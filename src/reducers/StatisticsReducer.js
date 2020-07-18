import userConstants from "../constants";

const initState = {
  messageError: null,
  isLoadingStatisticVoucher: false,
  statisticVoucherReceived: {
    labels: [],
    datasets: [
      {
        label: "Delivered",
        backgroundColor: "orange",
        data: []
      }
    ]
  },
  statisticVoucherUsed: {
    labels: [],
    datasets: [
      {
        label: "Used",
        backgroundColor: "green",
        data: []
      }
    ]
  }
};

const Statistics = (state = initState, action) => {
  switch (action.type) {
    case userConstants.STATISTICS_VOUCHER_SUCCESS: {
      state.messageError = null;
      state.isLoadingStatisticVoucher = false;
      state.statisticVoucherReceived = {
        labels: [],
        datasets: [
          {
            label: "Delivered",
            backgroundColor: "orange",
            data: []
          }
        ]
      };
      state.statisticVoucherUsed = {
        labels: [],
        datasets: [
          {
            label: "Used",
            backgroundColor: "green",
            data: []
          }
        ]
      };
      const received = action.payload.received.results;
      const used = action.payload.used.results;

      for (let i = 0; i < received.length; i++) {
        state.statisticVoucherReceived.labels.push(
          `${received[i].day < 10 ? "0" + received[i].day : received[i].day}-${
            received[i].month < 10 ? "0" + received[i].month : received[i].month
          }-${received[i].year}`
        );
        state.statisticVoucherReceived.datasets[0].data.push(received[i].count);
      }

      for (let i = 0; i < used.length; i++) {
        state.statisticVoucherUsed.labels.push(
          `${used[i].day < 10 ? "0" + used[i].day : used[i].day}-${
            used[i].month < 10 ? "0" + used[i].month : used[i].month
          }-${used[i].year}`
        );
        state.statisticVoucherUsed.datasets[0].data.push(used[i].count);
      }
      return { ...state };
    }
    case userConstants.STATISTICS_VOUCHER_REQUEST: {
      state.isLoadingStatisticVoucher = true;
      state.messageError = null;
      return { ...state };
    }
    case userConstants.STATISTICS_VOUCHER_FAILURE: {
      state.messageError = action.payload.err.message;
      state.isLoadingStatisticVoucher = false;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default Statistics;
