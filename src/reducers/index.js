import { combineReducers } from "redux";
import Authentication from "./AuthenticationReducer";
import User from "./UserReducer";
// import Vouchers from "./voucherReducer";
// import Campaigns from "./campaignReducers";

const rootReducer = combineReducers({
    Authentication,
    User,
    // Vouchers,
    // Campaigns
});
export default rootReducer;
