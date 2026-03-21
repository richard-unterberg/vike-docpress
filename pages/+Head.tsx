// https://vike.dev/Head
import appConfig from '@/lib/config'

export function Head() {
  return (
    <>
      <link rel="icon" href={`${appConfig.publicAssets}favicon.svg`} />
      <link
        rel="preload"
        href={`${appConfig.publicAssets}fonts/inter-v20-latin-regular.woff2`}
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href={`${appConfig.publicAssets}fonts/inter-v20-latin-600.woff2`}
        as="font"
        type="font/woff2"
      />
      <link
        rel="preload"
        href={`${appConfig.publicAssets}fonts/inter-v20-latin-800.woff2`}
        as="font"
        type="font/woff2"
      />
      <link rel="stylesheet" href={`${appConfig.publicAssets}fonts.css`} />
    </>
  )
}
