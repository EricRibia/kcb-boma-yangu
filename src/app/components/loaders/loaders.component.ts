import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-loaders',
  standalone: true,
  imports: [],
  templateUrl: './loaders.component.html',
  styleUrl: './loaders.component.css',
})
export class LoadersComponent {
  @Input({ required: true }) type:
    | 'table'
    | 'summaryCard'
    | 'disbursementPreview'
    | 'viewDisbursementHeader'
    | 'single' = 'single';
  @Input() tableLoaderConfigs: {
    columns: { label: string; value: string }[];
    rows: number[];
  } = { columns: [], rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
}
