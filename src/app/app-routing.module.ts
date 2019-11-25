import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { PostMakerComponent } from './components/post-maker/post-maker.component';

const routes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'new', component: PostMakerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
