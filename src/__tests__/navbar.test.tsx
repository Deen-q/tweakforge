import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import NavBar from '../app/components/NavBar';

describe("NavBar", () => {
    beforeEach(() => {
        render(<NavBar />);
    });
    it('renders navigation bar', () => {
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
    it("renders all navigation links", () => {
        expect(screen.getByRole('link', { name: 'scripts' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute('href', '/about');
    });

    ///>> use playwrite or cypress to write a proper E2E/integration test later
    // it("can access the about page within the Nav Bar", async () => {
    //     render(<Home />);
    //     const aboutLink = screen.getByText('about');
    //     await user.click(aboutLink);
    //     const aboutTweakForge = screen.getByRole('button', { name: "about tweakforge" })
    //     expect(aboutTweakForge).toBeInTheDocument();
    //     // once clicked, also check if aria-current is working????
    // });
})
// // figure out why ts complains when I convert this to .ts