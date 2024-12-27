const mockPage = { props: {} };

export const usePage = () => mockPage;
export const router = {
    visit: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
};
