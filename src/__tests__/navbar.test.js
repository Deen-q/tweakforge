import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Page', () => {
    it('renders page, which renders navbar', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})

// otherwise, testing works

// figure out why ts complains when I convert this to .ts