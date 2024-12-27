import { render, screen, fireEvent } from "@testing-library/react";
import { usePage, router } from "@inertiajs/react";
import "@testing-library/jest-dom";
import Index from "./Index";

// Mocking inertia and AuthenticatedLayout to isolate the test
jest.mock("@inertiajs/react", () => ({
    ...jest.requireActual("@inertiajs/react"),
    usePage: jest.fn(),
    Head: jest.fn(),
    router: {
        get: jest.fn(),
        delete: jest.fn(),
    },
}));

jest.mock("@/Layouts/AuthenticatedLayout", () => ({
    __esModule: true,
    default: ({
        header,
        children,
    }: {
        header?: React.ReactNode;
        children?: React.ReactNode;
    }) => (
        <div>
            <div data-testid="mock-header">{header}</div>
            <div data-testid="mock-children">{children}</div>
        </div>
    ),
}));

describe("Index Component", () => {
    beforeEach(() => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: "Test User",
                    },
                },
                canals: [{ id: 1, name: "Canal A", clients: 20 }],
            },
        });
    });

    it("displays 'No canals available' when there are no canals", () => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: "Test User",
                    },
                },
                canals: [],
            },
        });

        render(<Index />);

        expect(screen.getByText("No canals available")).toBeInTheDocument();
        expect(
            screen.getByText("There are no canals to display at the moment.")
        ).toBeInTheDocument();
    });

    it("displays the list of canals", () => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: "Test User",
                    },
                },
                canals: [
                    { id: 1, name: "Canal A", clients: 20 },
                    { id: 2, name: "Canal B", clients: 30 },
                ],
            },
        });

        render(<Index />);

        expect(screen.getByText("List of canals")).toBeInTheDocument();
        expect(screen.getByText("Canal A")).toBeInTheDocument();
        expect(screen.getByText("Canal B")).toBeInTheDocument();
    });

    it("navigates to the create page when Create button is clicked", () => {
        render(<Index />);

        const createButton = screen.getByText("Create");
        fireEvent.click(createButton);

        expect(router.get).toHaveBeenCalledWith("/canals/create");
    });

    it("navigates to the show page when Show button is clicked", () => {
        render(<Index />);

        const showButton = screen.getByText("Show");
        fireEvent.click(showButton);

        expect(router.get).toHaveBeenCalledWith("/canals/1");
    });

    it("navigates to the edit page when Edit button is clicked", () => {
        render(<Index />);

        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);

        expect(router.get).toHaveBeenCalledWith("/canals/1/edit");
    });

    it("opens the delete dialog when Delete button is clicked", () => {
        render(<Index />);

        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        expect(screen.getByText("Delete Canal")).toBeInTheDocument();
    });

    it("calls the delete API when confirming delete in the dialog", () => {
        render(<Index />);

        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        const confirmDeleteButton = screen.getByText("Confirm");
        fireEvent.click(confirmDeleteButton);

        expect(router.delete).toHaveBeenCalledWith("/canals/1", {
            onSuccess: expect.any(Function),
        });
    });
});
