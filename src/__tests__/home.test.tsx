import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../app/page';

describe('Home page', () => {
    beforeEach(() => {
        render(<Home />);
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
