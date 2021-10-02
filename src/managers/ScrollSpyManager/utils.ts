const PREFIX = 'SCROLL_SPY'

export const getSubjectKeyForFooter = (groupName: string): string =>
  `${PREFIX}_${groupName}_FOOTER`

export const getSubjectKeyForTarget = (groupName: string): string =>
  `${PREFIX}_${groupName}_TARGET`
