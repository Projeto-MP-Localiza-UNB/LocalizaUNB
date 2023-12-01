import { mockDeep, mockReset } from "jest-mock-extended";
import { jest, beforeEach } from "@jest/globals";
import prisma from "../prisma";

const prismaMock = prisma;

jest.mock("../prisma", () => ({
    __esModule: true,
    default: mockDeep(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export { prismaMock };
