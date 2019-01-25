import { Component, OnInit, OnDestroy } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';

import {GlobalEventService} from '../global-event.service';
import {LoginService} from './login.service';
import {ImageCode} from './image-code';
import {LoginInfo} from './login-info';
import {LoginReponse} from './login-reponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  imageCode: SafeHtml;
  loginInfo = new LoginInfo();

  constructor(
    private globalevent: GlobalEventService,
    private loginsevice: LoginService,
    private sanizer: DomSanitizer,
    private router: Router,
    private notification: NzNotificationService
              ) { }

  loadImage() {
    this.loginsevice.getVerifyCode().subscribe((imagecode: ImageCode) => {
      this.imageCode = this.sanizer.bypassSecurityTrustHtml('<img src=' + imagecode.src + '>');
      this.globalevent.showLoading.next(false);
    });
  }

  submit() {
    this.loginsevice.sendLoginInfo(this.loginInfo).subscribe((res: LoginReponse) => {
      if (res.success) {
        this.router.navigate(['']);
      } else {
        this.notification.config({
          nzPlacement: 'bottomRight',
        });
        this.notification.error('错误', res.message);
      }
    });
  }

  ngOnInit() {
    this.loadImage();
  }

  ngOnDestroy() {
    this.globalevent.showLoading.next(true);
  }
}
