import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  okMessage(mensagem: string) {
    this.snackBar.open(mensagem, "Ok", {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    })
  }

  errorMessage(mensagem: string) {
    this.snackBar.open(mensagem, "Error", {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    })
  }
}
