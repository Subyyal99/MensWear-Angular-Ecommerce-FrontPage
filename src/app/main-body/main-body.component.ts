import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  HostListener,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { dataService } from 'src/libs/data.service';
// import { NpnSliderModule } from 'npn-slider/public_api';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css'],
})
export class MainBodyComponent implements OnInit {
  // @ViewChild('product') myElement!: ElementRef;
  // @ViewChild('quick') quick!: ElementRef;
  min: number = 0;
  max: number = 10000;
  product: any;
  display: boolean = true;
  hoveredIndex!: number;
  Inputmin: number = 0;
  Inputmax: number = 10000;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 480) {
      this.display = false;
    }
    if (window.innerWidth > 480) {
      this.display = true;
    }
    console.log(this.display);
  }

  constructor(public data: dataService, private cdr: ChangeDetectorRef) {
    this.product = data.Products;
  }
  ngOnInit(): void {}

  changingView = () => {
    this.display = !this.display;
  };
  valuechange(newValue: any) {
    // mymodel = newValue;
    console.log(newValue);
    console.log(this.min);
    this.min = newValue;
    console.log('after', this.min);
  }

  hightolow = (selectElement: EventTarget | null) => {
    const value = (selectElement as HTMLSelectElement).value;
    if (value == '3') {
      // console.log(this.product);
      this.product = this.data.Products.sort((a, b) => b.price - a.price);
      // console.log(this.product);
    } else if (value == '4') {
      this.product = this.data.Products.sort((a, b) => a.price - b.price);
    }
  };

  onSliderChange(selectedValues: number[]) {
    console.log(selectedValues);
    this.min = selectedValues[0];
    this.max = selectedValues[1];
    this.product = this.data.Products.filter(
      (p) => p.price > this.min && p.price < this.max
    );
    this.cdr.detectChanges();
  }

  displaying = (i: number) => {
    // console.log('here');
    this.hoveredIndex = i;
    // console.log('Product', this.myElement, 'i: ', this.hoveredIndex);
  };
  Undisplay = () => {
    console.log('mouse leve');
    this.hoveredIndex = -1;
    // this.quick.nativeElement.style.display = 'none';
  };
}
