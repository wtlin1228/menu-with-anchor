import { withDefaultOptions } from './withDefaultOptions'
import type { IOptions } from './withDefaultOptions'

export const scrollElementHorizontallyTo = (
  scrollToPositionX: number,
  userOptions: IOptions
) => {
  const options = withDefaultOptions(userOptions)

  if (options.elementToScroll === window) {
    throw new Error(
      "Provide elementToScroll in scrollElementHorizontalTo's userOptions"
    )
  }
  const elementToScroll = options.elementToScroll as HTMLElement

  const initialHorizontalScroll = elementToScroll.scrollLeft
  const maxHorizontalScroll =
    elementToScroll.scrollWidth - elementToScroll.clientWidth
  let targetHorizontalScroll =
    scrollToPositionX + options.horizontalOffset - elementToScroll.offsetLeft
  if (targetHorizontalScroll > maxHorizontalScroll) {
    targetHorizontalScroll = maxHorizontalScroll
  }
  const horizontalDistanceToScroll =
    targetHorizontalScroll - initialHorizontalScroll

  let duration = Math.abs(
    Math.round((horizontalDistanceToScroll / 1000) * options.speed)
  )
  if (duration < options.minDuration) {
    duration = options.minDuration
  } else if (duration > options.maxDuration) {
    duration = options.maxDuration
  }

  return new Promise((resolve, reject) => {
    if (horizontalDistanceToScroll === 0) {
      resolve(true)
    }

    let requestID: number

    const startingTime = Date.now()

    const step = () => {
      const timeDiff = Date.now() - startingTime
      const t = timeDiff / duration

      const verticalScrollPosition = Math.round(
        initialHorizontalScroll + horizontalDistanceToScroll * options.easing(t)
      )

      if (
        timeDiff < duration &&
        verticalScrollPosition !== targetHorizontalScroll
      ) {
        elementToScroll.scrollTo(verticalScrollPosition, 0)
        requestID = requestAnimationFrame(step)
      } else {
        elementToScroll.scrollTo(targetHorizontalScroll, 0)
        cancelAnimationFrame(requestID)
        resolve(true)
      }
    }

    requestID = requestAnimationFrame(step)
  })
}
