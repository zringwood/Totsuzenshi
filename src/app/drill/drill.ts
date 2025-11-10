import { HttpParams } from '@angular/common/http';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-drill',
  imports: [RouterLink],
  templateUrl: './drill.html',
  styleUrl: './drill.css',
})
export class Drill implements OnInit {
  public math = Math
 
  pauseLabel = signal("Pause")
  startLabel = signal("Start")
  timerIncrement: number = 1;
  intervalID = -1;

  httpParams = new HttpParams({ fromString: window.location.href })
  drillLength = Number.parseInt(this.httpParams.get("length") || "90")
  beepStackLength = Number.parseInt(this.httpParams.get("beeps") || "15");
  timerValue = signal(this.drillLength)

  beepStack: number[] = []
  ngOnInit(): void {
    //We generate an array of beeps so that we can adjust the distribution later if we want to.
    for (let i = 0; i < this.beepStackLength; i++) {
      this.beepStack[i] = Math.floor(5 + (Math.random() * (this.drillLength-5)))
    }
    this.beepStack.sort((a, b) =>   b - a)
  }

  startTimer() {
    if (this.intervalID == -1) {
      this.startLabel.set("Reset")
      this.intervalID = setInterval(() => {
        this.timerValue.set(this.timerValue() - this.timerIncrement);
    
    if (this.timerValue() <= 0)
      clearInterval(this.intervalID);
      }, 1000)
    } else {
      clearInterval(this.intervalID)
      this.startLabel.set("Start")
      this.timerValue.set( this.drillLength)
    }
  }
  pauseTimer() {
    this.timerIncrement = (this.timerIncrement + 1) % 2
    if (this.timerIncrement == 0)
      this.pauseLabel.set("Resume")
    else
      this.pauseLabel.set("Pause")
  }

}
