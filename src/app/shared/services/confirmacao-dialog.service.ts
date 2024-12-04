import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>Remover cliente da fila</h2>
    <mat-dialog-content>Tem certeza que quer fazer isso?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button (click)="onNo()">Não</button>
      <button mat-raised-button color="warn" (click)="onYes()" cdkFocusInitial>Sim</button>
    </mat-dialog-actions>
  `,
})

export class ConfirmationDialogComponent { 
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoDialogService {

  matDialog = inject(MatDialog);

  openDialog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed();
  }
}
