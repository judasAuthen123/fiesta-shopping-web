import React, { useEffect, useRef, useState } from 'react'
import styles from './Step.module.css'
import { IoCardOutline } from 'react-icons/io5'
import { LuHome } from 'react-icons/lu';
import { TbCubePlus } from "react-icons/tb";
import { CgCheckO } from "react-icons/cg";
export default function StepCheckout({ state }) {
    const orderStatusSteps = ['order', 'shipping', 'payment', 'done'];
    const layoutStateRef = useRef(null)
    const [childCount, setChildCount] = useState(null)

    useEffect(() => {
        setChildCount(layoutStateRef.current?.childNodes.length)
    }, [])
    const calculateGridTemplateColumns = () => {
        if (childCount && (childCount === 0 || childCount === 1)) {
            return '1fr';
        }
        const columnWidth = `1fr `.repeat(childCount > 0 ? childCount - 1 : childCount);
        const lastColumn = '30px';
        return `${columnWidth}${lastColumn}`;
    };

    const getStepStatus = (step) => {
        const stepIndex = orderStatusSteps.indexOf(step);
        const currentIndex = orderStatusSteps.indexOf(state);
        return stepIndex <= currentIndex ? 'active' : 'inactive';
    };

    const icon = {
        shipping: LuHome,
        payment: IoCardOutline,
        done: CgCheckO,
        order: TbCubePlus
    }

    const createIcon = (step, state) => {
        const IconComponent = icon[step];
        return <IconComponent style={{ color: state === 'active' ? 'white' : 'black' }} />;
    }

    const createLine = (step) => {
        const lengthArrStatus = orderStatusSteps.length;
        const currentIndex = orderStatusSteps.indexOf(state);
        const indexOfState = orderStatusSteps.indexOf(step)

        return (indexOfState + 1) < lengthArrStatus ?
            <div
                className={styles.line}
                style={{ opacity: indexOfState < currentIndex ? 0.5 : 0.1 }}
            /> : null
    }
    return (
        <div className={styles.container}>
            <div className={styles.layoutState} ref={layoutStateRef} style={{ gridTemplateColumns: calculateGridTemplateColumns() }}>
                {
                    orderStatusSteps.map(item => {
                        const state = getStepStatus(item);
                        return (
                            <div key={item} className={styles.viewItem}>
                                <div className={styles.iconView} style={{ backgroundColor: state === 'active' ? 'black' : '#f2f2f2' }}>
                                    {createIcon(item, state)}
                                </div>
                                {createLine(item)}
                            </div>
                        );
                    })
                }
            </div>
            {/* <div className={styles.viewLabel}>
                <div>Order</div>
                <div>Address</div>
                <div>Payment</div>
                <div>Ok</div>
            </div> */}
        </div >
    )
}
