import { Component } from '@angular/core';
import {NavController, AlertController, ToastController,NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public phone : FormGroup ;
public message : any ;

  constructor(public alert:AlertController,public http:Http, public toastCtrl:ToastController,public formBuilder:FormBuilder, public navCtrl: NavController) {
    this.phone = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }
  phoneForm(){

    let codenum = this.phone.controls["code"].value ,
           code = codenum.substring(0,6);         
         
    let     headers  : any      = new Headers({ 'X-Requested-With': 'XMLHttpRequest'}),
    options  : any      = new RequestOptions({ headers: headers }),
    url      : any       = 'http://localhost:8000/api/mobile_operator',
    body    : any        = {code:code};

    this.http.post(url,body,options).map(res =>res.json())
    .subscribe(
     data =>  {
         this.message =  data.operator.Description ;
         let alert = this.alert.create({
          title: 'Operator',
          subTitle: this.message,
          buttons: ['Dismiss']
        });
        alert.present();    
     },

   error => {
     console.log(error);
     
     if (error.status === 401){
      let alert = this.alert.create({
        title: 'Operator',
        subTitle: 'No mobile operator with such  code',
        buttons: ['Dismiss']
      });
      alert.present(); 
     }

   });
  
  }
  sendNotification(message)  : void
  {
     let notification = this.toastCtrl.create({
         message       : message,
         duration      : 5000
     });
     notification.present();
  }
}
