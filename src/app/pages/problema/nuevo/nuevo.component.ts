import { Component, OnInit, Input } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar, MatRadioModule } from '@angular/material';
import { EncuestaService } from '../../../_services/encuesta.service';
//import { Problema } from '../../../_model/Problema';
//import { FeedBack } from '../../../_model/Feedback';
import { Encuesta } from '../../../_model/Encuesta';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  //problemas: Problema[] = [];
  texto: string = '';
  //feedback: FeedBack;
  encuesta: Encuesta;

  /*constructor(
    private serviceProblema: ProblemaService) {
    this.feedback = new FeedBack();
  }*/

  constructor(private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private serviceEncuesta: EncuestaService) {
    this.encuesta = new Encuesta();
  }

  ngOnInit() {
    /*this.serviceProblema.obtenerCatalogoProblemas().subscribe((data) => {
      this.problemas = data;
    });*/
    //this.cargarTabla(0, 100, false);

    this.serviceEncuesta.mensajeRegistro.subscribe((dato) => {
      this.dialog.closeAll();
      this.snackBar.open(dato, null, {
        duration: 1500,
      });
      //this.cargarTabla(0, 100, false);
    });
  }

 /* onSubmit() {
    this.feedback.fecha = new Date();
    this.serviceProblema.guardarFeedBack(this.feedback).subscribe((data)=>{
        this.serviceProblema.mensajeRegistro.next('Registrado Correctamente...');
    }, (error) => {
      this.serviceProblema.mensajeRegistro.next('Error al guardar el feedback...');
    });
  }*/
  onSubmit() {
    //this.feedback.fecha = new Date();
    this.serviceEncuesta.guardarEncuesta(this.encuesta).subscribe((data)=>{
        this.serviceEncuesta.mensajeRegistro.next('Registrado Correctamente...');
    }, (error) => {
      this.serviceEncuesta.mensajeRegistro.next('Error al guardar el la encuesta...');
    });
  }

}
