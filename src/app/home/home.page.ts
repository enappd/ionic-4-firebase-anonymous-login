/**
* Ionic 4 Firebase Anonymous login
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';
  userWantsToSignup: boolean = false;
  linkError: string = '';
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  logout() {
    this.fireauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  wantsToSignup() {
    this.userWantsToSignup = true;
  }

  signup() {
    var credential = auth.EmailAuthProvider.credential(this.email, this.password);
    let that = this;
    this.fireauth.auth.currentUser.linkAndRetrieveDataWithCredential(credential)
      .then(function (usercred) {
        var user = usercred.user;
        console.log("Account linking success", user);
      }, function (error) {
        that.linkError = error.message;
        console.log("Account linking error", error);
      });
  }
}
