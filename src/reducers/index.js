import { combineReducers } from "redux";
import Authentication from "./AuthenticationReducer";
import User from "./UserReducer";
import Vouchers from "./VoucherReducer";
import Campaigns from "./CampaignReducer";
import Games from "./GameReducer";

const rootReducer = combineReducers({
    Authentication,
    User,
    Vouchers,
    Campaigns,
    Games
});
export default rootReducer;
