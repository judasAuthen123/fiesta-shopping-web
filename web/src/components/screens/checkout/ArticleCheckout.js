import React, { } from 'react'
import MyCheckout from './MyCheckout';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import Done from './Done';


export default function ArticleCheckout({ keyrender, data, nextStep, onChangeAddress, onChangeMethod }) {

    let renderComponent;
    const onSubmit = (data) => {
        let step;
        switch (data) {
            case 'orderSubmit':
                step = 'shipping'
                break;
            case 'shippingSubmit':
                step = 'payment'
                break;
            case 'backToOrderSubmit':
                step = 'order'
                break;
            case 'backToShipping':
                step = 'shipping'
                break
            default:
                break
        }
        nextStep(step)
    }


    switch (keyrender) {
        case 'order':
            renderComponent = <MyCheckout data={data} stepSubmit={onSubmit} />
            break;
        case 'shipping':
            renderComponent = <ShippingAddress stepSubmit={onSubmit} onChangeAddress={(data) => onChangeAddress(data)}/>
            break;
        case 'payment':
            renderComponent = <Payment stepSubmit={onSubmit} onChangeMethod={(data) => onChangeMethod(data)}/>
            break;
        case 'done':
            renderComponent = <Done />
            break;
        default:
            renderComponent = null

    }
    return (
        <div>
            {renderComponent}
        </div>
        // <div>
        //     <TransitionGroup>
        //         <CSSTransition
        //             key={keyrender}
        //             timeout={500}
        //             classNames={{
        //                 enter: styles[slideEnterStyle],
        //                 enterActive: styles.slideEnterActive,
        //                 exit: styles.slideExit,
        //                 exitActive: styles[slideExitStyle]
        //             }}
        //         >
        //             <div>{renderComponent}</div>
        //         </CSSTransition>
        //     </TransitionGroup>
        // </div>
    )
}
