import { Component, OnInit, ViewChild } from '@angular/core';
import { Encuesta } from '../../../_model/Encuesta';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { EncuestaAdminService } from '../../../_services/encuestaadmin.service';
//import { NuevasedeComponent } from './nuevasede/nuevasede.component';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  dataSource:MatTableDataSource<Encuesta>;
  totalElementos: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'nombres', 'apellidos','profesion','lugartrabajo', 'eleccion'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private encuestaAdminService: EncuestaAdminService
  ) {
    this.dataSource = new MatTableDataSource<Encuesta>();
   }

  ngOnInit() {
    this.cargarTabla(0, 100, false);

    this.encuestaAdminService.mensajeRegistro.subscribe((dato) => {
      this.dialog.closeAll();
      this.snackBar.open(dato, null, {
        duration: 1500,
      });
      this.cargarTabla(0, 100, false);
    });
  }

 /* applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
*/
  mostrarMas(event){
    this.cargarTabla(event.pageIndex, event.pageSize, true);
  }

  cargarTabla(pageIndex: number, pageSize: number, desdePaginador: boolean){
    this.encuestaAdminService.obtenerRegistros(pageIndex, pageSize).subscribe((datos) => {
      let registros = JSON.parse(JSON.stringify(datos)).content;
      this.dataSource = new MatTableDataSource<Encuesta>(registros);
      this.totalElementos = JSON.parse(JSON.stringify(datos)).totalElements;
      if(!desdePaginador){
        this.dataSource.paginator = this.paginator;
      }
    });
  }


  

  /*eliminarLocal(id: number) {
    this.sedeService.eliminarLocal(id).subscribe((data) => {
      this.sedeService.mensajeRegistro.next('Dato eliminado correctamente...');
    });
  }

  actualizarLocal(sede: Local) {
    this.dialog.open(NuevasedeComponent, {
      width: '80%',
      height: '80%',
      data: { sede: sede }
    });
  }

  openDialog() {
    this.dialog.open(NuevasedeComponent, {
      width: '80%',
      height: '80%'
    });
  }*/

}
