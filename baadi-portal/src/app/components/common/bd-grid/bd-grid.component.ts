import { Component, OnInit, Input } from '@angular/core';
import { ColumnDef } from '../../../models/column-def';

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
  @Input() defaultPageSize = this.pageSizeOptions[0]; // 10
  @Input() striped = true;
  @Input() clickable = false;
  // Field value that is emitted when a row is clicked
  // Ignored if clickable is set to false
  // Throws error if clickable is set to true and value is not provided
  @Input() rowClickEmitField: any;

  constructor() { }

  ngOnInit() {
    // Show data in grid
  }

  // Render column data for each row
  renderColumnData(row: any, colDef: ColumnDef) {
    let colData = row[colDef.fieldName || colDef.headerText] || 'NA';
    // Handle text clipping
    if (colDef.clipLength && colDef.clipLength > 0) {
      if (colDef.clipLength < colData.length) {
        colData = colData.substring(0, colDef.clipLength) + ' ...';
      }
    }
    return colData;
  }

}
