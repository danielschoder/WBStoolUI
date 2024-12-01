export class PaginatedResponseDto<T> {
    items: T[];
    pageNumber: number = 0;
    pageSize: number = 0;
    totalCount: number = 0;

    constructor(data: Record<string, never>, key: string) {
        this.items = data[key] || [];
        Object.assign(this, data);
    }
}
