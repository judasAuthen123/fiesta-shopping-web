import React from 'react'
import InfoUser from './inforuser/InfoUser';
import MyOrders from './order/MyOrders';
import ManageAddress from './address/ManageAddress';
import SavedCards from './card/SavedCards';
import Notifications from './notifications/Notifications';
import Settings from './settings/Settings';
import Exit from './logout/Exit';
export default function ArticleProfile({ keyRender }) {
    let renderComponent;
    switch (keyRender) {
        case 1:
            renderComponent = <InfoUser />
            break;
        case 2:
            renderComponent = <MyOrders />
            break;
        case 3:
            renderComponent = <ManageAddress />
            break;
        case 4:
            renderComponent = <SavedCards />
            break;
        case 5:
            renderComponent = <Notifications />
            break;
        case 6:
            renderComponent = <Settings />
            break;
        case 7:
            renderComponent = <Exit />
            break;
        default:
            renderComponent = null;
    }
    return (
        <div>
            {renderComponent}
        </div>
    )
}
