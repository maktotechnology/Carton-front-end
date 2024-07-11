import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import {useEffect} from 'react'


// Extend the Window interface to include chatwootSDK
declare global {
  interface Window {
    chatwootSDK: {
      run: (config: { websiteToken: string, baseUrl: string }) => void
    }
  }
}

const App = () => {

  useEffect(() => {
    
    const script = document.createElement('script')

    
    script.src = "http://13.234.34.123:3000/packs/js/sdk.js"
    script.defer = true
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      console.log('Chatwoot script loaded')
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: 'wMgCkYYSLjSGsRE8mwFk25VV',
          baseUrl: "http://13.234.34.123:3000/"
        })
        console.log('Chatwoot initialized')
      } else {
        console.error('Chatwoot SDK not available on window object')
      }
    }

    script.onerror = () => {
      console.error('Error loading Chatwoot script')
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return (
    
    <Suspense fallback={<LayoutSplashScreen />}>
      
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
