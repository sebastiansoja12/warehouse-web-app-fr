import { Component, OnInit } from '@angular/core';
import {Parcel} from '../../model/parcel';
import {ParcelService} from '../../service/parcel/parcel.service';

@Component({
  selector: 'app-parcel-all',
  templateUrl: './parcel-all.component.html',
  styleUrls: ['./parcel-all.component.css']
})
export class ParcelAllComponent implements OnInit {

  constructor(private parcelService: ParcelService) { }

  parcels: Parcel[];

  ngOnInit(): void {
    this.parcelService.findAllParcels().subscribe(data => {
      this.parcels = data;
    });
  }

}
