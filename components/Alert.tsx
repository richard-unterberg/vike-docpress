import cm from '@classmatejs/react'

type AlertVariant = 'info' | 'warning' | 'error' | 'success'

const AlertInner = cm.section.variants<{ $variant: AlertVariant }>({
  base: `
    p-3
    border
    rounded-lg
    prose-p:my-0
  `,
  variants: {
    $variant: {
      info: 'bg-accent/5 border-accent/20',
      warning: '',
      error: '',
      success: '',
    },
  },
  defaultVariants: {
    $variant: 'info',
  },
})

export const Alert = ({
  type = 'info',
  heading,
  children,
}: {
  type?: AlertVariant
  heading?: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <AlertInner $variant={type}>
      {heading && <AlertHeading>{heading}</AlertHeading>}
      {children}
    </AlertInner>
  )
}

const AlertHeading = cm.header`
  mt-3
  font-bold
  text-base
  mb-5
`
