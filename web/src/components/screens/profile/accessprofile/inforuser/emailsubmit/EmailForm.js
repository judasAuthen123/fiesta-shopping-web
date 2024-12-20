import React, { useContext, useEffect, useState } from 'react'
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
import { useTranslation } from 'react-i18next';
import FiestaAlert from '../../../../../public/components/dialog/FiestaAlert';
import DottedLoading from '../../../../../public/components/loading/dottedLoading/DottedLoading';

export default function EmailForm({ isVisible, onClose, onOpenSuccessDialog }) {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const [errorEmail, setErrorEmail] = useState('')
    const [isVerify, setIsVerify] = useState(false)
    const { dataUser, setDataUser } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [verifyCode, setVerifyCode] = useState('')
    const [resetCode, setResetCode] = useState(false)
    const [isVisbileAlert, setIsVisibleAlert] = useState(false)
    const [loadingVerify, setLoadingVerify] = useState(false)
    const error = {
        1: t('Components.email.EmailForm.error.emailEmpty'),
        2: t('Components.email.EmailForm.error.emailInvalid')
    }
    useEffect(() => {
        setErrorEmail('')
    }, [email])
    const sendEmail = async () => {
        setLoading(true)
        try {
            const request = await AxiosInstance.post(`/userApi/sendVerificationCode/${dataUser?._id}/${email}`)
            if (request.isSent) {
                setIsVerify(true)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }
    const submitEmail = () => {
        if (!email) {
            setErrorEmail(error[1])
        } else {
            if (!emailRegex.test(email)) {
                setErrorEmail(error[2])
            } else {
                sendEmail()
            }
        }
    }

    const verifyEmail = async () => {
        setLoadingVerify(true)
        try {
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
            } else {
                setIsVisibleAlert(true)
                setLoadingVerify(false)
            }
        } catch (error) {
            setLoadingVerify(false)
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
            <FiestaAlert label={'Mã xã nhận không đúng'} isVisible={isVisbileAlert} onClose={setIsVisibleAlert} />
            <div className={styles.form}>
                <div className={styles.viewHead}>
                    <p><HiOutlineMail /> {t('Components.email.EmailForm.title')}</p>
                    <IoMdClose onClick={cancel} size={25} className={styles.closeIcon} />
                </div>

                <div className={styles.viewNote}>
                    <p>
                        {t('Components.email.EmailForm.question')}
                    </p>
                    <div className={styles.viewItemNone}>
                        <p>
                            <MdDone color='#0ad60a' /> {t('Components.email.EmailForm.string1.title')}
                        </p>
                        <p>
                            {t('Components.email.EmailForm.string1.holder')}
                        </p>
                    </div>
                    <div className={styles.viewItemNone}>
                        <p>
                            <MdDone color='#0ad60a' /> {t('Components.email.EmailForm.string2.title')}
                        </p>
                        <p>
                            {t('Components.email.EmailForm.string1.holder')}
                        </p>
                    </div>
                    <div className={styles.viewItemNone}>
                        <p>
                            <MdDone color='#0ad60a' /> {t('Components.email.EmailForm.string3.title')}
                        </p>
                        <p>
                            {t('Components.email.EmailForm.string3.holder')}
                        </p>
                    </div>
                    <div className={styles.viewSide}>
                        <div className={`${styles.viewAccess} ${isVerify ? styles.viewAccessExit : ''}`}>
                            <p style={{ color: 'red', textAlign: 'right', fontSize: 12 }}>{errorEmail}</p>
                            <div className={styles.viewInput}>
                                <input id='email' className={styles.inputField} placeholder=' ' onChange={(e) => setEmail(e.target.value)} />
                                <label htmlFor='email' className={styles.labelField}>Enter your Email</label>
                            </div>
                            <button className={styles.btnSubmitEmail} onClick={submitEmail} style={loading ? { pointerEvents: 'none' } : {}}>
                                {
                                    loading ? <CircleLoading boderColor={'white'} /> : t('Components.email.EmailForm.button.buttonConfirm')
                                }
                            </button>

                        </div>
                        <div className={`${styles.viewVerify} ${isVerify ? styles.viewVerifyEnter : ''}`}>
                            <VerifyCodeInput onChangeCode={setVerifyCode} onClearCode={resetCode} />
                            {
                                verifyCode.length === 6 ? <button onClick={verifyEmail} className={styles.btnVerifyEmail} style={loadingVerify ? {pointerEvents: 'none'} : {}}>
                                    {
                                        loadingVerify ? <DottedLoading dotSize={20} dot1Color={'#3737fa'} dot2Color={'#f21616'} dot3Color={'#14d414'} gap={10}/> :
                                            <div className={styles.notLoading}>
                                                <img alt='' src={logoGmail} />{t('Components.email.EmailForm.button.buttonVerify')}
                                            </div>
                                    } </button> :
                                    <div>
                                        <p style={{ fontSize: 13 }}>{t('Components.email.EmailForm.verify.string1')} <span style={{ color: 'red' }}>{email}</span></p>
                                        <p style={{ fontSize: 13 }}>{t('Components.email.EmailForm.verify.string2')}</p>
                                    </div>
                            }
                            <div className={styles.viewButton}>
                                <button className={styles.btnBack} onClick={back}><IoReturnUpBack /> {t('Components.email.EmailForm.button.buttonBack')}</button>
                                <button
                                    onClick={sendEmail}
                                    className={styles.btnSubmitEmail} style={loading ? { pointerEvents: 'none' } : {}}>
                                    {
                                        loading ? <CircleLoading boderColor={'white'} /> :
                                            t('Components.email.EmailForm.button.buttonResend')
                                    }</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}