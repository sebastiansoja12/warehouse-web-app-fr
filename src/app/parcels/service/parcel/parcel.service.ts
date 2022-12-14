import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Parcel} from '../../model/parcel';
import {globalUrl} from '../../../../../urlConfig';
import {PaymentInformation} from '../../model/PaymentInformation';


@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  url: string;

  @Output() paymentUrl: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient, private localStorage: LocalStorageService,
              private router: Router) {
    this.url = globalUrl.url;
  }


  public save(parcel: Parcel): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', this.localStorage.retrieve('authenticationToken'));

    return this.http.post(this.url + '/api/parcels', parcel, {responseType: 'text'})
      .pipe(map(data => {
        return true;
      }));
  }

  findPaymentByParcelId(id: number): Observable<PaymentInformation> {
    return this.http.get<PaymentInformation>(this.url + '/api/payments/' + id);
  }

  findParcelById(id: number): Observable<Parcel> {
    return this.http.get<Parcel>(this.url + '/api/parcels/' + id);
  }

  findAllParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.url + '/api/parcels');
  }

  public saveParcel(parcel: Parcel): Observable<boolean> {
    return this.http.post(this.url + '/api/parcels', parcel, {responseType: 'text'})
      .pipe(map(data => {
        this.localStorage.store('paymentUrl', data);
        this.paymentUrl.emit(data);
        return true;
      }));
  }

  getPaymentUrl(): string {
    return this.localStorage.retrieve('paymentUrl');
  }
}
