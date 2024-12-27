import "@testing-library/jest-dom";

Object.defineProperty(global, "performance", {
    value: {
        getEntriesByType: jest.fn().mockReturnValue([]),
        now: jest.fn().mockReturnValue(Date.now()),
    },
    writable: true,
});
