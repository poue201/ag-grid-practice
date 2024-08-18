import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef,GridApi, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private gridApi!: GridApi<any>;


  userList: any []=[];
  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.getUser();
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;

  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  getUser() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any)=> {
      this.userList = res;
      console.log(this.userList);
    })
  }

  rowSelection: "single" | "multiple" = "multiple";
 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "id", headerName: 'User Id', checkboxSelection: true, headerCheckboxSelection: true,
      cellRenderer: (item:any) => {
        return "EMP-"+ item.value
      }
    },
    { field: "name", headerName: 'Name', filter: true},
    { field: "username", headerName: 'User Name' },
    { field: "email", headerName: 'E-mail', editable: true },
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100
  }

}
