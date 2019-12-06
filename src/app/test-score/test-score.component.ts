import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IGrade {
  id?: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}
@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {
  params: string;
  calcGrade: string;
  tests: Array<IGrade> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
this.loadTests();
  }
  async loadTests() {
    // Getting something called contacts from local storage or getting it
    // from JSON file if that isnt found in Local storage
    const tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
      this.tests = tests;
    } else {
      this.tests = await this.loadTestsFromJson();
    }
    console.log('This.tests from ngOninit...', this.tests);
    return tests;
  }
  async loadTestsFromJson() {
    const tests = await this.http.get('assets/tests.json').toPromise();
    return tests.json();
  }
  addTest() {
    const test: IGrade = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null,
    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }
  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
    this.toastService.showToast('success', 5000, 'Success: Items saved!');

  }
  //   searchFullName(params: string) {
  //   this.tests = this.tests.filter((contact: IGrade) => {
  //     const fullName = contact.firstName + ' ' + contact.lastName;
  //     if (params === fullName || params === contact.firstName || params === contact.lastName) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }
  finalize() {
    // const data = this.calculate();
    // this.router.navigate(['home', data]);
    // localStorage.setItem('data', JSON.stringify(data));
    // localStorage.setItem('calcData', JSON.stringify(tests));
    this.router.navigate(['home']);
}
// calculate() {
//   for (let i = 0; i < this.tests.length; i++) {
// if ( percentage >= .90 ) {

// }
// return  {

// };
// }
// }
}
