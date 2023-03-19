import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { mockAllToursData } from '../mockData/mockAllToursData';


describe('Home page', () => {
    test('renders correctly', () => {
        render(<MemoryRouter initialEntries={['/']}>
            <Home />
        </MemoryRouter>)
        const mainElement = screen.getByRole('main')
        expect(mainElement).toBeInTheDocument()
    })

    test('renders a list of tours', async () => {
        render(<MemoryRouter initialEntries={['/']}>
            <Home />
        </MemoryRouter>)
        const tours = await screen.findAllByRole('tourCard')
        expect(tours).toHaveLength(mockAllToursData.length)
    })
})