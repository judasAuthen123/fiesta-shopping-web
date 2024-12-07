import React, { useState, useContext, useEffect } from 'react'
import styles from './Login.module.css'
import AxiosInstance from '../../../util/AxiosInstance';
import { AppContext } from '../../../util/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoClose } from 'react-icons/io5';
import { TbDiamondFilled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/fiestaLogo.png'
import stripeLogo from '../../assets/images/stripeLogo.png'
import ghnLogo from '../../assets/images/ghnLogo.png'
import { BiArrowBack } from "react-icons/bi";
import imagekitLogo from '../../assets/images/imagekitLogo.png'
import ContainerLoading from '../../public/components/loading/ContainerLoading';
import DoubleCircleLoading from './../../public/components/loading/doubleCircleLoading/DoubleCircleLoading';
import { useTranslation } from 'react-i18next';
import { validateLogin } from './validate';
import FiestaAlert from '../../public/components/dialog/FiestaAlert';
export default function Login() {
    const { t } = useTranslation()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { setDataUser, setToken } = useContext(AppContext)
    const [isVisibleAlert, setIsVisibleAlert] = useState(false)
    const ctgName = t('MongoTranslator.nameCtg')
    const navigate = useNavigate()
    const onUserNameHandler = (e) => {
        setUserName(e.target.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const changeIsShowPassword = () => setIsShowPassword(prev => !prev)
    const appLogin = (e) => {
        e.preventDefault()
        const dbLogin = async () => {
            const err = validateLogin({ userName, password })
            if (!err) {
                try {
                    setErrors(null)
                    setLoading(true)
                    const request = await AxiosInstance.post('/userApi/login', {
                        userName: userName,
                        cpassword: password
                    })
                    console.log(request);

                    if (request.statusCode === 200) {
                        const user = request.user
                        const token = request.token
                        if (user && token) {
                            localStorage.setItem('token', JSON.stringify(token));
                            localStorage.setItem('user', JSON.stringify(user));
                            setDataUser(user)
                            setToken(token)
                            navigate('/home')
                            setLoading(false)
                        }
                    }
                } catch (e) {
                    setLoading(false)
                    setIsVisibleAlert(true)
                }
            } else {
                setErrors(err)
            }
        }
        dbLogin()
    }


    // useEffect(() => {
    //     console.log(profile);
    // }, [profile])
    // const responseFacebook = (response) => {
    //     console.log(response);
    // }
    // const googleLogin = useGoogleLogin({
    //     onSuccess: (codeResponse) => setUserData(codeResponse),
    //     onerror: (error) => console.log('Google signin error: ', error)
    // })
    // useEffect(
    //     () => {
    //         if (userData) {
    //             AxiosInstance.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${userData.access_token}`,
    //                     Accept: 'application/json'
    //                 }
    //             })
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                     localStorage.setItem('accessToken', userData.access_token)
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [userData]
    // );
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };
    return (
        <div className={styles.container}>
            <FiestaAlert label={t('Login_Register.failed.login')} isVisible={isVisibleAlert} onClose={setIsVisibleAlert} />
            <div className={styles.containerLeft}>
                <div className={styles.refrerencesBox}>
                    <div className={styles.viewLogo}>
                        <div className={styles.logo}>
                            <img alt='' src={logo} />
                        </div>
                        <h3 style={{ fontSize: 30, fontWeight: 550 }}>Fashion Fiesta</h3>
                    </div>
                    <div className={styles.viewText}>
                        <div className={styles.itemText}>
                            <p><FaCircleCheck className={styles.icon} /> {t('Login_Register.textSuggest.text1.string1')}</p>
                            <p>{t('Login_Register.textSuggest.text1.string2')}</p>
                        </div>
                        <div className={styles.itemText}>
                            <p><FaCircleCheck className={styles.icon} />{t('Login_Register.textSuggest.text2.string1')}</p>
                            <p>{t('Login_Register.textSuggest.text2.string2')}</p>
                        </div>
                        <div className={styles.itemText}>
                            <p><FaCircleCheck className={styles.icon} />{t('Login_Register.textSuggest.text3.string1')}</p>
                            <p>{t('Login_Register.textSuggest.text3.string2')}</p>
                        </div>

                    </div>
                    <div className={styles.footer}>
                        <div className={styles.nav}>
                            <Link to={'/home'}>
                                {t('Login_Register.home')}
                            </Link>
                            <Link to={'/shop'}>
                                {t('Login_Register.shop')}
                            </Link>
                        </div>
                        <div className={styles.partner}>
                            <img alt='' src={imagekitLogo} />
                            <img alt='' src={stripeLogo} />
                            <img alt='' src={ghnLogo} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerRight}>
                <Link to={'/home'} className={styles.backToHome}><BiArrowBack /> {t('Header.home')}</Link>
                <form className={styles.loginForm} onSubmit={appLogin}>
                    {
                        loading && <ContainerLoading background={'#ffffffd7'}>
                            <DoubleCircleLoading
                                spin1Color={'black'}
                                spin2Color={'blueViolet'}
                                width={100} height={100}
                                spin1Height={55}
                                spin1Width={55} />
                        </ContainerLoading>
                    }
                    <div className={styles.viewWelcome}>
                        <h2>
                            Welcome back
                        </h2>
                        {/* <p className={styles.textW}>Enjoy Fiesta's exceptional shopping experience!</p> */}
                        <div className={styles.suggest}>
                            <div className={styles.view}>
                                <FaStar className={styles.icon} /> Smart Shopping
                            </div>
                            <div className={styles.view}>
                                <TbDiamondFilled className={styles.icon} /> Premium Fashion
                            </div>
                        </div>
                        <div className={styles.viewLine}>
                            <p className={styles.text}>{t('Login_Register.titleSignin')}</p>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                    <div className={styles.boxInput}>
                        <div className={styles.viewInput}>
                            <label>{t('Login_Register.inputLabel.userName.label')}</label>
                            <div className={styles.inputField}>
                                <input placeholder={t('Login_Register.inputLabel.userName.placeholder')} type={'text'} onChange={onUserNameHandler} />
                            </div>
                            {
                                errors?.userName && <div className={styles.viewErr}>
                                    {errors.userName.message[ctgName]} <IoClose />
                                </div>
                            }
                        </div>
                        <div className={styles.viewInput}>
                            <label>{t('Login_Register.inputLabel.password.label')}</label>
                            <div className={styles.inputField}>
                                <input placeholder={t('Login_Register.inputLabel.password.placeholder')} type={isShowPassword ? 'text' : 'password'} onChange={onPasswordHandler} />
                                {
                                    isShowPassword ?
                                        <VscEye onClick={changeIsShowPassword} className={styles.eyePassword} /> :
                                        <VscEyeClosed onClick={changeIsShowPassword} className={styles.eyePassword} />
                                }
                            </div>
                            {
                                errors?.password && <div className={styles.viewErr}>
                                    {errors.password.message[ctgName]} <IoClose />
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.remember_forgotPass}>
                        <div className={styles.remember}>
                            <input type='checkbox' /> <label>{t('Login_Register.rememberMe')}</label>
                        </div>
                        <div className={styles.forgot}>
                            <p>{t('Login_Register.forgotPassword')}</p>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className={styles.buttonLogin}>{t('Login_Register.button.buttonLogin')}</button>
                    <div className={styles.dontHaveAccount}>{t('Login_Register.dontHaveAccount')}<span onClick={() => navigate('/register')} style={{ color: 'blueViolet', cursor: 'pointer' }}>{t('Login_Register.signUpHere')}</span></div>
                </form>
            </div>
        </div>
    )
}
