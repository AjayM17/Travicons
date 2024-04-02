import { Component, Input, OnInit } from '@angular/core';
import { Excursion } from 'src/app/models/excursion.modal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  @Input() excursion:Excursion | undefined  
  constructor() { }

  ngOnInit() {}

}
