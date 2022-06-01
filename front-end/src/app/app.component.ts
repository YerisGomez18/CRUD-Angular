import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { Cursos } from './models/cursos';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  curso = {} as Cursos;
  cursos!: Cursos[];

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.getCursos();
  }

  // crea o actuaiza el producto
  saveCursos(form: NgForm) {
    if (this.curso.id !== undefined) {
      this.cursosService.updateCursos(this.curso).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.cursosService.saveCursos(this.curso).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // obtener producto
  getCursos() {
    this.cursosService.getCursos().subscribe((cursos: Cursos[]) => {
      this.cursos = cursos;
    });
  }

  // elimina el producto
  deleteCursos(cursos: Cursos) {
    this.cursosService.deleteCursos(cursos).subscribe(() => {
      this.getCursos();
    });
  }

  // copia el producto
  editCursos(cursos: Cursos) {
    this.curso = { ...cursos };
  }

  // limpa el formulario
  cleanForm(form: NgForm) {
    this.getCursos();
    form.resetForm();
    this.curso = {} as Cursos;
  }

}
