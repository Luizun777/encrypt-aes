import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.scss']
})
export class EncryptionComponent implements OnInit {

  original: Array<any> = [777, 'correo@correo.com', '123'];
  password: string = '123456789ABCDEFG';
  encryptTxt: string = '';
  decryptTxt: String = '';

  constructor() { }

  ngOnInit() {
    this.encryptTxt = this.encrypt(this.original);
    this.decryptTxt = this.decrypt(this.encryptTxt);
    console.log('original:',this.original);
    console.log('encrypt:',this.encryptTxt);
    console.log('decrypt:',this.decryptTxt);
  }

  // encrypt
  encrypt( value:Array<any> ){
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.join('|')), CryptoJS.enc.Utf8.parse(this.password),
    {
      iv: CryptoJS.enc.Utf8.parse(this.password),
      mode: CryptoJS.mode.ECB, // CBC
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  }

  // decrypt
  decrypt( value: string ){
    return CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse(this.password),
    {
      iv: CryptoJS.enc.Utf8.parse(this.password),
      mode: CryptoJS.mode.ECB, // CBC
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }
}
