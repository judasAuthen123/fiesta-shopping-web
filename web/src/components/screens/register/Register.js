import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'

import stripeLogo from '../../assets/images/stripeLogo.png'
import imagekitLogo from '../../assets/images/imagekitLogo.png'
import ghnLogo from '../../assets/images/ghnLogo.png'
import logo from '../../assets/images/fiestaLogo4k.jpeg'
import { FaCircleCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


import ContainerLoading from '../../public/components/loading/ContainerLoading';
import DottedLoading from '../../public/components/loading/dottedLoading/DottedLoading';
import { validateSignup } from './validation';
import { useTranslation } from 'react-i18next';
import InputText from './InputText';
import InputPassword from './InputPassword';
import AxiosInstance from '../../../util/AxiosInstance';
import DialogSuccess from './DialogSuccess';
import FiestaAlert from '../../public/components/dialog/FiestaAlert'
import { BiArrowBack } from 'react-icons/bi'

export default function Register() {
  const { t } = useTranslation()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isVisibleDialogSuccess, setIsVisbileDialogSuccess] = useState(false)
  const [isVisibleAlert, setIsVisibleAlert] = useState(false)
  const [errors, setErrors] = useState(null)
  const ctgName = t('MongoTranslator.nameCtg')

  function clearErr({ errName }) {
    if (errors?.[errName]) {
      setErrors((prev) => {
        const { [errName]: _, ...newErr } = prev
        return newErr
      })
    }
  }

  const signUp = async (e) => {
    e.preventDefault()
    const signUpFileds = {
      name, phoneNumber, userName, password, confirmPassword
    }
    const err = validateSignup(signUpFileds)
    if (!err) {
      try {
        setLoading(true)
        const request = await AxiosInstance.post('/userApi/addUser', signUpFileds)
        if (request.result) {
          setLoading(false)
          setIsVisbileDialogSuccess(true)
        }
      } catch (error) {
        setLoading(false)
        setIsVisibleAlert(true)
      }
    } else {
      setErrors(err)
    }
  }

  return (
    <div className={styles.container}>
      <FiestaAlert label={t('Login_Register.failed.register')} isVisible={isVisibleAlert} onClose={setIsVisibleAlert}/>
      <DialogSuccess isVisible={isVisibleDialogSuccess} onClose={setIsVisbileDialogSuccess} />
      <div className={styles.containerRight}>
      <Link to={'/home'} className={styles.backToHome}><BiArrowBack /> {t('Header.home')}</Link>
        <form className={styles.loginForm} onSubmit={signUp}>
          {
            loading && <ContainerLoading background={'#ffffffd7'}>
              <DottedLoading dotSize={31} dot1Color={'blueViolet'} dot2Color={'blueViolet'} dot3Color={'blueViolet'} gap={7.5} />
            </ContainerLoading>
          }
          <div className={styles.viewWelcome}>
            <h2>
              {t('Login_Register.titleSignup')}
            </h2>
            {/* <p className={styles.textW}>Enjoy Fiesta's exceptional shopping experience!</p> */}

          </div>
          <div className={styles.boxInput}>


            <InputText label={t('Login_Register.inputLabel.name.label')} placeholder={t('Login_Register.inputLabel.name.placeholder')}
              error={errors?.name} onChange={setName}
              onClearErr={() => clearErr({ errName: 'name' })}
              ctgName={ctgName} />


            <InputText label={t('Login_Register.inputLabel.phoneNumber.label')} placeholder={t('Login_Register.inputLabel.phoneNumber.placeholder')}
              error={errors?.phoneNumber} onChange={setPhoneNumber}
              onClearErr={() => clearErr({ errName: 'phoneNumber' })}
              ctgName={ctgName} />


            <InputText label={t('Login_Register.inputLabel.userName.label')} placeholder={t('Login_Register.inputLabel.userName.placeholder')}
              error={errors?.userName} onChange={setUserName}
              onClearErr={() => clearErr({ errName: 'userName' })}
              ctgName={ctgName} />


            <InputPassword label={t('Login_Register.inputLabel.password.label')} placeholder={t('Login_Register.inputLabel.password.placeholder')}
              error={errors?.password} onChange={setPassword}
              onClearErr={() => clearErr({ errName: 'password' })}
              ctgName={ctgName} />


            <InputPassword label={t('Login_Register.inputLabel.confirmPassword.label')} placeholder={t('Login_Register.inputLabel.confirmPassword.placeholder')}
              error={errors?.confirmPassword} onChange={setConfirmPassword}
              onClearErr={() => clearErr({ errName: 'confirmPassword' })}
              ctgName={ctgName} />


          </div>
          <button
            type='submit'
            className={styles.buttonLogin}>{t('Login_Register.button.buttonSignup')}</button>

        </form>
      </div>
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
    </div>
  )
}
