import React from 'react'
import Options from './options/Options'
import styles from './Settings.module.css'
export default function Settings() {
  return (
    <div className={styles.container}>
      <div>
        <Options
          label={'Appearance'}
          contentHolder={'Customize how your theme looks on your device'}
          typeOption={'selector'}
          optionsData={["Light", "Dark", "Galaxy", "Cosmic"]}
          typeData={'mode'}
        />
      </div>
      <div>
        <Options
          label={'Language'}
          contentHolder={'Select your language'}
          typeOption={'selector'}
          optionsData={["English", "Vietnamese"]}
          typeData={'language'} />
      </div>
      <div>
        <Options
          label={'Two-factor Authentication'}
          contentHolder={'Keep your account secure by 2 enabling 2FA via mal'} 
          typeOption={'toggle'}
          typeData={'secureAccount'}/>
      </div>
      <div>
        <Options
          label={'Push Notifications'}
          contentHolder={'Receive push notifications'}
          typeOption={'toggle'} 
          typeData={'pushNotifications'}/>
      </div>
      <div>
        <Options
          label={'Desktop Notifications'}
          contentHolder={'Receive push notifications in desktop'} 
          typeOption={'toggle'}
          typeData={'desktopNotifications'}/>
      </div>
      <div>
        <Options
          label={'Email Notifications'}
          contentHolder={'Receive email notifications'} 
          typeOption={'toggle'}
          typeData={'emailNotifications'}/>
      </div>
    </div>
  )
}
