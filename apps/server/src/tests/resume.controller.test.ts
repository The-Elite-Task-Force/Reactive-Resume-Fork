import { vi } from "vitest";

import { ResumeController } from "../resume/resume.controller";
import { mockUserWithoutPRI } from "./mocks/mocks";

describe("ResumeController", async () => {
  ///
  /// To mock we can't use the standard import. Instead, use vi.importMock.
  /// You can use both the mocked version and the production version in the same scope if
  /// you rename on of the import types using 'as'
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const { ResumeService } = await vi.importMock<typeof import("../resume/resume.service")>(
    "../resume/resume.service",
  );
  // @ts-expect-error We mock return values so we don't need to parse to the constructor
  const mockResumeService = new ResumeService();

  const controller: ResumeController = new ResumeController(mockResumeService);
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("setDefault", () => {
    it("should set a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      // @ts-expect-error The object returned gives error but still works.
      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(mockResumeService.setDefault).mockResolvedValue({
        message: "Resume set as profile successfully",
      });

      expect(await controller.setDefault(user, profileResumeId)).toEqual({
        message: "Resume set as profile successfully",
      });
    });

    it("should handle errors when setting a cv as a default profile page", async () => {
      const user = mockUserWithoutPRI;
      const profileResumeId = "resumeId";

      const error = new Error("Failed to set resume as profile");
      // eslint-disable-next-line @typescript-eslint/unbound-method
      vi.mocked(mockResumeService.setDefault).mockRejectedValue(error);

      await expect(controller.setDefault(user, profileResumeId)).rejects.toThrow(
        "Failed to set resume as profile",
      );
    });
  });
});

/*
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
*/
