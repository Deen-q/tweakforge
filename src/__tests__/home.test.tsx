import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../app/page';

describe('Home page', () => {
    beforeEach(async () => {
        render(<Home />);
        // because of lazy-loaded comps:
        await waitFor(() => {
            expect(screen.getByRole('navigation')).toBeInTheDocument();
        })
    });
    it('renders Home, which renders NavBar', () => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    })
    it('renders first checkbox and checks it', async () => {
        const checkbox = screen.getByRole('checkbox', { name: "Disable OneDrive" });
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    })
})
