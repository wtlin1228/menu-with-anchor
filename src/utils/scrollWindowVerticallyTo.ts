interface IOptions {
  cancelOnUserAction?: boolean
  easing?: (t: number) => number
  elementToScroll?: Element | Window
  horizontalOffset?: number
  maxDuration?: number
  minDuration?: number
  passive?: boolean
  speed?: number
  verticalOffset?: number
}

const defaultOptions = {
  cancelOnUserAction: true,
  easing: (t: number): number => --t * t * t + 1, // easeOutCubic
  elementToScroll: window,
  horizontalOffset: 0,
  maxDuration: 3000,
  minDuration: 250,
  speed: 500,
  verticalOffset: 0,
}

const withDefaultOptions = (userOptions: IOptions) => ({
  cancelOnUserAction:
    userOptions?.cancelOnUserAction || defaultOptions.cancelOnUserAction,
  easing: userOptions?.easing || defaultOptions.easing,
  elementToScroll:
    userOptions?.elementToScroll || defaultOptions.elementToScroll,
  horizontalOffset:
    userOptions?.horizontalOffset || defaultOptions.horizontalOffset,
  maxDuration: userOptions?.maxDuration || defaultOptions.maxDuration,
  minDuration: userOptions?.minDuration || defaultOptions.minDuration,
  speed: userOptions?.speed || defaultOptions.speed,
  verticalOffset: userOptions?.verticalOffset || defaultOptions.verticalOffset,
})

export const scrollWindowVerticallyTo = (
  scrollToElement: Element,
  userOptions: IOptions
) => {
  const options = withDefaultOptions(userOptions)

  const elementToScroll = options.elementToScroll

  const initialVerticalScroll = window.scrollY
  const targetVerticalScroll =
    window.scrollY +
    scrollToElement.getBoundingClientRect().top +
    options.verticalOffset
  const verticalDistanceToScroll = targetVerticalScroll - initialVerticalScroll

  let duration = Math.abs(
    Math.round((verticalDistanceToScroll / 1000) * options.speed)
  )
  if (duration < options.minDuration) {
    duration = options.minDuration
  } else if (duration > options.maxDuration) {
    duration = options.maxDuration
  }

  return new Promise((resolve, reject) => {
    if (verticalDistanceToScroll === 0) {
      resolve(true)
    }

    let requestID: number

    const startingTime = Date.now()

    const step = () => {
      const timeDiff = Date.now() - startingTime
      const t = timeDiff / duration

      const verticalScrollPosition = Math.round(
        initialVerticalScroll + verticalDistanceToScroll * options.easing(t)
      )

      if (
        timeDiff < duration &&
        verticalScrollPosition !== targetVerticalScroll
      ) {
        elementToScroll.scrollTo(0, verticalScrollPosition)
        requestID = requestAnimationFrame(step)
      } else {
        elementToScroll.scrollTo(0, targetVerticalScroll)
        cancelAnimationFrame(requestID)
        resolve(true)
      }
    }

    requestID = requestAnimationFrame(step)
  })
}
