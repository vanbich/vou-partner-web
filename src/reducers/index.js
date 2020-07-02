import { combineReducers } from "redux";
import Authentication from "./AuthenticationReducer";
import User from "./UserReducer";
import Vouchers from "./VoucherReducer";
import Campaigns from "./CampaignReducer";

const rootReducer = combineReducers({
    Authentication,
    User,
    Vouchers,
    Campaigns
});
export default rootReducer;
