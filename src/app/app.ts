import { Component, OnInit } from '@angular/core';
import { Videojuego } from './models/videojuego';
import { VideojuegoService } from './services/videojuego';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [FormsModule],
})
export class App implements OnInit {
  videojuegos: Videojuego[] = [];
  videojuegoActual: Videojuego = { nombre: '', genero: '', anio: 2024 };
  modoEdicion = false;
  idEdicion: number | null = null;

  cargando = false;
  error: string | null = null;

  constructor(private servicio: VideojuegoService) {}

  ngOnInit(): void {
    this.cargarVideojuegos();
  }

  cargarVideojuegos(): void {
    this.cargando = true;
    this.error = null;
    this.servicio.obtenerTodos().subscribe({
      next: (data) => {
        this.videojuegos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los juegos. ¿Está el backend corriendo?';
        this.cargando = false;
        console.error('Error al cargar videojuegos:', err);
      }
    });
  }

  guardar(): void {
    if (this.modoEdicion && this.idEdicion) {
      this.servicio.actualizar(this.idEdicion, this.videojuegoActual).subscribe({
        next: () => {
          this.resetForm();
          this.cargarVideojuegos();
        },
        error: (err) => {
          alert('Error al actualizar');
          console.error(err);
        }
      });
    } else {
      this.servicio.crear(this.videojuegoActual).subscribe({
        next: () => {
          this.resetForm();
          this.cargarVideojuegos();
        },
        error: (err) => {
          alert('Error al crear el juego');
          console.error(err);
        }
      });
    }
  }

  editar(v: Videojuego): void {
    this.videojuegoActual = { ...v };
    this.modoEdicion = true;
    this.idEdicion = v.id!;
  }

  cancelarEdicion(): void {
    this.resetForm();
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este videojuego?')) {
      this.servicio.eliminar(id).subscribe({
        next: () => {
          this.cargarVideojuegos();
        },
        error: (err) => {
          alert('Error al eliminar');
          console.error(err);
        }
      });
    }
  }

  private resetForm(): void {
    this.videojuegoActual = { nombre: '', genero: '', anio: 2024 };
    this.modoEdicion = false;
    this.idEdicion = null;
  }
}