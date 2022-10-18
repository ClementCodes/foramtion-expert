import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { candidateService } from '../../services/candidates.service';


@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss']
})
export class SingleCandidateComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;


  constructor(private candidatesService: candidateService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params["id"]))

    )
  }
  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.hireCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  }
  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.refuseCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  }
  onGoBack() {
    this.router.navigateByUrl("/reactive-state/candidates")

  }
}