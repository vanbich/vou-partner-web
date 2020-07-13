import { combineReducers } from "redux";
import Authentication from "./AuthenticationReducer";
import User from "./UserReducer";
import Vouchers from "./VoucherReducer";
import Campaigns from "./CampaignReducer";
import Games from "./GameReducer";
import Employees from "./EmployeeReducer";

const rootReducer = combineReducers({
    Authentication,
    User,
    Vouchers,
    Campaigns,
    Games,
    Employees
});
export default rootReducer;
