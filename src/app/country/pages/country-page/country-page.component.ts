import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './components/country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountryPageComponent {
  private countryService = inject(CountryService);

  public countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countyResource = rxResource({
    request: () => ({
      code: this.countryCode,
    }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.code);
    },
  });
}
