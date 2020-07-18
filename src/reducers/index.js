import { combineReducers } from "redux";
import Authentication from "./AuthenticationReducer";
import User from "./UserReducer";
import Vouchers from "./VoucherReducer";
import Campaigns from "./CampaignReducer";
import Games from "./GameReducer";
import Employees from "./EmployeeReducer";
import Statistics from "./StatisticsReducer";

const rootReducer = combineReducers({
    Authentication,
    User,
    Vouchers,
    Campaigns,
    Games,
    Employees,
    Statistics
});
export default rootReducer;
