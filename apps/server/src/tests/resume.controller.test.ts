import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { vi } from "vitest";

import { ResumeController } from "../resume/resume.controller";
import { ResumeService } from "../resume/resume.service";
import { mockUserWithoutPRI } from "./mocks/mocks";

const mockResumeService = {
  create: vi.fn(),
  import: vi.fn(),
  findAll: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
  setDefault: vi.fn(),
};

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
    vi.clearAllMocks();
  });

  describe("setDefault", () => {
    it("should set a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      mockResumeService.setDefault.mockResolvedValue({
        message: "Resume set as profile successfully",
      });

      await expect(await controller.setDefault(user, profileResumeId)).toEqual({
        message: "Resume set as profile successfully",
      });
    });

    it("should handle errors when setting a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      const error = new Error("Failed to set resume as profile");
      mockResumeService.setDefault.mockRejectedValue(error);

      await expect(await controller.setDefault(user, profileResumeId)).rejects.toThrow(
        "Failed to set resume as profile",
      );
    });
  });
});

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
    vi.clearAllMocks();
  });

  it("should return 2 when adding 1 + 1", () => {
    expect(1 + 1).toBe(2);
  });
});
