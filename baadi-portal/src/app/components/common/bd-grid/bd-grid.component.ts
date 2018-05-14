import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ColumnDef } from '../../../models/column-def';
import * as _ from 'lodash';

@Component({
  selector: 'app-bd-grid',
  templateUrl: './bd-grid.component.html',
  styleUrls: ['./bd-grid.component.scss']
})
export class BdGridComponent implements OnInit {

  @Input() data: any[];
  @Input() colDefs: ColumnDef[];
  @Input() sortable = true;
  @Input() pageSizeOptions = [ 10, 25, 50, 100 ];
  @Input() defaultPageSize: number; // 10
  @Input() striped = true;
  @Input() clickable = false;
  // Field value that is emitted when a row is clicked
  // Ignored if clickable is set to false
  // Throws error if clickable is set to true and value is not provided
  @Input() rowClickEmitField: string;
  @Output() rowClick = new EventEmitter<any>();

  dataBackup: any[];
  selectedPageSize: number;
  selectedPageNumber: number;
  isPageSizeOptionsVisible: boolean;
  fromPosition: number;
  toPosition: number;
  totalRows: number;
  pageNumbers: number[];
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  sortColFieldName: string;
  sortColDirection: string; // A or D
  searchDisabledFields: string[];

  visibleRows: any[];

  constructor(private el: ElementRef) { }

  ngOnInit() {

    this.addMissingFieldNames();

    this.dataBackup = this.data;

    // Show data in grid
    this.selectedPageSize = this.pageSizeOptions[0];
    this.selectedPageNumber = 1;
    this.isPageSizeOptionsVisible = false;
    this.totalRows = this.data.length;
    this.sortColDirection = 'D';

    this.renderGrid();

    // Add search disabled fields
    this.searchDisabledFields = this.getNotSearchableFields();

  }

  /**
   * If fieldName is not provided for a column then it is assumed to be same as
   * the headerText
   */
  private addMissingFieldNames() {
    for (const col of this.colDefs) {
      if (!col['fieldName']) {
        col['fieldName'] = col['headerText'];
      }
    }
  }

  /**
   * Get fields which are not searchable
   */
  private getNotSearchableFields() {
    const searchDisabledFields = [];
    for (const colDef of this.colDefs) {
      if (colDef.notSearchable) {
        searchDisabledFields.push(colDef.fieldName);
      }
    }
    return searchDisabledFields;
  }

  togglePageSizeOptionsMenu() {
    this.isPageSizeOptionsVisible = !this.isPageSizeOptionsVisible;
  }

  closePageSizeOptions() {
    this.isPageSizeOptionsVisible = false;
  }

  changePageSize(pageSize) {
    this.selectedPageSize = pageSize;
    this.selectedPageNumber = 1;
    this.isPageSizeOptionsVisible = false;
    // Change the number of records visible
    this.renderGrid();
  }

  changePageNumber(pageNumber) {
    this.selectedPageNumber = pageNumber;
    this.renderGrid();
  }

  previousPage() {
    if (!this.prevBtnDisabled) {
      this.selectedPageNumber -= 1;
      this.renderGrid();
    }
  }

  nextPage() {
    if (!this.nextBtnDisabled) {
      this.selectedPageNumber += 1;
      this.renderGrid();
    }
  }

  /**
   * Render the grid with sorting, pagination & page size
   */
  renderGrid() {
    const startPos = (this.selectedPageNumber - 1) * this.selectedPageSize;
    const endPos = startPos + this.selectedPageSize;
    this.visibleRows = this.data.slice(startPos, endPos);

    // Display items number and total items
    this.totalRows = this.data.length;
    this.fromPosition = startPos + 1;
    this.toPosition = Math.min(endPos, this.totalRows);

    // Show page number buttons
    const numPages = Math.ceil(this.totalRows / this.selectedPageSize);
    this.pageNumbers = [];
    for (let i = 0; i < numPages; i++) {
      this.pageNumbers.push(i + 1);
    }

    // Disable previous and next buttons for edge cases
    if (this.selectedPageNumber === 1) {
      this.prevBtnDisabled = true;
    } else {
      this.prevBtnDisabled = false;
    }

    if (this.selectedPageNumber === this.pageNumbers[this.pageNumbers.length - 1]) {
      this.nextBtnDisabled = true;
    } else {
      this.nextBtnDisabled = false;
    }
  }

  // Render column data for each row
  renderColumnData(row: any, colDef: ColumnDef) {
    let colData = row[colDef.fieldName];
    // Handle text clipping
    if (colDef.clipLength && colDef.clipLength > 0) {
      colData = _.truncate(colData, {
        'length': colDef.clipLength,
        'omission': ' ...'
      });
    }
    return colData;
  }

  // Handle column sorting
  toggleSort(colDef: ColumnDef) {
    if (!colDef.notSortable) {
      this.sortColFieldName = colDef.fieldName;
      this.sortColDirection = this.sortColDirection === 'A' ? 'D' : 'A';
      this.sortData();
    }
  }

  /**
   * Sort data based on column name and direction
   */
  sortData() {
    this.data.sort((a, b) => {
      if (this.sortColDirection === 'A') {
        return (a[this.sortColFieldName] || '').localeCompare(b[this.sortColFieldName] || '');
      } else {
        return (b[this.sortColFieldName] || '').localeCompare(a[this.sortColFieldName] || '');
      }
    });
    this.renderGrid();
  }

  /**
   * Search grid
   */
  searchGrid(event: any) {
    const searchText = event.target.value;
    console.log(searchText);
    if (searchText && _.trim(searchText) !== '') {
      this.data = [];
      for (const record of this.dataBackup) {
        let dataFound = false;
        for (const columnName in record) {
          // Check if column is searchable
          if (_.indexOf(this.searchDisabledFields, columnName) === -1) {
            if (record[columnName]) {
              if (record[columnName].toLowerCase().includes(searchText.toLowerCase())) {
                dataFound = true;
              }
            }
          }
        }
        if (dataFound) {
          this.data.push(record);
        }
      }
    } else {
      this.data = this.dataBackup;
    }
    this.renderGrid();
  }

  // Handle row click output event
  rowClicked($event) {
    if (this.clickable) {
      this.rowClick.emit($event);
    }
  }
}
