import { Component, OnInit } from '@angular/core';
import { MissionServiceService } from 'src/app/service/mission-service.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  constructor(private missionService: MissionServiceService) {
      missionService.missionAnnounced$.subscribe(console.log);
  }

  ngOnInit() {
  }

}
