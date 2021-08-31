export interface IOptions {
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

export const withDefaultOptions = (userOptions: IOptions) => ({
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
