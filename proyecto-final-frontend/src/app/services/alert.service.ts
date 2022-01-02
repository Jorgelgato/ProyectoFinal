import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
    ) {}

  ngOnInit() {}  

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentSuccessToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  async presentErrorToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

  async presentAlertConfirm(msg: string) {
    let choice;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación!',
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss(false)
            return false;
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            alert.dismiss(true)
            return false;
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
        choice = data;
    })
    return choice;
  }
}
