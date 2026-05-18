// supposedly this is cleaner than just writing the following in jest.config.ts:
/*
setupFilesAfterEnv: [
  require.resolve('@testing-library/jest-dom')
]
*/
import '@testing-library/jest-dom'

// for Jest-related noise: Jest's jsdom env doesnt include fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;