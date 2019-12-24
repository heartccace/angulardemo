import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionServiceService {

  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  constructor() { }

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
      this.missionConfirmedSource.next(astronaut);
  }
}
