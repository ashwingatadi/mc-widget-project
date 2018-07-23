import { Component, OnInit, ElementRef , Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { ConfigService } from '../../services/config.service';
import { ApiconnectService } from '../../services/apiconnect.service';
import { RenderStyleService } from '../../services/renderstyle.service';

@Component({
  selector: 'app-mc-register',
  templateUrl: './mc-register.component.html',
  styleUrls: ['./mc-register.component.css']
})
export class McRegisterComponent implements OnInit {

   consentRequired: String = "false";
   signUpType: String = "default";
   signupheader: String = "";
   private widgetclasses;
   private widgetstyles;
   public widgetstylenew;

   constructor(private router:Router, private renderer: Renderer2, private elm: ElementRef , private configService: ConfigService,private apiService: ApiconnectService,
   private renderstyleservice : RenderStyleService) {
    //this.consentRequired = elm.nativeElement;
     this.consentRequired = document.getElementsByTagName("mc-signup")[0].getAttribute("consent-required");
     this.signUpType = document.getElementsByTagName("mc-signup")[0].getAttribute("signup-type");

     this.signupheader = document.getElementsByTagName("mc-signup")[0].getAttribute("signup-header");
     this.widgetclasses = document.getElementsByTagName("mc-signup")[0].getAttribute('widget-class');
     this.widgetstyles = document.getElementsByTagName("mc-signup")[0].getAttribute('widget-style');
    }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.widgetstylenew = this.renderstyleservice.renderStyle(this.elm.nativeElement, this.widgetclasses, this.widgetstyles, this.renderer);
  }

  NavigateToLogin(){
    this.router.navigateByUrl('/login', { skipLocationChange: true });
  }
}
