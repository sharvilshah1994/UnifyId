import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class BackendService {

  url = "https://www.random.org/integers/?num=10000&min=0&max=10000&col=1&base=10&format=plain&rand=new";

  constructor (private http: Http) {
  }

  getRandomNumbers() {
    return this.http.get(this.url)
      .map(
        (response: Response) => {
          return response;
        }
      );
  }
}
