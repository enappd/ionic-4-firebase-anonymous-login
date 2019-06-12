/**
* Ionic 4 Firebase Anonymous login
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  wantsToLoginWithCredentials: boolean = false;
  email: string = '';
  password: string = '';
  error: string = '';
  constructor(private fireauth: AngularFireAuth, private router: Router, private toastController: ToastController, private platform: Platform, public loadingController: LoadingController,
    public alertController: AlertController,
    private splashScreen: SplashScreen, private menuCtrl: MenuController) {

  }

  login() {
    this.openLoader();
    this.signInAnonymously().then(
      (userData) => {
        console.log(userData);
        this.router.navigateByUrl('/home');
      }
    ).catch(err => {
      if (err) {
        this.presentToast(`${err}`, true, 'bottom', 2100);
      }

    }).then(el => this.closeLoading());
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  private signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.auth.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        reject(`login failed ${error.message}`)
        // ...
      });
    });
  }

  loginWithCredentials() {
    this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
          this.router.navigateByUrl('/home');
        }
      })
      .catch(err => {
        console.log(`login failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }

  allowLoginWithCredentials() {
    this.wantsToLoginWithCredentials = true;
  }

}
