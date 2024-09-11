import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255), // for custom error message
  description: z.string().min(1, "Description is required").max(65535),
});

// title, description
// assignedUserId
// status

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(), // for custom error message
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
