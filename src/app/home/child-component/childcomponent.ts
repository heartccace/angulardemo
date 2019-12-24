import { Component, OnInit } from '@angular/core';
import { MissionServiceService } from 'src/app/service/missionservice';

@Component({
  selector: 'app-child-component',
  templateUrl: './childcomponent.html',
  styleUrls: ['./childcomponent.scss']
})
export class ChildComponentComponent implements OnInit {

  constructor(private missionService: MissionServiceService) {
      missionService.missionAnnounced$.subscribe(console.log);
  }

  ngOnInit() {
  }

}
