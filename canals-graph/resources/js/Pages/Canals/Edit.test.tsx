import { render, screen, fireEvent, act } from "@testing-library/react";
import Edit from "./Edit";
import { usePage, router } from "@inertiajs/react";
import "@testing-library/jest-dom";

// Mocking inertia and AuthenticatedLayout to isolate the test
jest.mock("@inertiajs/react", () => ({
    ...jest.requireActual("@inertiajs/react"),
    usePage: jest.fn(),
    Head: jest.fn(),
    router: {
        put: jest.fn(),
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

describe("Edit Component", () => {
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

    it("renders the header correctly", () => {
        render(<Edit />);

        const header = screen.getByTestId("mock-header");
        expect(header).toBeInTheDocument();
        expect(screen.getByText("Canals:")).toBeInTheDocument();
        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    it("prefills form inputs with canal data", () => {
        render(<Edit />);

        expect(screen.getByPlaceholderText("Enter canal name")).toHaveValue(
            "Test Canal"
        );
        expect(
            screen.getByPlaceholderText("Enter number of clients")
        ).toHaveValue("42");
    });

    it("navigates back to the canal list when the Back button is clicked", () => {
        render(<Edit />);

        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);

        expect(router.visit).toHaveBeenCalledWith("/canals");
    });

    it("calls the update API when the form is submitted", async () => {
        render(<Edit />);

        const nameInput = screen.getByPlaceholderText("Enter canal name");
        const clientsInput = screen.getByPlaceholderText(
            "Enter number of clients"
        );
        const submitButton = screen.getByText("Update Canal");

        fireEvent.change(nameInput, { target: { value: "Updated Canal" } });
        fireEvent.change(clientsInput, { target: { value: "50" } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(router.put).toHaveBeenCalledWith(
            "/canals/1",
            { name: "Updated Canal", clients: 50 },
            { onSuccess: expect.any(Function) }
        );
    });
});
