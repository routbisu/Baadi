/**
 * Column definitions for bd-grid
 * contains metadata about bd-grid
 * fieldName: Default is equal to headerText
 */
export class ColumnDef {
    headerText: string;         // Column header text
    fieldName?: string;         // Field of the data array to which column should be mapped
    notSortable?: boolean;      // Default = false
    notSearchable?: boolean;    // Default = false
    clipLength?: number;        // Default = 0, Text gets clipped after clipLength number of characters
}
