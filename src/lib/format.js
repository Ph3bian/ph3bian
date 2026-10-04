import { format } from 'date-fns'

export function formatDate(iso, pattern = 'd MMM yyyy') {
  return iso ? format(new Date(iso), pattern) : ''
}
