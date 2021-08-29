import { format } from 'date-fns'

export const formatIssued = (issued: string): string =>
  format(new Date(issued), 'MMM yyyy')
