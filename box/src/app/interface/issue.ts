export interface Issue {
    id: number;
    title: string;
    body: string;
    labels: { name: string }[];
    state: string;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    url: string;
    repository_url: string;
    comments: number;
}