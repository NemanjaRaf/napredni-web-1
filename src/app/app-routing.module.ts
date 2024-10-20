import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetTokenComponent } from './set-token/set-token.component';
import { EntityExtractionComponent } from './entity-extraction/entity-extraction.component';
import { AuthGuard } from './auth.guard';
import { LanguageDetectionComponent } from './language-detection/language-detection.component';
import { TextSimilarityComponent } from './text-similarity/text-similarity.component';
import { SentimentAnalysisComponent } from './sentiment-analysis/sentiment-analysis.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: 'set-token',
    component: SetTokenComponent
  },
  {
    path: 'entity-extraction',
    component: EntityExtractionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'language-detection',
    component: LanguageDetectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'text-similarity',
    component: TextSimilarityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sentiment-analysis',
    component: SentimentAnalysisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/set-token'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
