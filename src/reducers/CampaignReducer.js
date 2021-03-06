import userConstants from "../constants";

const initState = {
  myCampaigns: [],
  number: 0,
  isSuccessful: true,
  messageError: "",
  isLoading: false,
  isCreating: false,
  isDeleted: false,
  isUpdating: false,
  statisticData: {
    labels: [],
    datasets: [
      {
        label: "Total",
        backgroundColor: "#ffa4a8",
        data: []
      }
    ]
  }
};

const Campaigns = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_MY_CAMPAIGN_SUCCESS: {
      state.statisticData = {
        labels: [],
        datasets: [
          {
            label: "Total",
            backgroundColor: "#ffa4a8",
            data: []
          }
        ]
      };
      state.myCampaigns = [...action.payload.res.data];
      for (let i = 0; i < state.myCampaigns.length; i++) {
        state.myCampaigns[i].games = [
          {
            id: 1,
            name: "Tâng bóng",
            accept_point: 10,
            point: 20,
            logo: "/images/products/product_1.png",
            description:
              "Tâng bóng và giữ khi bóng rơi xuống liên tục nếu không giữ được sẽ kết thúc màn chơi"
          },
          {
            id: 2,
            name: "Lật ảnh",
            accept_point: 3,
            point: 6,
            logo: "/images/products/product_2.png",
            description:
              "Tìm những cặp ảnh giống nhau với số lượt mở ảnh cho trước nếu hết lượt mở ảnh mà chưa mở hết thì thua"
          },
          {
            id: 3,
            name: "Tìm mảnh ghép",
            accept_point: 3,
            point: 5,
            logo: "/images/products/product_3.png",
            description:
              "Tìm ảnh cho trước có trong bức tranh được hiển thị trên màn hình trong khoảng thời gian cho trước, hết thời gian thì kết thúc màn chơi"
          }
        ];
        state.statisticData.labels.push(state.myCampaigns[i].name);
        state.statisticData.datasets[0].data.push(
          state.myCampaigns[i].num_of_voucher
        );
      }

      state.isLoading = false;
      state.isSuccessful = false;
      state.isDeleted = false;

      return JSON.parse(JSON.stringify(state));
    }
    case userConstants.GET_MY_CAMPAIGN_REQUEST: {
      state.isLoading = true;
      state.isSuccessful = false;
      state.messageError = "";
      state.myCampaigns = [];
      return { ...state };
    }
    case userConstants.GET_MY_CAMPAIGN_FAILURE: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = action.payload.err.message;
      state.myCampaigns = [];
      return { ...state };
    }

    case userConstants.CREATE_CAMPAIGN_SUCCESS: {
      state.isSuccessful = true;
      state.isCreating = false;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.CREATE_CAMPAIGN_REQUEST: {
      state.isSuccessful = false;
      state.messageError = "";
      state.isCreating = true;
      return { ...state };
    }
    case userConstants.CREATE_CAMPAIGN_FAILURE: {
      state.isCreating = false;
      state.isSuccessful = false;
      state.messageError = "";

      if (action.payload.err.message === "Promo code too long.") {
        state.messageError = "Code must be not over 5 characters!";
      } else if (action.payload.err.message === "Network Error") {
        state.messageError = "Check your connection, please!";
      } else {
        state.messageError = "Something went wrong!";
      }
      return { ...state };
    }

    case userConstants.DELETE_CAMPAIGN_REQUEST: {
      state.isLoading = true;
      state.isDeleted = false;
      state.messageError = "";
      return { ...state };
    }
    case userConstants.DELETE_CAMPAIGN_FAILURE: {
      state.isLoading = false;
      state.isDeleted = false;
      state.messageError = action.payload.err.message;
      return { ...state };
    }
    case userConstants.DELETE_CAMPAIGN_SUCCESS: {
      state.isLoading = false;
      state.isDeleted = true;
      state.messageError = null;
      return { ...state };
    }

    case userConstants.UPDATE_CAMPAIGN_REQUEST: {
      state.isUpdating = true;
      state.isSuccessful = false;
      state.messageError = null;
      return { ...state };
    }
    case userConstants.UPDATE_CAMPAIGN_SUCCESS: {
      state.isUpdating = false;
      state.isSuccessful = true;
      state.messageError = null;
      return { ...state };
    }
    case userConstants.UPDATE_CAMPAIGN_FAILURE: {
      state.isUpdating = false;
      state.isSuccessful = true;
      state.messageError = action.payload.err;
      return { ...state };
    }

    case userConstants.REFRESH_STATE_CAMPAIGN: {
      state.isLoading = false;
      state.isSuccessful = false;
      state.messageError = null;
      state.isDeleted = false;
      state.isUpdating = false;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default Campaigns;
