import React, { useState, useContext } from 'react'
import styles from './Login.module.css'
import AxiosInstance from '../../../util/AxiosInstance';
import { AppContext } from '../../../util/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbDiamondFilled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/fiestaLogo.png'
import stripeLogo from '../../assets/images/stripeLogo.png'
import ghnLogo from '../../assets/images/ghnLogo.png'
import imagekitLogo from '../../assets/images/imagekitLogo.png'
import ContainerLoading from '../../public/components/loading/ContainerLoading';
import DoubleCircleLoading from './../../public/components/loading/doubleCircleLoading/DoubleCircleLoading';
export default function Login() {
    // const [userData, setUserData] = useState([])
    // const [profile, setProfile] = useState([])
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { setDataUser, setToken } = useContext(AppContext)
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
            try {
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

                } else {
                    alert('Login failed!')
                    setLoading(false)
                }
            } catch (e) {
                console.log(e);
                setLoading(false)
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
                            <p><FaCircleCheck className={styles.icon} /> Get started quickly</p>
                            <p>Integrate with developer-friendly APIs or choose low-code.</p>
                        </div>
                        <div className={styles.itemText}>
                            <p><FaCircleCheck className={styles.icon} /> Support any business model</p>
                            <p>Host code that you don't want to share with the world in private.</p>
                        </div>
                        <div className={styles.itemText}>
                            <p><FaCircleCheck className={styles.icon} /> Join millions of businesses</p>
                            <p>Flowbite is trusted by ambitious startups and enterprises of every size.</p>
                        </div>

                    </div>
                    <div className={styles.footer}>
                        <div className={styles.nav}>
                            <Link to={'/home'}>
                                Home
                            </Link>
                            <Link to={'/shop'}>
                                Shop
                            </Link>
                            <Link>
                                Term & Condition
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
                <form className={styles.loginForm} onSubmit={appLogin}>
                    {
                        loading && <ContainerLoading background={'#ffffffd7'}>
                            <DoubleCircleLoading
                                spin1Color={'black'}
                                spin2Color={'blueViolet'}
                                width={60} height={60}
                                spin1Height={35}
                                spin1Width={35} />
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
                            <p className={styles.text}>Sign in</p>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                    <div className={styles.boxInput}>
                        <div className={styles.viewInput}>
                            <label>Username</label>
                            <div className={styles.inputField}>
                                <input placeholder={'Enter your username'} type={'text'} onChange={onUserNameHandler} />
                            </div>
                        </div>
                        <div className={styles.viewInput}>
                            <label>Password</label>
                            <div className={styles.inputField}>
                                <input placeholder={'Enter your password'} type={isShowPassword ? 'text' : 'password'} onChange={onPasswordHandler} />
                                {
                                    isShowPassword ?
                                        <VscEye onClick={changeIsShowPassword} className={styles.eyePassword} /> :
                                        <VscEyeClosed onClick={changeIsShowPassword} className={styles.eyePassword} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.remember_forgotPass}>
                        <div className={styles.remember}>
                            <input type='checkbox' /> <label>Remember me</label>
                        </div>
                        <div className={styles.forgot}>
                            <p>Forgot password?</p>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className={styles.buttonLogin}>Sign in to your account</button>
                    <div className={styles.dontHaveAccount}>Dont have an account yet? <span style={{ color: 'blueViolet', cursor: 'pointer' }}>Sign up here</span></div>
                </form>
            </div>
        </div>
    )
}
