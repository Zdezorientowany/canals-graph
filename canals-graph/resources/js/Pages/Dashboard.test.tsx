import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import "@testing-library/jest-dom";
import { Head, usePage } from "@inertiajs/react";

jest.mock("@inertiajs/react", () => ({
    ...jest.requireActual("@inertiajs/react"),
    usePage: jest.fn(),
    Head: jest.fn(),
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

beforeAll(() => {
    global.ResizeObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
    };
});

describe("Dashboard Component", () => {
    it("make sure our mocks are working", () => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                auth: {
                    user: {
                        name: "Test User",
                    },
                },
                graphData: [
                    { name: "Canal A", clients: 20, percentage: 50 },
                    { name: "Canal B", clients: 20, percentage: 50 },
                ],
            },
        });

        render(<Dashboard />);

        expect(screen.getByText("Dashboard")).toBeInTheDocument();

        expect(
            screen.getByText("Graph Showing Percentage of Clients per Canal")
        ).toBeInTheDocument();
    });
});
