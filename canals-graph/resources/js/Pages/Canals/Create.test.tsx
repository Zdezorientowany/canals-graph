import { render, screen, fireEvent, act } from "@testing-library/react";
import Create from "./Create";
import { router } from "@inertiajs/react";
import "@testing-library/jest-dom";

// Mocking inertia and AuthenticatedLayout to isolate the test
jest.mock("@inertiajs/react", () => ({
    ...jest.requireActual("@inertiajs/react"),
    Head: jest.fn(),
    router: {
        post: jest.fn(),
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

describe("Create Component", () => {
    it("renders the create form correctly", () => {
        render(<Create />);

        const headerContainer = screen.getByTestId("mock-header");
        expect(headerContainer).toHaveTextContent("Canals: Create");

        const nameInput = screen.getByPlaceholderText("Enter canal name");
        const clientsInput = screen.getByPlaceholderText(
            "Enter number of clients"
        );
        const submitButton = screen.getByRole("button", {
            name: "Create Canal",
        });

        expect(nameInput).toBeInTheDocument();
        expect(clientsInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("navigates back to the index page when Back button is clicked", () => {
        render(<Create />);

        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);

        expect(router.visit).toHaveBeenCalledWith("/canals");
    });

    it("calls the create API when the form is submitted", async () => {
        render(<Create />);

        const nameInput = screen.getByPlaceholderText("Enter canal name");
        const clientsInput = screen.getByPlaceholderText(
            "Enter number of clients"
        );
        const submitButton = screen.getByRole("button", {
            name: "Create Canal",
        });

        fireEvent.change(nameInput, { target: { value: "New Canal" } });
        fireEvent.change(clientsInput, { target: { value: "100" } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(router.post).toHaveBeenCalledWith(
            "/canals",
            { name: "New Canal", clients: 100 },
            { onSuccess: expect.any(Function) }
        );
    });
});
