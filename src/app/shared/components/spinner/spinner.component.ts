import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner = true;
  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.init()
  }


  init() {
    this.spinnerService.getSpinnerObserver().subscribe((data: any) => {
      if (data === 'start') {
        this.showSpinner = true;
      } else {
        this.showSpinner = false;
      }
      this.cdRef.detectChanges();
    });
  }
}
