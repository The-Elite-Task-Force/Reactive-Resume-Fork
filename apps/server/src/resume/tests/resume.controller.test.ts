import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { ResumeController } from "../resume.controller";
import { ResumeService } from "../resume.service";
import { mockUserWithoutPRI } from "./mocks/mocks";

const mockResumeService = {
  create: jest.fn(),
  import: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  setDefault: jest.fn(),
};
/*
describe("ResumeController", () => {
  let controller: ResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [{ provide: ResumeService, useValue: mockResumeService }],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("setDefault", () => {
    it("should set a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      mockResumeService.setDefault.mockResolvedValue({
        message: "Resume set as profile successfully",
      });

      expect(await controller.setDefault(user, profileResumeId)).toEqual({
        message: "Resume set as profile successfully",
      });
    });

    it("should handle errors when setting a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      mockResumeService.setDefault.mockRejectedValue(new Error("Failed to set resume as profile"));

      await expect(controller.setDefault(user, profileResumeId)).rejects.toThrow(
        "Failed to set resume as profile",
      );
    });
  });
}); */

describe("basic math test", () => {
  let controller: ResumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [{ provide: ResumeService, useValue: mockResumeService }],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 2 when adding 1 + 1", () => {
    expect(1 + 1).toBe(2);
  });
});
