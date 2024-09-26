import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './EmailForm.module.css'
import { MdDone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { IoReturnUpBack } from "react-icons/io5";
import VerifyCodeInput from './VerifyCodeInput';
import AxiosInstance from '../../../../../../util/AxiosInstance';
import { AppContext } from '../../../../../../util/AppContext';
import CircleLoading from './../../../../../public/components/loading/CircleLoading';
import logoGmail from '../../../../../assets/images/logoGmail.png'
const error = {
    1: 'Please fill on email',
    2: 'Email is not valid'
}
export default function EmailForm({ isVisible, onClose, onOpenSuccessDialog }) {
    const [email, setEmail] = useState('')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const [errorEmail, setErrorEmail] = useState('')
    const [isVerify, setIsVerify] = useState(false)
    const { dataUser, setDataUser } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [verifyCode, setVerifyCode] = useState('')
    const [resetCode, setResetCode] = useState(false)
    useEffect(() => {
        setErrorEmail('')
    }, [email])

    useEffect(() => {
        console.log(verifyCode);

    }, [verifyCode])
    const submitEmail = () => {
        if (!email) {
            setErrorEmail(error[1])
        } else {
            if (!emailRegex.test(email)) {
                setErrorEmail(error[2])
            } else {
                setLoading(true)
                const sendEmail = async () => {
                    const request = await AxiosInstance.post(`/userApi/sendVerificationCode/${dataUser?._id}/${email}`)
                    if (request.isSent) {
                        setIsVerify(true)
                        setLoading(false)
                    }
                }
                sendEmail()
            }
        }
    }

    const verifyEmail = async () => {
        const requset = await AxiosInstance.get(`/userApi/verifyCode/${dataUser?._id}/${verifyCode}/${email}`)
        if (requset.isVerified) {
            const user = JSON.parse(localStorage.getItem('user'))
            user.email = email
            localStorage.setItem('user', JSON.stringify(user))
            setDataUser(user)
            onClose(false)
            onOpenSuccessDialog(true)
            setIsVerify(false)
            setEmail('')
            setVerifyCode('')
            setResetCode(prev => !prev)
        }
    }
    const cancel = () => {
        onClose(false)
        setIsVerify(false)
        setEmail('')
        setVerifyCode('')
        setResetCode(prev => !prev)
    }
    const back = () => {
        setIsVerify(false)
        setResetCode(prev => !prev)
    }

    if (!isVisible) return null
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.viewHead}>
                    <p><HiOutlineMail /> Update Email</p>
                    <IoMdClose onClick={cancel} size={25} className={styles.closeIcon} />
                </div>

                <div className={styles.viewNote}>
                    <p>
                        Why should you update your Email?
                    </p>
                    <div className={styles.viewItemNone}>
                        <p>
                            <MdDone color='#0ad60a' /> Get Product Updates
                        </p>
                        <p>
                            Stay informed about our latest products.
                        </p>
                    </div>
                    <div className={styles.viewItemNone}>
                        <p>
                            <MdDone color='#0ad60a' /> Receive Sale Notifications
                        </p>
                        <p>
                            Don’t miss out on special discounts.
                        </p>
                    </div>
                    <div className={styles.viewItemNone}>
                        <p>
                            <MdDone color='#0ad60a' /> Track Your Orders
                        </p>
                        <p>
                            Easily check your order status.
                        </p>
                    </div>
                    <div className={styles.viewSide}>
                        <div className={`${styles.viewAccess} ${isVerify ? styles.viewAccessExit : ''}`}>
                            <p style={{ color: 'red', textAlign: 'right', fontSize: 12 }}>{errorEmail}</p>
                            <div className={styles.viewInput}>
                                <input id='email' className={styles.inputField} placeholder=' ' onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor='email' className={styles.labelField}>Enter your Email</label>
                            </div>
                            <button className={styles.btnSubmitEmail} onClick={submitEmail}>
                                {
                                    loading ? <CircleLoading boderColor={'white'} /> : 'Confirm Email'
                                }
                            </button>

                        </div>
                        <div className={`${styles.viewVerify} ${isVerify ? styles.viewVerifyEnter : ''}`}>
                            <VerifyCodeInput onChangeCode={setVerifyCode} onClearCode={resetCode} />
                            {
                                verifyCode.length === 6 ? <button onClick={verifyEmail} className={styles.btnVerifyEmail}><img alt='' src={logoGmail} /> Verify Email</button> :
                                    <div>
                                        <p style={{ fontSize: 13 }}>We have sent a verify code to {email}</p>
                                        <p style={{ fontSize: 13 }}>Please check your inbox!</p>
                                    </div>
                            }
                            <div className={styles.viewButton}>
                                <button className={styles.btnBack} onClick={back}><IoReturnUpBack /> Back</button>
                                <button className={styles.btnSubmitEmail}>Resend Code</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}