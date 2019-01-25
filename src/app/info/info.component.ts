import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';

import {GlobalEventService} from '../global-event.service';
import {InfoService} from './info.service';
import {Info} from './info';
import {backend} from '../backend';
import {UploadCallback} from './upload-callback';

import {UploadFile, UploadXHRArgs, NzNotificationService} from 'ng-zorro-antd';

const api = backend;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  info = new Info();
  uploadUrl = api.imageupload;
  backEndDomain = 'http://localhost/houtai/';

  constructor(private globalevent: GlobalEventService,
              private infoservice: InfoService,
              private http: HttpClient,
              private notice: NzNotificationService) { }

  before = (file: UploadFile): boolean => {
    console.log(file);
    return true;
  }

  customReq1 = (item: UploadXHRArgs) => {
     const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('name', 'file');
    const req = new HttpRequest('POST', item.action, formData);
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            (event as any).percent = event.loaded / event.total * 100;
          }
          item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) {
          item.onSuccess(event.body, item.file, event);
          if ((event.body as UploadCallback).success) {
            const fileInfo = {
              name: (event.body as UploadCallback).location,
              url: this.backEndDomain + (event.body as UploadCallback).location
            };
            this.info.info_banner = [fileInfo];
          } else {
            this.notice.config({
              nzPlacement: 'bottomRight',
            });
            this.notice.error('错误', (event.body as UploadCallback).message);
          }
        }
      },
      (err) => {
        item.onError(err, item.file);
      });
  }

  customReq2 = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    formData.append('name', 'file');
    const req = new HttpRequest('POST', item.action, formData);
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total > 0) {
            (event as any).percent = event.loaded / event.total * 100;
          }
          item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) {
          if ((event.body as UploadCallback).success) {
            const image = (this.info.info_carousel as Object[]).find(f => f.uid === item.file.uid);
            image.name = (event.body as UploadCallback).location;
            image.url = (event.body as UploadCallback).location;
            item.onSuccess((event.body as UploadCallback), item.file, event);
          } else {
            this.notice.config({
              nzPlacement: 'bottomRight',
            });
            this.notice.error('错误', (event.body as UploadCallback).message);
          }
        }
      },
      (err) => {
        item.onError(err, item.file);
      });
  }

  ngOnInit() {
    this.infoservice.getInfo().subscribe((res: Info) => {
      this.info = res;
      if (this.info.info_banner !== '') {
        this.info.info_banner = [{
          uid: this.info.info_banner,
          name: this.info.info_banner,
          url: this.backEndDomain + this.info.info_banner
        }];
      }
      if (this.info.info_carousel !== '') {
        const temp = (this.info.info_carousel as string).split(',');
        console.log(temp);
        temp.forEach((item) => {
          (this.info.info_carousel as Object[]).push({
            uid: item,
            name: item,
            url: item
          });
        });
      }
      this.globalevent.showLoading.next(false);
    });
  }

  ngOnDestroy() {
    this.globalevent.showLoading.next(true);
  }
}
