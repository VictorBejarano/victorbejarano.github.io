import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PortfolioRepository } from '../domain/repositories/portfolio.repository';
import { Profile } from '../domain/models/profile.model';
import { Study } from '../domain/models/study.model';
import { Experience } from '../domain/models/experience.model';
import { Project } from '../domain/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class MockPortfolioRepository extends PortfolioRepository {
  getProfile(): Observable<Profile> {
    return of({
      id: '1',
      name: 'Victor Bejarano',
      dynamicRole: 'Senior Full Stack Developer | Mechatronics Engineer',
      professionalSummary: 'Experienced software developer with a strong focus on frontend architecture and cloud integrations...',
      personalSummary: 'I love learning about AI and experimenting with new tech.',
      email: 'victor@example.com'
    }).pipe(delay(500));
  }

  getStudies(): Observable<Study[]> {
    return of([
      {
        id: '1',
        type: 'professional' as const,
        institution: 'University Name',
        degreeOrCourse: 'Mechatronics Engineering',
        startDate: '2014-01-01',
        endDate: '2019-02-01'
      }
    ]).pipe(delay(500));
  }

  getExperience(): Observable<Experience[]> {
    return of([
      {
        id: '1',
        companyName: 'Sophos Solutions (GFT)',
        role: 'Full Stack Frontend Developer',
        startDate: '2022-03-01',
        isCurrent: true,
        description: 'Developed vehicle credit application systems using Angular, NgRx, NX, and AWS serverless architecture (Lambda, Step Functions, DynamoDB, EventBridge). Added MCPs and prompt engineering for Chat AI.',
        technologiesUsed: ['Angular', 'NgRx', 'AWS', 'TypeScript']
      },
      {
        id: '2',
        companyName: 'Brander Ideas (Interservicios)',
        role: 'Junior-Intermediate Developer',
        startDate: '2020-03-01',
        endDate: '2022-03-01',
        isCurrent: false,
        description: 'Developed administration software for a courier company using Angular (RxJS, NgRx, Material) and Firebase (Firestore, Functions, Auth, Hosting). Also developed a Flutter delivery tracking app integrated with Zebra thermal printers.',
        technologiesUsed: ['Angular', 'Firebase', 'Flutter', 'Zebra']
      },
      {
        id: '3',
        companyName: 'Colsubsidio',
        role: 'University Intern / Support',
        startDate: '2019-02-01',
        endDate: '2020-02-01',
        isCurrent: false,
        description: 'HTML, AngularJS support. Managed D2L Brightspace LMS platform. Developed small ARcore/ARkit apps for Android and iOS.',
        technologiesUsed: ['HTML', 'AngularJS', 'ARcore', 'D2L']
      }
    ]).pipe(delay(500));
  }

  getProjects(): Observable<Project[]> {
    return of([
      {
        id: '1',
        title: 'Credit Application Portal',
        shortDescription: 'Vehicle credit system UI',
        fullDescription: 'Frontend architectured with Angular, NgRx, and NX monorepo. Integrated with AWS backend.',
        imageUrl: 'assets/projects/credit.png',
        technologies: ['Angular', 'NgRx', 'AWS']
      }
    ]).pipe(delay(500));
  }
}
