import login from "./loginSlice";
import house from "./productSlice";
// import notification from "./notificationReducer";
// import groups from "./groupReducers";
// import devices from "./deviceReducers";
// import devicesIdentity from "./deviceIdentityReducers";
// import settings from "./settingsReducer";
// import collections from "./collectionReducers";
// import collectionItems from "./collectionItemReducers";
// import eventItems from "./eventItemReducers";
// import dashItems from "./dashboardItemReducers";
// import pageSize from "./pageSizeReducer";

import { combineReducers } from 'redux';

export default combineReducers({
    login,
    house,
    // notification,
    // groups,
    // devices,
    // devicesIdentity,
    // settings,
    // collections,
    // collectionItems,
    // eventItems,
    // dashItems,
    // pageSize
});
