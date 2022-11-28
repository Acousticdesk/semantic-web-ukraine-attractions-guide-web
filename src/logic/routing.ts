import { createContext } from 'react'

export const GuideStepContext = createContext({
  guideStep: 0,
  setGuideStep: (value: number) => {}
});
