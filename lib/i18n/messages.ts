import { type Locale, resolveLocale } from '@/lib/i18n/config'
import { messages } from '@/lib/messages'

type Messages = typeof messages
type MessageGroup = keyof Messages
type MessageKey<TGroup extends MessageGroup> = keyof Messages[TGroup]

export const t = <TGroup extends MessageGroup, TKey extends MessageKey<TGroup>>(
  locale: Locale | string | undefined,
  group: TGroup,
  key: TKey,
) => {
  const entry = messages[group][key] as Record<Locale, string>
  return entry[resolveLocale(locale)]
}
