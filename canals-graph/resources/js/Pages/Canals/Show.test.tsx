import { render, screen, fireEvent, within } from "@testing-library/react";
import { usePage, router } from "@inertiajs/react";
import "@testing-library/jest-dom";
import Show from "./Show";

//Mocking inertia and AuthenticatedLayout to isolate the test
jest.mock("@inertiajs/react", () => ({
    ...jest.requireActual("@inertiajs/react"),
    usePage: jest.fn(),
    Head: jest.fn(),
    router: {
        delete: jest.fn(),
        visit: jest.fn(),
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

describe("Show Component", () => {
    beforeEach(() => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                canal: {
                    id: 1,
                    name: "Test Canal",
                    clients: 42,
                },
            },
        });
    });

    it("renders the canal details correctly", () => {
        render(<Show />);

        const detailsContainer = screen.getByTestId("mock-children");
        const details = within(detailsContainer);

        expect(details.getByText("1")).toBeInTheDocument();
        expect(details.getByText("Test Canal")).toBeInTheDocument();
        expect(details.getByText("42")).toBeInTheDocument();
    });

    it("renders canal header correctly", () => {
        render(<Show />);

        const headerContainer = screen.getByTestId("mock-header");
        const header = within(headerContainer);

        expect(header.getByText("Canals:")).toBeInTheDocument();
        expect(header.getByText("Test Canal")).toBeInTheDocument();
    });

    it("navigates to the edit page when Edit button is clicked", () => {
        render(<Show />);

        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton);

        expect(router.visit).toHaveBeenCalledWith("/canals/1/edit");
    });

    it("opens the delete dialog when Delete button is clicked", () => {
        render(<Show />);

        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        expect(screen.getByText("Delete Canal")).toBeInTheDocument();
    });

    it("navigates back to the canals list when Back button is clicked", () => {
        render(<Show />);

        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);

        expect(router.visit).toHaveBeenCalledWith("/canals");
    });

    it("calls the delete API when confirming delete in the dialog", () => {
        render(<Show />);

        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        const confirmDeleteButton = screen.getByText("Confirm");
        fireEvent.click(confirmDeleteButton);

        expect(router.delete).toHaveBeenCalledWith("/canals/1", {
            onSuccess: expect.any(Function),
        });
    });
});
