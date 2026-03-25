import type { Locale } from '@/lib/i18n/config'
import type { DocsSystemConfig, ResolvedDocsSystemConfig } from '@/lib/docs/systemConfig'
import type { ThemePreference } from '@/lib/theme'

declare global {
  interface ImportMetaEnv {
    readonly BASE_ASSETS?: string
  }

  namespace Vike {
    interface Config {
      docs?: DocsSystemConfig
    }

    interface ConfigResolved {
      docs?: ResolvedDocsSystemConfig
    }

    interface PageContext {
      locale: Locale
      themePreference: ThemePreference
      urlPathnameLocalized: string
    }

    interface PageContextServer {
      locale: Locale
      themePreference: ThemePreference
      urlPathnameLocalized: string
    }

    interface PageContextClient {
      locale: Locale
      themePreference: ThemePreference
      urlPathnameLocalized: string
    }
  }
}

export {}
