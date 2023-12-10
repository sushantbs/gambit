import {getFromStorage} from '../asyncStorage';
import {Goal} from '../asyncStorage/asyncStorage';

export class GoalsApi {
  public async getGoals(): Promise<[string, Goal][]> {
    const goals = await getFromStorage('goals');
    return goals;
  }

  public subscribe(
    subscriptionType: string,
    _subscriptionHandler: Function,
  ): void {
    console.log('Subscribing to', subscriptionType);
  }

  public unsubscribe(
    subscriptionType: string,
    _subscriptionHandler: Function,
  ): void {
    console.log('Unsubscribing from', subscriptionType);
  }
}
