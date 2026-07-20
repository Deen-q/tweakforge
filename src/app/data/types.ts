export interface CheckboxOption {
    id: string;
    name: string;
    script: string;
    undoScript: string | null;
    description: string;
    undoDescription: string;
};

export interface VersionDataShape {
    slug: string,
    name: string,
    version: number,
    changelog: string,
    created_at: string,
};

export type BySlug = {
    [slug: string]: Pick<VersionDataShape, "version" | "changelog" | "created_at">
};