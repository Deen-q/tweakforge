// yes, this file exists purely for a one liner. supposedly this is cleaner than just writing the following in jest.config.ts:
/*
setupFilesAfterEnv: [
  require.resolve('@testing-library/jest-dom')
]
*/
import '@testing-library/jest-dom'