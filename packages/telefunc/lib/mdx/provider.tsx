export { useMDXComponents }

import { Alert, RepoLink, Table } from '@unterberg/universal-mdx-mods'
import { ChoiceGroup } from '@/components/docs/code-blocks/ChoiceGroup'
import { CodeBlockTransformer } from '@/components/docs/code-blocks/CodeBlockTransformer'
import { FileAdded, FileRemoved } from '@/components/docs/code-blocks/FileState'
import Link from '@/components/docs/Link'
import { Pre } from '@/components/docs/code-blocks/Pre'

type MdxComponents = Record<string, unknown>

const useMDXComponents = (components: MdxComponents = {}) => {
  return {
    Alert,
    Link,
    RepoLink,
    Table,
    pre: Pre,
    ChoiceGroup,
    FileAdded,
    FileRemoved,
    CodeBlockTransformer,
    ...components,
  }
}
