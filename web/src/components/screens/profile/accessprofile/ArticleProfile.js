import React from 'react'
import InfoUser from './inforuser/InfoUser';
import MyOrders from './order/MyOrders';
import MyWishlists from './wistlist/MyWishlists';
import ManageAddress from './address/ManageAddress';
import SavedCards from './card/SavedCards';
import Notifications from './notifications/Notifications';
import Settings from './settings/Settings';
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
            renderComponent = <MyWishlists />
            break;
        case 4:
            renderComponent = <ManageAddress />
            break;
        case 5:
            renderComponent = <SavedCards />
            break;
        case 6:
            renderComponent = <Notifications />
            break;
        case 7:
            renderComponent = <Settings />
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
