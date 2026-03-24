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
  getProfile(lang: string): Observable<Profile> {
    const profiles: any = {
      es: {
        id: '1',
        name: 'Victor Bejarano',
        dynamicRole: 'Desarrollador Full Stack Senior | Ingeniero Mecatrónico',
        professionalSummary: 'Desarrollador de software experimentado con un fuerte enfoque en arquitectura frontend e integraciones en la nube...',
        personalSummary: 'Me encanta aprender sobre IA y experimentar con nuevas tecnologías.',
        email: 'victor@example.com',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop'
      },
      en: {
        id: '1',
        name: 'Victor Bejarano',
        dynamicRole: 'Senior Full Stack Developer | Mechatronics Engineer',
        professionalSummary: 'Experienced software developer with a strong focus on frontend architecture and cloud integrations...',
        personalSummary: 'I love learning about AI and experimenting with new tech.',
        email: 'victor@example.com',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop'
      }
    };
    return of(profiles[lang] || profiles['es']).pipe(delay(300));
  }

  getStudies(lang: string): Observable<Study[]> {
    const studies: any = {
      es: [
        {
          id: '1',
          type: 'professional',
          institution: 'Universidad Nacional',
          degreeOrCourse: 'Ingeniería Mecatrónica',
          startDate: '2014-01-01',
          endDate: '2019-02-01'
        }
      ],
      en: [
        {
          id: '1',
          type: 'professional',
          institution: 'National University',
          degreeOrCourse: 'Mechatronics Engineering',
          startDate: '2014-01-01',
          endDate: '2019-02-01'
        }
      ]
    };
    return of(studies[lang] || studies['es']).pipe(delay(300));
  }

  getExperience(lang: string): Observable<Experience[]> {
    const experience: any = {
      es: [
        {
          id: '1',
          companyName: 'Sophos Solutions (GFT)',
          role: 'Desarrollador Frontend Full Stack',
          startDate: '2022-03-01',
          isCurrent: true,
          description: 'Sistemas de aplicación de crédito vehicular desarrollados con Angular, NgRx, NX y arquitectura AWS serverless (Lambda, Step Functions, DynamoDB, EventBridge). Integración de MCPs e ingeniería de prompts para Chat AI.',
          technologiesUsed: ['Angular', 'NgRx', 'AWS', 'TypeScript']
        },
        {
          id: '2',
          companyName: 'Brander Ideas (Interservicios)',
          role: 'Desarrollador Junior-Intermedio',
          startDate: '2020-03-01',
          endDate: '2022-03-01',
          isCurrent: false,
          description: 'Desarrollo de software de administración para una empresa de mensajería utilizando Angular (RxJS, NgRx, Material) y Firebase (Firestore, Functions, Auth, Hosting). También desarrollo de una app de seguimiento de entregas en Flutter integrada con impresoras térmicas Zebra.',
          technologiesUsed: ['Angular', 'Firebase', 'Flutter', 'Zebra']
        },
        {
          id: '3',
          companyName: 'Colsubsidio',
          role: 'Pasante Universitario / Soporte',
          startDate: '2019-02-01',
          endDate: '2020-02-01',
          isCurrent: false,
          description: 'Soporte de HTML, AngularJS. Administración de plataforma LMS D2L Brightspace. Desarrollo de pequeñas apps de ARcore/ARkit para Android y iOS.',
          technologiesUsed: ['HTML', 'AngularJS', 'ARcore', 'D2L']
        }
      ],
      en: [
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
      ]
    };
    return of(experience[lang] || experience['es']).pipe(delay(300));
  }

  getProjects(lang: string): Observable<Project[]> {
    const projects: any = {
      es: [
        {
          id: '1',
          title: 'Portal de Solicitud de Crédito',
          shortDescription: 'UI de sistema de crédito vehicular',
          fullDescription: 'Arquitectura frontend con Angular, NgRx y monorepo NX. Integrado con un backend robusto en AWS.',
          imageUrl: 'assets/projects/credit.png',
          technologies: ['Angular', 'NgRx', 'AWS']
        }
      ],
      en: [
        {
          id: '1',
          title: 'Credit Application Portal',
          shortDescription: 'Vehicle credit system UI',
          fullDescription: 'Frontend architectured with Angular, NgRx, and NX monorepo. Integrated with an AWS backend.',
          imageUrl: 'assets/projects/credit.png',
          technologies: ['Angular', 'NgRx', 'AWS']
        }
      ]
    };
    return of(projects[lang] || projects['es']).pipe(delay(300));
  }
}
