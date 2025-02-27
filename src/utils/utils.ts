import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import duration from 'dayjs/plugin/duration'

dayjs.extend(relativeTime)
dayjs.extend(duration)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export default dayjs