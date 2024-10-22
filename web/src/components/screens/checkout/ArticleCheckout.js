import React, { } from 'react'
import MyCheckout from './MyCheckout';
import ShippingAddress from './ShippingAddress';
import Payment from './Payment';
import Done from './Done';


export default function ArticleCheckout({ keyrender, data, nextStep, onChangeAddress, onChangeMethod }) {

    const steps = {
        orderSubmit: 'shipping',
        shippingSubmit: 'payment',
        backToOrderSubmit: 'order',
        backToShipping: 'shipping'
    };

    const onSubmit = (data) => {
        const step = steps[data];
        if (step) {
            nextStep(step);
        }
    };
    const stepComponents = {
        order: <MyCheckout data={data} stepSubmit={onSubmit} />,
        shipping: <ShippingAddress stepSubmit={onSubmit} onChangeAddress={onChangeAddress} />,
        payment: <Payment stepSubmit={onSubmit} onChangeMethod={onChangeMethod} />,
        done: <Done />
    };
    return (
        <>
            {stepComponents[keyrender] || null}
        </>
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
