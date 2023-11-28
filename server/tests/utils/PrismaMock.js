import { mockDeep, mockReset } from "jest-mock-extended";

import prisma from "../../prisma-client";

jest.mock("../../prisma-client.js", () => ({
    __esModule: true,
    default: mockDeep(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma;
