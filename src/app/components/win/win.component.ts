import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.css']
})
export class WinComponent implements OnInit {

  player: any
  constructor(
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe(params=>{
      this.player = params['player']
    })
  }

  ngOnInit(): void {
  }

}
